exports.handleCommand = function(bot, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    if(chatID != -19297244) {
        return callback(null);
    }

    bot.sendMessage(chatID, "The Quotebook:\ndocs.google.com/document/d/1AiAED9Vhv_Y8ED58itnFvIpriCrhKqV82-HjvS1toac/view");

    return callback(null);
};