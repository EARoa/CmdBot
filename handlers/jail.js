exports.handleCommand = function(bot, type, msg, callback) {
    //Grab the chat ID
    var chatID = msg.chat.id;

    if(!msg.text) {
        return callback(false);
    }

    msg.text = msg.text.toLowerCase()

    if(msg.text.indexOf("jail") > -1 || msg.text.indexOf("prison") > -1) {
        bot.sendMessage(chatID, "^(school)", {reply_to_message_id: msg["message_id"]});
        return callback(true);
    }

    return callback(false);
};
