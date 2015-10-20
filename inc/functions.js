'use strict';

var fs           = require('fs'),
    path         = require('path'),
    async        = require('async'),
    adminCheck   = require('./adminCheck.js'),
    previous_messages = [],
    command_list = null,
    debug_enabled = false;


module.exports = {
      setupLumberJack: function(f) {
        var LumberJack = require('lumberjack');

        this.lumberjack = new LumberJack(false, undefined, {
          prefix: 'CmdBot',
          timestamp: true,
          colors: true,
          ignoreLevelSentry: ['debug']
        });
    },
    getLumberJack: function() {
        return this.lumberjack;
    },
    getConfig: function() {
        if(process.env.TELEGRAM_TOKEN && process.env.TRANSLATE_ID && process.env.TRANSLATE_SECRET) {
            return {authToken: process.env.TELEGRAM_TOKEN, translateID: process.env.TRANSLATE_ID, translateSecret: process.env.TRANSLATE_SECRET};
        }
        return require('../config/config.js');
    },
    getVersion: function() {
        return require('../package.json').version;
    },
    getCommandFiles: function(dir, callback) {
        var fs = require('fs');
        //List files in folder
        fs.readdir(dir, function (err, files) {
            //Handle error
            if (err) return callback(err);

            //Map/filter the file array to only include JS files
            files = files.map(function (file) {
                return path.join(dir, file);
            }).filter(function (file) {
                return path.extname(file) === '.js';
            });

            var lookup = {};

            //Add the filtered list to a hashmap ready to return
            for(var i = 0; i < files.length; i++) {
                lookup[path.basename(files[i], '.js').toLowerCase()] = "../" + files[i];
            }

            //Successfully return the hashmap
            return callback(null, lookup);
        });
    },
    handleCommands: function(f, telegram) {
        async.series([
            async.apply(f.getCommandFiles, './commands'),
            async.apply(f.getCommandFiles, './handlers')
        ],
        function(err, results){
            telegram.on('message', function(message) {
                async.waterfall([
                    function(callback) {
                        if(previous_messages.indexOf(message.message_id) <= -1) {
                            previous_messages.push(message.message_id);
                            if(debug_enabled) {
                                f.getLumberJack().info("Recieved message: " + JSON.stringify(message).white);
                            }
                            return callback(null);
                        }

                        return callback(false);
                    },
                    function(callback) {
                        async.each(Object.keys(results[1]), function(handler, cb) {
                            require(results[1][handler]).handleMessage(telegram, message, function(status) {
                                if(status != true && status != false) {
                                    var chatID = message.chat.id;

                                    telegram.sendMessage(chatID, "Ouch! Seems like I threw a handler error..");
                                    return cb(false);
                                }

                                return cb(null);
                            });
                        }, callback);
                    },
                    function(callback) {
                        if(!message.text) {
                            return callback(null);
                        }

                        if(message.text[0] == '/') {
                            var command = message.text.substring(1).split(" ")[0].split("@cmdtechbot")[0];

                            message.args = message.text.split(" ");
                            message.args.shift();

                            if(results[0][command.toLowerCase()] == null) {
                                return callback(null);
                            }

                            require(results[0][command.toLowerCase()]).handleCommand(telegram, message, function(err) {
                                if(err) {
                                    var chatID = message.chat.id;
                                    telegram.sendMessage(chatID, "Ouch! Seems like I threw a command error..");
                                    return callback(err);
                                }

                                return callback(null);
                            });
                        }
                    }
                ], function (err, result) {
                    if(err) {
                        f.getLumberJack().error(err);
                    }
                    // result now equals 'done'
                });
            });
        });
    },
    setupPrompt: function(telegram) {
      var readline = require('readline'),
        rl = readline.createInterface(process.stdin, process.stdout);

      rl.setPrompt('→ ');
      rl.prompt();

      rl.on('line', function(line) {
            var cmd = line.split(" ")[0];
            var args = line.split(" ");
            args.shift();

            if(cmd === 'exit') {
                return process.exit(0);
            }

            if(cmd === 'status') {
                console.log('Cmdbot: Online');
                return rl.prompt();
            }

            if(cmd === 'broadcast') {
                if(args.length < 1) {
                    console.log('Invalid arguments for command.');
                    return rl.prompt();
                }
                var chats = [-19297244, -24763138];

                for(var chat in chats) {
                    telegram.sendMessage(chats[chat], "SERVER ANNOUNCEMENT:\n" + line.substring(line.indexOf(' ')).substring(1).replace(/\\n/g, '\n'));
                }
                return rl.prompt();
            }

            if(cmd === 'op') {
                if(args.length < 1 || (args[0] != 'add' && args[0] != 'remove' && args[0] != 'list')) {
                    console.log('Invalid arguments for command.');
                    return rl.prompt();
                }

                if(args[0] == 'add') {
                    adminCheck.addUser(args[1], function(status) {
                        if(status) {
                            console.log("Added user \"" + args[1] + "\" as OP.");
                        } else {
                            console.log("User \"" + args[1] + "\" is already OP.");
                        }
                    });
                }

                if(args[0] == 'remove') {
                    adminCheck.deleteUser(args[1], function(status) {
                        if(status) {
                            console.log("Removed user \"" + args[1] + "\" from OP.");
                        } else {
                            console.log("User \"" + args[1] + "\" is not OP.");
                        }
                    });
                }

                if(args[0] == 'list') {
                    console.log("Current OP's: " + adminCheck.getUsers());
                }

                return rl.prompt();
            }

            if(cmd === 'debug') {

                if(args.length < 1 || (args[0] != 'commands' && args[0] != 'enable' && args[0] != 'disable')) {
                    console.log('Invalid arguments for command.');
                    return rl.prompt();
                }

                if(args[0] === 'commands') {
                    console.log("Loaded commands: " + JSON.stringify(command_list));
                }

                if(args[0] === 'enable') {
                    debug_enabled = true;
                    console.log("Enabled debug logging.");
                }

                if(args[0] === 'disable') {
                    debug_enabled = false;
                    console.log("Disabled debug logging.");
                }

                return rl.prompt();
            }

            console.log('No command found..');
            return rl.prompt();
        })
    },
    ascii: function() {
        console.log("CmdBot v" + require('../package.json').version + " is launching...");
    }
};
