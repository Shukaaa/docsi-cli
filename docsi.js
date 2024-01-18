#!/usr/bin/env node
const program = require('commander');
const {newCommand} = require('./src/commands/new');
const docsCommand = require('./src/commands/docs');
const colors = require('colors');
colors.enable();

const versionText = `Your Docsi CLI Version is: ${'1.0.0'.bgBlue}`;

program
    .version(versionText)
    .description(`A CLI tool for generating the ${"Docsi".blue} Template.`);

program
    .command('new <name>')
    .description(`Generating the ${"Docsi".blue} Template.`)
    .action(newCommand);

program
    .command('docs')
    .description(`See the ${"Docsi".blue} documentation link.`)
    .action(docsCommand)

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

