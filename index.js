#!/usr/bin/env node

const { program } = require('commander');
const cv = require('./cv');
const axios = require('axios');

// ANSI escape codes for colors
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    fgBlack: '\x1b[30m',
    fgRed: '\x1b[31m',
    fgGreen: '\x1b[32m',
    fgYellow: '\x1b[33m',
    fgBlue: '\x1b[34m',
    fgMagenta: '\x1b[35m',
    fgCyan: '\x1b[36m',
    fgWhite: '\x1b[37m',
};

const checkInternetConnectivity = async () => {
    try {
        await axios.head('https://raw.githubusercontent.com');
        return true;
    } catch (error) {
        return false;
    }
};

program
    .version('2.0.0')
    // .command('info')
    .description('Display personal information')
    .action(async () => {
        try {
            if (await checkInternetConnectivity()) {
                const response = await axios.get('https://raw.githubusercontent.com/muath-ye/muath-ye/master/cv.json');
                const cv = response.data;
                // Loop through the content
                // Display content from cv in console with colors
                Object.keys(cv).forEach(key => {
                    if (Array.isArray(cv[key])) {
                        console.log(`${colors.fgBlue}${colors.bright}${key}:${colors.reset}`);
                        cv[key].forEach(item => {
                            console.log(`  - ${colors.fgGreen}${JSON.stringify(item, null, 2)}${colors.reset}`);
                        });
                    } else if (typeof cv[key] === 'object') {
                        console.log(`${colors.fgMagenta}${colors.bright}${key}:${colors.reset}`);
                        Object.keys(cv[key]).forEach(subKey => {
                            console.log(`  ${colors.fgCyan}${subKey}: ${colors.fgWhite}${cv[key][subKey]}${colors.reset}`);
                        });
                    } else {
                        console.log(`${colors.fgYellow}${colors.bright}${key}:${colors.reset} ${colors.fgWhite}${cv[key]}${colors.reset}`);
                    }
                });
            } else {
                const localData = cv;
                console.log('No internet connection');
                // Display content from cv in console with colors
                Object.keys(cv).forEach(key => {
                    if (Array.isArray(cv[key])) {
                        console.log(`${colors.fgBlue}${colors.bright}${key}:${colors.reset}`);
                        cv[key].forEach(item => {
                            console.log(`  - ${colors.fgGreen}${JSON.stringify(item, null, 2)}${colors.reset}`);
                        });
                    } else if (typeof cv[key] === 'object') {
                        console.log(`${colors.fgMagenta}${colors.bright}${key}:${colors.reset}`);
                        Object.keys(cv[key]).forEach(subKey => {
                            console.log(`  ${colors.fgCyan}${subKey}: ${colors.fgWhite}${cv[key][subKey]}${colors.reset}`);
                        });
                    } else {
                        console.log(`${colors.fgYellow}${colors.bright}${key}:${colors.reset} ${colors.fgWhite}${cv[key]}${colors.reset}`);
                    }
                });
            }
        } catch (error) {
            console.error('Failed to fetch personal information:', error.message);
        }
    });

program.parse(process.argv);