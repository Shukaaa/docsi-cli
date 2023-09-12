#!/usr/bin/env node
const program = require('commander');
const download = require('download-git-repo');
const fs = require('fs');

let chalk;
let boxen;

const defaultRepo = 'Shukaaa/docsi';

import('chalk').then((c) => {
    import('boxen').then((b) => {
        boxen = b.default;
        chalk = c.default;

        const boxenStyle = {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'blue'
        }

        const versionText = boxen(`Your Docsi CLI Version is: ${chalk.bgBlue('1.0.0')}`, boxenStyle);

        program
            .version(versionText)
            .description(`A CLI tool for generating the ${chalk.blue("Docsi")} Template.`);

        program
            .command('new <name>')
            .description(`Generating the ${chalk.blue("Docsi")} Template.`)
            .action((name) => {
                console.log(chalk.blue(`Creating a new ${chalk.blue("Docsi")} template '${name}'...`));

                fs.mkdirSync(name);
                download(defaultRepo, name, (err) => {
                    if (err) {
                        console.error(chalk.red('Error:', err));
                    } else {
                        const packageJson = require(`${process.cwd()}/${name}/package.json`);
                        packageJson.name = name;
                        fs.writeFileSync(`${process.cwd()}/${name}/package.json`, JSON.stringify(packageJson, null, 2));

                        const packageLockJson = require(`${process.cwd()}/${name}/package-lock.json`);
                        packageLockJson.name = name;
                        fs.writeFileSync(`${process.cwd()}/${name}/package-lock.json`, JSON.stringify(packageLockJson, null, 2));

                        console.log(chalk.green(`Template '${name}' copied successfully.`));
                        console.log(chalk.blue(`Installing packages now...`));

                        // run npm install in the new directory
                        const exec = require('child_process').exec;
                        const child = exec(`cd ${name} && npm ci`, (err) => {
                            if (err) {
                                console.error(chalk.red('Error:', err));
                                return;
                            }
                            console.log(boxen(chalk.blue(`Finished setup!`), boxenStyle));
                        });
                        child.stdout.pipe(process.stdout);
                        child.stderr.pipe(process.stderr);
                    }
                });
            });

        program.parse(process.argv);

        if (!process.argv.slice(2).length) {
            program.outputHelp();
        }
    });
});
