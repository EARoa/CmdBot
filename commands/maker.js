exports.handleCommand = function(bot, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    bot.sendMessage(chatID, "My glorious, amazing and handsome creator is Jonathan Kingsley! (@JFKingsley)");

    return callback(null);
};