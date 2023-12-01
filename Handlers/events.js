const { getFiles } = require("./getFiles");
require ("colors");
module.exports = () => {
  const eventFiles = getFiles("Events");
  eventFiles.forEach((value) => require(value));

  console.log(("EVENTS STATUS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓".cyan))
  console.log("┃ ".cyan + `💭  Kinako (きなこ): [情報] ${eventFiles.length}  クライアントイベントがロードされました!!`.magenta+`┃`.cyan);
  console.log("┃ ".cyan + `💭  Kinako (きなこ): [INFO] ${eventFiles.length}  Events client Loaded!`.yellow+`                   ┃`.cyan);
  console.log(("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛".cyan))
 };
 