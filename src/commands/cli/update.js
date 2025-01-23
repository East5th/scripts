const _ = require("lodash");
const child_process = require("child_process");
const which = require("which");
const yoctoSpinner = require("yocto-spinner").default;
const { Command } = require("clipanion");

module.exports = class extends Command {
  static paths = [[`cli`, `update`]];

  static usage = Command.Usage({
    category: `cli`,
    description: `Updates the East5th CLI tools installed on your machine`,
    details: `
      Updates the East5th CLI tools installed on your machine by running a \`git pull\` on the \`scripts\` repo.
    `,
    examples: [[`A basic example`, `$0 cli update`]],
  });

  async execute() {
    let spinner = yoctoSpinner({ text: "Updating…" }).start();

    let path = _.trimEnd(await which("east5th"), "/east5th");
    await child_process.execSync(`cd ${path} && git pull && yarn`);

    spinner.success(`Updated!`);
  }
};
