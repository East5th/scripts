const awsProfilePicker = require("../../utils/awsProfilePicker");
const child_process = require("child_process");
const colors = require("ansi-colors");
const jetpack = require("fs-jetpack");
const os = require("os");
const yoctoSpinner = require("yocto-spinner").default;
const fileSelector = require("inquirer-file-selector").default;
const { Command, Option } = require("clipanion");
const { input, search } = require("@inquirer/prompts");

module.exports = class extends Command {
  static paths = [[`aws`, `update-stack`]];

  static usage = Command.Usage({
    category: `aws`,
    description: `Updates a new CloudFormation stack`,
    details: `
      Updates a CloudFormation stack with the given name using the given template in the given AWS account. The \`CAPABILITY_IAM\` capability is always added to the stack.
    `,
    examples: [[`A basic example`, `$0 aws update-stack`]],
  });

  async execute() {
    let profile = await awsProfilePicker(this.context);
    let name = await input({ message: "Stack name?" });
    let path = await fileSelector({ message: "Template file?" });

    let spinner = yoctoSpinner({ text: `Updating "${name}" stack…` }).start();

    child_process.execSync(`aws cloudformation update-stack \
      --stack-name ${name} \
      --template-body file://${path} \
      --capabilities "CAPABILITY_IAM" \
      --profile "${profile}"`);

    spinner.success(`Updated "${name} stack"!`);
  }
};

