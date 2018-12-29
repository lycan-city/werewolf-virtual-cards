const client = require('firebase-tools');
const fs = require('fs');
const { prompt } = require('enquirer');
const { bold } = require('ansi-colors');

(async () => {
  const { email } = await client.login();

  if (email) console.info(`Logged in as ${bold(email)}`);

  const { project, file, confirmed } = await prompt([
    {
      type: 'select',
      name: 'project',
      message: 'Select the project to import',
      choices: async () => {
        const projects = await client.list();
        return projects.map(p => ({ name: p.id, message: p.name }));
      },
    },
    {
      type: 'input',
      name: 'file',
      message: 'Where do you want to save your config?',
      initial: '.env',
    },
    {
      type: 'confirm',
      name: 'confirmed',
      initial: true,
      message: ({ answers }) => `The file ${answers.file} already exists, are you sure you want to override it?`,
      skip: async function foo() {
        const filePath = `${__dirname}/../${this.enquirer.answers.file}`;
        return new Promise(resolve => fs.access(filePath, fs.constants.F_OK, resolve));
      },
    },
  ]);

  if (!confirmed) throw new Error('Operation canceled');

  console.info('Fetching configuration');

  const config = await client.setup.web({ project });

  const toMacroCase = s => s
    .split(/(?<=[a-z])(?=[A-Z])/)
    .join('_')
    .toUpperCase();

  const output = Object.entries(config)
    .map(([k, v]) => `FIREBASE_${toMacroCase(k)}=${v}`)
    .join('\n');

  await new Promise((resolve, reject) => fs.appendFile(`${__dirname}/../${file}`, `\n${output}`, err => (err ? reject(err) : resolve())));

  return 'Success!';
})()
  .then((a) => {
    console.info(a);
  })
  .catch((r) => {
    console.error(r.message || 'Failed');
  });
