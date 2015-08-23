var adminCheck = require('../inc/adminCheck.js');

exports.handleCommand = function(bot, type, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    adminCheck.isUserOp(msg.from.username.toLowerCase(), function(status) {
        if(status) {
            bot.sendMessage(chatID, "www.youtube.com/watch?v=hdHZ5hp45Fc");
        } else {
            bot.sendMessage(chatID, "Sorry, only admins can use this command.");
        }

        return callback(null);
    });
};