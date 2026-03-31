import * as dgram from 'dgram';
import { app, BrowserWindow, dialog, ipcMain, Menu, MenuItem } from 'electron';
import Store from 'electron-store';
import * as net from 'net';

import ProtocolParser from './ProtocolParser';
import Settings from './Settings';

let mainWindow: BrowserWindow | null;
let isAlwaysOnTopChecked: boolean = Settings.Instance.AlwaysOnTop;
let socketClient: net.Socket | null = null;
let udpSocket: dgram.Socket | null = null;
let udpConnected = false;
let tcpConnected = false;
let tcpWasConnectedOnce = false;
let tcpFallbackTimer: ReturnType<typeof setTimeout> | null = null;

const BIOS_HOST = '127.0.0.1';
const BIOS_PORT = 7778;
const TCP_FALLBACK_DELAY_MS = 1500;
const VERBOSE_NETWORK_LOGGING = process.env.BORT_VERBOSE === '1';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let protocolParser: ProtocolParser;

function logVerbose(message: string, ...args: unknown[]) {
    if (!VERBOSE_NETWORK_LOGGING) return;
    console.log(message, ...args);
}

function logNetworkStatus(reason: string) {
    if (!VERBOSE_NETWORK_LOGGING) return;

    const tcpState =
        socketClient === null
            ? 'none'
            : socketClient.connecting
              ? 'connecting'
              : socketClient.destroyed
                ? 'destroyed'
                : tcpConnected
                  ? 'connected'
                  : 'idle';

    console.log(
        `[bort-net] ${reason} | udpListening=${udpSocket !== null} udpConnected=${udpConnected} tcp=${tcpState} connected=${connectedToBios} target=${BIOS_HOST}:${BIOS_PORT}`,
    );
}

function processIncomingData(data: Uint8Array) {
    for (const byte of data) {
        protocolParser.processChar(byte);
    }
}

function refreshConnectionState() {
    connectedToBios = udpConnected || tcpConnected;
    reportBiosStatus();
    logNetworkStatus('state changed');
}

function clearTcpFallbackTimer() {
    if (tcpFallbackTimer !== null) {
        clearTimeout(tcpFallbackTimer);
        tcpFallbackTimer = null;
    }
}

function destroyTcpClient() {
    clearTcpFallbackTimer();

    if (socketClient !== null) {
        socketClient.removeAllListeners();
        socketClient.destroy();
        socketClient = null;
    }

    tcpConnected = false;
}

function setupTcpClient() {
    destroyTcpClient();

    socketClient = new net.Socket();
    socketClient.setNoDelay();
    socketClient.on('connect', () => {
        tcpConnected = true;
        tcpWasConnectedOnce = true;
        clearTcpFallbackTimer();
        logVerbose(`connected to tcp dcs-bios on ${BIOS_HOST}:${BIOS_PORT}`);
        refreshConnectionState();
    });
    socketClient.on('ready', () => {
        logVerbose('tcp ready');
    });
    socketClient.on('data', data => {
        // Prefer UDP telemetry if it is available.
        if (udpConnected) return;
        processIncomingData(data);
    });
    socketClient.on('end', () => {
        logVerbose('disconnected from tcp server');
        tcpConnected = false;
        refreshConnectionState();
    });
    socketClient.on('error', err => {
        logVerbose('error connecting to tcp server', err.message);
        tcpConnected = false;
        refreshConnectionState();
    });
}

function connectToTcpSocket() {
    if (tcpConnected) return;
    if (socketClient === null || socketClient.destroyed) {
        setupTcpClient();
    }

    logVerbose(`attempting tcp dcs-bios connection to ${BIOS_HOST}:${BIOS_PORT}`);
    socketClient?.connect({ host: BIOS_HOST, port: BIOS_PORT });
}

function startUdpListener() {
    if (udpSocket !== null) return;

    udpSocket = dgram.createSocket('udp4');
    udpSocket.on('listening', () => {
        logVerbose(`listening for udp dcs-bios data on ${BIOS_HOST}:${BIOS_PORT}`);
        logNetworkStatus('udp bind succeeded');
    });
    udpSocket.on('message', message => {
        if (tcpWasConnectedOnce || tcpConnected) {
            logVerbose('ignoring udp dcs-bios packet because tcp is the active transport');
            return;
        }

        if (!udpConnected) {
            udpConnected = true;
            clearTcpFallbackTimer();
            logVerbose(`received first udp dcs-bios packet on ${BIOS_HOST}:${BIOS_PORT}`);
            refreshConnectionState();
        }

        processIncomingData(message);
    });
    udpSocket.on('error', err => {
        logVerbose('error listening for udp dcs-bios data', err);
        udpConnected = false;
        refreshConnectionState();
    });
    udpSocket.on('close', () => {
        logVerbose('udp dcs-bios listener closed');
        udpConnected = false;
        refreshConnectionState();
    });
    logVerbose(`attempting udp bind on ${BIOS_HOST}:${BIOS_PORT}`);
    udpSocket.bind(BIOS_PORT, BIOS_HOST);
}

function tryUdpThenTcp() {
    if (tcpWasConnectedOnce) {
        logVerbose('tcp has connected before, skipping udp probe and keeping tcp as the preferred transport');
        clearTcpFallbackTimer();
        connectToTcpSocket();
        return;
    }

    logVerbose(`trying udp first on ${BIOS_HOST}:${BIOS_PORT} with tcp fallback after ${TCP_FALLBACK_DELAY_MS}ms`);
    startUdpListener();
    clearTcpFallbackTimer();
    tcpFallbackTimer = setTimeout(() => {
        if (!udpConnected) {
            logVerbose('no udp dcs-bios data received, falling back to tcp');
            connectToTcpSocket();
        }
    }, TCP_FALLBACK_DELAY_MS);
}

function createWindow() {
    Store.initRenderer();
    logVerbose('starting Bort-EasyMode network setup');
    mainWindow = new BrowserWindow({
        // icon: path.join(assetsPath, 'assets', 'icon.png'),
        width: 900,
        height: 1200,
        minWidth: 500,
        maxWidth: 1200,
        minHeight: 150,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // setting up the menu with just two items
    const menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {
                    label: 'Select dcs-bios location',
                    accelerator: 'CmdOrCtrl+O',
                    // this is the main bit hijack the click event
                    click(menuItem, browserWindow) {
                        // construct the select file dialog
                        dialog
                            .showOpenDialog({
                                properties: ['openDirectory'],
                                defaultPath: '%USERPROFILE%/Saved Games/'.replace(
                                    /%([^%]+)%/g,
                                    (_, n) => process.env[n] ?? '',
                                ),
                            })
                            .then(function (fileObj) {
                                // the fileObj has two props
                                if (!fileObj.canceled) {
                                    browserWindow?.webContents?.send('new-json-path', fileObj.filePaths[0]);
                                }
                            })
                            // should always handle the error yourself, later Electron release might crash if you don't
                            .catch(function (err) {
                                console.error(err);
                            });
                    },
                },
                {
                    label: 'Always on Top',
                    type: 'checkbox',
                    checked: isAlwaysOnTopChecked,
                    click(menuItem, browserWindow) {
                        Settings.Instance.AlwaysOnTop = !Settings.Instance.AlwaysOnTop;
                        browserWindow?.setAlwaysOnTop(Settings.Instance.AlwaysOnTop);
                        isAlwaysOnTopChecked = Settings.Instance.AlwaysOnTop;
                    },
                },
                {
                    label: 'Show version',
                    accelerator: 'CmdOrCtrl+I',
                    click(menuItem, browserWindow) {
                        const packageInfo = require('../package.json');
                        dialog
                            .showMessageBox({
                                message: `Bort-EasyMode version: ${ packageInfo.version }`
                            })
                            // should always handle the error yourself, later Electron release might crash if you don't
                            .catch(function (err) {
                                console.error(err);
                            });
                    },
                },
                {
                    label: 'Exit',
                    click() {
                        app.quit();
                    },
                },
            ],
        },
        new MenuItem({
            role: 'viewMenu',
        }),
    ]);
    Menu.setApplicationMenu(menu);

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.setAlwaysOnTop(isAlwaysOnTopChecked);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    protocolParser = new ProtocolParser((addressArray, data) => {
        const address = addressArray[0];
        mainWindow?.webContents?.send(`receive-from-bios-${address}`, address, data);
    });

    setupTcpClient();
    tryUdpThenTcp();
}

let connectedToBios = false;

function reportBiosStatus() {
    mainWindow?.webContents?.send('bios-connection-status', connectedToBios);
}

function rawStringToBuffer(str: string) {
    const len = str.length;
    const arr = new Array(len);
    for (let idx = 0; idx < len; ++idx) {
        arr[idx] = str.charCodeAt(idx) & 0xff;
    }
    // You may create an ArrayBuffer from a standard array (of values) as follows:
    return new Uint8Array(arr);
}

async function registerListeners() {
    /**
     * This comes from bridge integration, check bridge.ts
     */
    ipcMain.on('message', (_, message) => {
        console.log(message);
    });

    ipcMain.on('send-event', (_, message) => {
        logVerbose('writing data to bios:', message);
        const payload = rawStringToBuffer(message);

        if (udpConnected && udpSocket !== null) {
            logVerbose(`sending command via udp to ${BIOS_HOST}:${BIOS_PORT}`);
            udpSocket.send(payload, BIOS_PORT, BIOS_HOST);
            return;
        }

        logVerbose(`sending command via tcp to ${BIOS_HOST}:${BIOS_PORT}`);
        socketClient?.write(payload);
    });

    ipcMain.on('retry-connection', () => {
        if (tcpConnected || tcpWasConnectedOnce) {
            logVerbose('tcp is already established or preferred, skipping udp retry probe');
            connectToTcpSocket();
            refreshConnectionState();
            return;
        }

        logVerbose('attempting to reconnect...');
        udpConnected = false;
        tcpConnected = false;
        setupTcpClient();
        tryUdpThenTcp();
        refreshConnectionState();
    });

    ipcMain.on('poll-bios-connection', reportBiosStatus);
}

app.on('ready', createWindow)
    .whenReady()
    // .then(() => {
    //     installExtension(REACT_DEVELOPER_TOOLS)
    //         .then(name => console.log(`Added Extension:  ${name}`))
    //         .catch(err => console.log('An error occurred: ', err));
    // })
    .then(registerListeners)
    .catch(e => console.error(e));

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('before-quit', function () {
    clearTcpFallbackTimer();
    socketClient?.end();
    socketClient?.destroy();
    udpSocket?.close();
});
