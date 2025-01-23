const awsProfilePicker = require("../../utils/awsProfilePicker");
const child_process = require("child_process");
const yoctoSpinner = require("yocto-spinner").default;
const { Command } = require("clipanion");

module.exports = class extends Command {
  static paths = [[`aws`, `login`]];

  static usage = Command.Usage({
    category: `aws`,
    description: `Logs into an AWS account`,
    details: `
      Logs into a AWS account specified by a local profile.
    `,
    examples: [[`A basic example`, `$0 aws login`]],
  });

  async execute() {
    let profile = await awsProfilePicker(this.context);

    child_process.execSync(`aws sso login --profile "${profile}"`, {stdio: 'inherit'});
  }
};

