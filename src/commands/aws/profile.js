const { Command } = require("clipanion");
const awsProfilePicker = require("../../utils/awsProfilePicker");

module.exports = class extends Command {
  static paths = [[`aws`, `profile`]];

  static usage = Command.Usage({
    category: `aws`,
    description: `Returns the selected AWS profile`,
    details: `
      This parses the AWS profiles in your \`~/.aws/config\` file and returns the selected profile.
    `,
    examples: [[`A basic example`, `$0 aws profile`]],
  });

  async execute() {
    this.context.stdout.write(await awsProfilePicker(this.context));
  }
};
