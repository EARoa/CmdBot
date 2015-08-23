exports.handleCommand = function(bot, type, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;
    bot.sendMessage(chatID, "www.youtube.com/watch?v=hdHZ5hp45Fc");

    return callback(null);
};