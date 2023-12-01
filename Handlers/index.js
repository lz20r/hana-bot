const client = require("../index");

require("./events.js")(client); 
require("./commands.js")(client);
require("../slashCommands");