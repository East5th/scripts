const { search } = require("@inquirer/prompts");
const jetpack = require("fs-jetpack");
const colors = require("ansi-colors");
const os = require("os");

module.exports = (context, options = {}) => {
  let profiles = jetpack
    .read(os.homedir() + "/.aws/config")
    .split("\n")
    .filter((line) => line.startsWith("[profile"))
    .map((line) =>
      line.replace("[profile ", "").replace("]", "").replaceAll("'", "")
    );

  return search(
    {
      message: "AWS Profile?",
      ...options,
      source: async (input) => {
        if (!input) {
          return profiles;
        }

        return profiles
          .filter((profile) =>
            profile.toLowerCase().includes(input.toLowerCase())
          )
          .map((profile) => ({
            name: profile,
            value: profile,
          }));
      },
    },
    {
      output: context.stderr,
    }
  );
};
