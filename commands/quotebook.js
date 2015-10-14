exports.handleCommand = function(bot, type, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    bot.sendMessage(chatID, "docs.google.com/document/d/1AiAED9Vhv_Y8ED58itnFvIpriCrhKqV82-HjvS1toac/view");

    return callback(null);
};