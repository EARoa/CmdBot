'use strict';

var fs         = require('fs'),
    path       = require('path'),
    adminCheck = require('./adminCheck.js'),
    command_list   = null;

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

        f.getCommandFiles('./commands', function (_, commands) {
            command_list = commands;
            f.getCommandFiles('./handlers', function (_, handlers) {
                telegram.on('message', function(message) {
                    console.log(message)
                    var types = [
                        'text', 'audio', 'document', 'photo', 'sticker', 'video', 'contact',
                        'location', 'new_chat_participant', 'left_chat_participant', 'new_chat_title',
                        'new_chat_photo', 'delete_chat_photo', 'group_chat_created'
                    ];

                    for(var handler in handlers) {
                        require(handlers[handler]).handleCommand(telegram, types[message.message_id], message, function(status) {
                            if(status === null) {
                                var chatID = msg.chat.id;
                                f.getLumberJack().error(err);
                                return telegram.sendMessage(chatID, "Ouch! Seems like I threw an error..");
                            } else if(status === true) {
                                return;
                            }
                        });
                    }

                    if(message.text[0] == '/') {
                        if(commands[message.text.substring(1)] === undefined) {
                            var chatID = message.chat.id;
                            return telegram.sendMessage(chatID, "I'm afraid I don't know what command you mean. :/");
                        }

                        require(commands[message.text.substring(1)]).handleCommand(telegram, types[message.message_id], message, function(err) {
                            if(err) {
                                var chatID = message.chat.id;
                                f.getLumberJack().error(err);
                                return telegram.sendMessage(chatID, "Ouch! Seems like I threw an error..");
                            }
                        });
                    }
                });
            });
        });
    },
    setupPrompt: function() {
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
                if(args.length < 1 || args[0] != 'commands') {
                    console.log('Invalid arguments for command.');
                    return rl.prompt();
                }

                console.log("Loaded commands: " + JSON.stringify(command_list));

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
