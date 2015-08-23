var f         = require('./inc/functions.js'),
    TeleAPI   = require('node-telegram-bot-api'),
    telegram  = new TeleAPI(f.getConfig().authToken, {polling: true});

//Output the console ASCII art
f.ascii(f);

//Initiate LumberJack for logging with winston
f.setupLumberJack(f);

//Deals with routing and general logic
f.handleCommands(f, telegram);

//Log the websocket server on the port specified, defaults to 1337
f.getLumberJack().info("Now " + "connected".green + " to Telegram!");

//Initiate the command prompt
f.setupPrompt();
