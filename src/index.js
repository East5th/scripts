const { Builtins, Cli, Command, Option, runExit } = require("clipanion");

const [node, app, ...args] = process.argv;

const cli = new Cli({
  binaryLabel: `East5th`,
  binaryName: `east5th`,
  binaryVersion: `1.0.0`,
});

cli.register(Builtins.HelpCommand);
cli.register(require('./commands/aws/login'));
cli.register(require('./commands/aws/profile'));
cli.register(require('./commands/aws/create-stack'));
cli.register(require('./commands/cli/update'));

cli.runExit(args);
