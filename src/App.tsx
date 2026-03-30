import { Box, createTheme, PaletteMode, responsiveFontSizes, ThemeOptions, ThemeProvider } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import React, { Component } from 'react';

import ControlReference from './components/ControlReference/ControlReference';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode: mode,
        ...{
            // palette values for light mode
            secondary: {
                light: green[500] + '22',
                main: green[500],
                dark: green[800],
            },
            primary: {
                light: blue[500] + '22',
                main: blue[500],
                dark: blue[800],
            },
        },
    },
    // components: {
    //     // autocomplete and outlined input overrides get the autocomplete box *close* to the standard height
    //     // and remove some weird height inconsistencies
    //     MuiAutocomplete: {
    //         styleOverrides: {
    //             input: {
    //                 paddingTop: 'unset !important',
    //                 paddingBottom: 'unset !important',
    //                 borderBottomColor: '#00000000 !important',
    //                 boxShadow: 'unset !important',
    //                 marginBottom: '4px !important',
    //                 marginTop: '4px !important',
    //                 bottom: '0 !important',
    //             },
    //         },
    //     },
    //     MuiTextField: {
    //         styleOverrides: {
    //             input: {
    //                 paddingTop: 'unset !important',
    //                 paddingBottom: 'unset !important',
    //                 borderBottomColor: '#00000000 !important',
    //                 boxShadow: 'unset !important',
    //                 marginBottom: '4px !important',
    //                 marginTop: '4px !important',
    //                 bottom: '0 !important',
    //             },
    //         },
    //     },
    //     MuiOutlinedInput: {
    //         styleOverrides: {
    //             root: {
    //                 paddingTop: 'unset !important',
    //                 paddingBottom: 'unset !important',
    //             },
    //         },
    //     },
    // },
});

interface AppState {
    mode: PaletteMode;
    showLiveData: boolean;
    showArduinoData: boolean;
    showEasyModeData: boolean;
    showEasyServoData: boolean;
    showEasyServoSg90Data: boolean;
    showEasyStepperData: boolean;
    showEasyStepper28Byj48Data: boolean;
    useAddressConstants: boolean;
}

export default class App extends Component<unknown, AppState> {
    public constructor(props: unknown) {
        super(props);

        this.state = {
            mode: 'light',
            showLiveData: true,
            showArduinoData: false,
            showEasyModeData: false,
            showEasyServoData: true,
            showEasyServoSg90Data: true,
            showEasyStepperData: true,
            showEasyStepper28Byj48Data: true,
            useAddressConstants: false,
        };

        this.toggleColorMode = this.toggleColorMode.bind(this);
        this.toggleShowLiveData = this.toggleShowLiveData.bind(this);
        this.toggleShowArduinoData = this.toggleShowArduinoData.bind(this);
        this.toggleShowEasyModeData = this.toggleShowEasyModeData.bind(this);
        this.toggleShowEasyServoData = this.toggleShowEasyServoData.bind(this);
        this.toggleShowEasyServoSg90Data = this.toggleShowEasyServoSg90Data.bind(this);
        this.toggleShowEasyStepperData = this.toggleShowEasyStepperData.bind(this);
        this.toggleShowEasyStepper28Byj48Data = this.toggleShowEasyStepper28Byj48Data.bind(this);
        this.toggleUseAddressConstants = this.toggleUseAddressConstants.bind(this);
    }

    public componentDidMount() {
        this.setState({
            mode: window.Main.getSettingsTheme(),
            showLiveData: window.Main.getShowLiveData(),
            showArduinoData: window.Main.getShowArduinoData(),
            showEasyModeData: window.Main.getShowEasyModeData(),
            showEasyServoData: window.Main.getShowEasyServoData(),
            showEasyServoSg90Data: window.Main.getShowEasyServoSg90Data(),
            showEasyStepperData: window.Main.getShowEasyStepperData(),
            showEasyStepper28Byj48Data: window.Main.getShowEasyStepper28Byj48Data(),
            useAddressConstants: window.Main.getUseAddressConstants(),
        });
    }

    private toggleColorMode() {
        const newTheme = this.state.mode === 'light' ? 'dark' : 'light';
        window.Main.setSettingsTheme(newTheme);
        this.setState({
            mode: newTheme,
        });
    }

    private toggleShowLiveData() {
        const newValue = !this.state.showLiveData;
        window.Main.setShowLiveData(newValue);
        this.setState({
            showLiveData: newValue,
        });
    }

    private toggleShowArduinoData() {
        const newValue = !this.state.showArduinoData;
        window.Main.setShowArduinoData(newValue);
        this.setState({
            showArduinoData: newValue,
        });
    }

    private toggleShowEasyModeData() {
        const newValue = !this.state.showEasyModeData;
        window.Main.setShowEasyModeData(newValue);
        this.setState({
            showEasyModeData: newValue,
        });
    }

    private toggleShowEasyServoData() {
        const newValue = !this.state.showEasyServoData;
        window.Main.setShowEasyServoData(newValue);
        this.setState({
            showEasyServoData: newValue,
        });
    }

    private toggleShowEasyServoSg90Data() {
        const newValue = !this.state.showEasyServoSg90Data;
        window.Main.setShowEasyServoSg90Data(newValue);
        this.setState({
            showEasyServoSg90Data: newValue,
        });
    }

    private toggleShowEasyStepperData() {
        const newValue = !this.state.showEasyStepperData;
        window.Main.setShowEasyStepperData(newValue);
        this.setState({
            showEasyStepperData: newValue,
        });
    }

    private toggleShowEasyStepper28Byj48Data() {
        const newValue = !this.state.showEasyStepper28Byj48Data;
        window.Main.setShowEasyStepper28Byj48Data(newValue);
        this.setState({
            showEasyStepper28Byj48Data: newValue,
        });
    }

    private toggleUseAddressConstants() {
        const newValue = !this.state.useAddressConstants;
        window.Main.setUseAddressConstants(newValue);
        this.setState({
            useAddressConstants: newValue,
        });
    }

    public render() {
        const {
            mode,
            showLiveData,
            showArduinoData,
            showEasyModeData,
            showEasyServoData,
            showEasyServoSg90Data,
            showEasyStepperData,
            showEasyStepper28Byj48Data,
            useAddressConstants,
        } = this.state;
        const theme = responsiveFontSizes(createTheme(getDesignTokens(mode)), {
            factor: 5,
        });

        return (
            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: theme.palette.background.default,
                            zIndex: -999999,
                        }}
                    />
                    <ControlReference
                        theme={mode}
                        onThemeToggle={this.toggleColorMode}
                        onShowLiveDataToggle={this.toggleShowLiveData}
                        onShowArduinoCodeToggle={this.toggleShowArduinoData}
                        onShowEasyModeDataToggle={this.toggleShowEasyModeData}
                        onShowEasyServoDataToggle={this.toggleShowEasyServoData}
                        onShowEasyServoSg90DataToggle={this.toggleShowEasyServoSg90Data}
                        onShowEasyStepperDataToggle={this.toggleShowEasyStepperData}
                        onShowEasyStepper28Byj48DataToggle={this.toggleShowEasyStepper28Byj48Data}
                        onUseAddressConstantsToggle={this.toggleUseAddressConstants}
                        showLiveData={showLiveData}
                        showArduinoData={showArduinoData}
                        showEasyModeData={showEasyModeData}
                        showEasyServoData={showEasyServoData}
                        showEasyServoSg90Data={showEasyServoSg90Data}
                        showEasyStepperData={showEasyStepperData}
                        showEasyStepper28Byj48Data={showEasyStepper28Byj48Data}
                        useAddressConstants={useAddressConstants}
                    />
                </ThemeProvider>
            </React.StrictMode>
        );
    }
}
