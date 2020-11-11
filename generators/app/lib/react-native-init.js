const chalk = require('chalk');
const spawn = require('cross-spawn');
const fs = require('fs-extra');

function generateReactNativeApp() {
    const reactNativeVersion = '0.63.3';
    const name = 'TestApp';
    console.log(chalk.green("Running 'npx react-native init', will take a minute..."));
    spawn.sync('npx', ['react-native', 'init', '--version', reactNativeVersion, '--skip-install', name], {
        stdio: this.debug ? 'inherit' : 'ignore',
    });

    // collapse generated RN folder into parent folder
    const rnFiles = [
        '.buckconfig',
        '.eslintrc.js',
        '.flowconfig',
        '.gitattributes',
        '.gitignore',
        '.prettierrc.js',
        '.watchmanconfig',
        'App.js',
        // don't copy this
        // '__tests__',
        'android',
        'app.json',
        'babel.config.js',
        'index.js',
        'ios',
        'metro.config.js',
        'package.json',
    ];
    rnFiles.forEach(file => {
        fs.moveSync(`${process.cwd()}/${name}/${file}`, `${process.cwd()}/${file}`, { overwrite: true });
    });
    fs.removeSync(`${process.cwd()}/${name}/`);
}

module.exports = { generateReactNativeApp };
