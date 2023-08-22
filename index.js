#!/usr/bin/env node

const { program } = require('commander');
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
    .version('1.0.0')
    // .command('info')
    .description('Display personal information')
    .action(async () => {
        try {
            if (await checkInternetConnectivity()) {
                const response = await axios.get('https://raw.githubusercontent.com/muath-ye/muath-ye/master/cli.json');
                // Loop through the content
                response.data.content.forEach(function (item) {
                    var label = item.label;
                    var labelColor = item.labelColor;
                    var value = item.value;
                    var valueColor = item.valueColor;
                    console.log(`${colors[labelColor]}${label}:${colors.reset}`, `${colors[valueColor]}${value}${colors.reset}`);
                });
            } else {
                const localData = {
                    "content": [
                        {
                            "label": "name",
                            "labelColor": "bright",
                            "value": "Muath Alsowadi <muathye@gmail.com>",
                            "valueColor": "fgGreen"
                        },
                        {
                            "label": "title",
                            "labelColor": "bright",
                            "value": "Web developer",
                            "valueColor": "fgYellow"
                        },
                        {
                            "label": "github",
                            "labelColor": "bright",
                            "value": "https://github.com/muath-ye",
                            "valueColor": "fgBlue"
                        },
                        {
                            "label": "linkedIn",
                            "labelColor": "bright",
                            "value": "https://www.linkedin.com/in/muathye",
                            "valueColor": "fgBlue"
                        },
                        {
                            "label": "instagram",
                            "labelColor": "bright",
                            "value": "https://www.instagram.com/muathye",
                            "valueColor": "fgBlue"
                        },
                        {
                            "label": "stackOverflow",
                            "labelColor": "bright",
                            "value": "https://stackoverflow.com/users/11229804/muath-alsowadi",
                            "valueColor": "fgBlue"
                        },
                        {
                            "label": "Skills",
                            "labelColor": "bright",
                            "value": "PHP/Laravel, Javascript, Nodejs, Express, Vuejs, Reactjs, Bootstrap, Tailwindcss, CI/CD, TDD, Mysql, Sql Server, Gatsby, GraphQL, OOP, SCSS, Web Socket, Functional Programming, Reactive Programming, GitHub , Gitlab, Bitbucket, Git VCS, Trello, ClickUp, Jira",
                            "valueColor": "fgYellow"
                        }
                    ]
                };
                console.log('No internet connection');
                localData.content.forEach(function (item) {
                    var label = item.label;
                    var labelColor = item.labelColor;
                    var value = item.value;
                    var valueColor = item.valueColor;
                    console.log(`${colors[labelColor]}${label}:${colors.reset}`, `${colors[valueColor]}${value}${colors.reset}`);
                });
            }
        } catch (error) {
            console.error('Failed to fetch personal information:', error.message);
        }
    });

program.parse(process.argv);