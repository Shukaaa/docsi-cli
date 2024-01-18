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
    download(defaultRepo, name, async (err) => {
        if (err) {
            console.error('Error:'.red, err);
        } else {
            checkPreferredCLIVersion(name)
            renamePackageJsonName(name);
            const template = (await chooseTemplate(name)).template;
            deleteNotChosenTemplates(name, template);

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

const checkPreferredCLIVersion = (name) => {
    let minimumRequiredCliVersionJson = require(`${process.cwd()}/${name}/minimum-required-cli-version.json`).version;

    if (minimumRequiredCliVersionJson > getCurrentCLIVersion()) {
        console.log(`You are using an older version of the Docsi CLI. It is important to update so that the template works correctly! The minimum required version is ${minimumRequiredCliVersionJson}.`.red);
        fs.rmdirSync(`${process.cwd()}/${name}`, { recursive: true });
        process.exit(1);
    } else {
        fs.unlinkSync(`${process.cwd()}/${name}/minimum-required-cli-version.json`);
    }
}

const getCurrentCLIVersion = () => {
    let packageJson = require(`../../package.json`);
    return packageJson.version;
}

const chooseTemplate = (name) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'template',
            message: 'Choose a template:',
            choices: getThemes(name)
        }
    ])
}

const deleteNotChosenTemplates = (name, template) => {
    const themes = getThemes(name);

    themes.forEach((theme) => {
        if (theme !== template) {
            fs.unlinkSync(`${process.cwd()}/${name}/src/css/themes/docsi/${theme}.css`);
            fs.unlinkSync(`${process.cwd()}/${name}/src/css/themes/highlight/${theme}.css`);
        }
    });
}

const getThemes = (name) => {
    return fs.readdirSync(`${process.cwd()}/${name}/src/css/themes/docsi`)
        .map((theme) => {
            return theme.replace('.css', '');
        });
}

const renamePackageJsonName = (name) => {
    const packageJson = require(`${process.cwd()}/${name}/package.json`);
    packageJson.name = name;
    fs.writeFileSync(`${process.cwd()}/${name}/package.json`, JSON.stringify(packageJson, null, 2));

    const packageLockJson = require(`${process.cwd()}/${name}/package-lock.json`);
    packageLockJson.name = name;
    fs.writeFileSync(`${process.cwd()}/${name}/package-lock.json`, JSON.stringify(packageLockJson, null, 2));
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