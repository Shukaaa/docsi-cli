const fs = require('fs');
const download = require('download-git-repo');
const inquirer = require('inquirer');

const defaultRepo = 'Shukaaa/docsi';

const newCommand = (name) => {
    if (fs.existsSync(name)) {
        console.error('Error:'.red, `A folder with the name '${name}' already exists.`);
        return;
    }

    newCommandSetup(name);
}

const newCommandSetup = (name) => {
    console.log(`Creating a new Docs template '${name}'...`.blue);

    fs.mkdirSync(name);
    download(defaultRepo, name, (err) => {
        if (err) {
            console.error('Error:'.red, err);
        } else {
            const packageJson = require(`${process.cwd()}/${name}/package.json`);
            packageJson.name = name;
            fs.writeFileSync(`${process.cwd()}/${name}/package.json`, JSON.stringify(packageJson, null, 2));

            const packageLockJson = require(`${process.cwd()}/${name}/package-lock.json`);
            packageLockJson.name = name;
            fs.writeFileSync(`${process.cwd()}/${name}/package-lock.json`, JSON.stringify(packageLockJson, null, 2));

            console.log(`Template '${name}' copied successfully.`.green);

            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'install',
                    message: 'Do you want to install the packages now?',
                    default: true
                }
            ]).then((answers) => {
                if (answers.install) {
                    console.log(`Installing packages now...`.blue);
                    installPackages(name);
                } else {
                    console.log(`Finished setup!`.blue);
                }
            });
        }
    });
}

const installPackages = (name) => {
    const exec = require('child_process').exec;
    const child = exec(`cd ${name} && npm ci`, (err) => {
        if (err) {
            console.error('Error:'.red, err);
            return;
        }

        console.log(`Finished setup!`.blue);
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
}

module.exports = {
    newCommand
}