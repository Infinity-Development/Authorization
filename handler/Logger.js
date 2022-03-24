const chalk = require("chalk");
const moment = require("moment");

module.exports = class Logger {

    static log(content, type = "log") {

        const timestamp = `${moment().format('DD-MM-YYYY hh:mm:ss')}`;

        switch (type) {

            case "log": {
                return console.log(`[OAuth Log] - Date: ${chalk.gray(timestamp)} | Type: ${chalk.black.bgBlue(type.toUpperCase())} | Message: ${content}`);
            }

            case "warn": {
                return console.log(`[OAuth Warning] - Date: ${chalk.gray(timestamp)} | Type: ${chalk.black.bgYellow(type.toUpperCase())} | Message: ${content}`);
            }

            case "error": {
                return console.log(`[OAuth Error] - Date: ${chalk.gray(timestamp)} | Type: ${chalk.black.bgRed(type.toUpperCase())} | Message: ${content}`);
            }

            case "debug": {
                return console.log(`[OAuth Debugging] - Date: ${chalk.gray(timestamp)} | Type: ${chalk.black.bgGreen(type.toUpperCase())} | Message: ${content}`);
            }

            default: throw new TypeError(`[OAuth Logger] Logger type should be one of: "log, warn, error, debug"`);
        }
    }
};