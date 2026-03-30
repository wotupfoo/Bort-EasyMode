module.exports = {
    target: 'electron-preload',
    externalsPresets: {
        electronPreload: true,
        node: true,
    },
    externals: {
        assert: 'commonjs2 assert',
        crypto: 'commonjs2 crypto',
        electron: 'commonjs2 electron',
        fs: 'commonjs2 fs',
        os: 'commonjs2 os',
        path: 'commonjs2 path',
        util: 'commonjs2 util',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: require('./rules.webpack'),
    },
};
