exports.handleCommand = function(bot, type, msg, callback) {
    //Grab the chat ID
    var chatID = msg.chat.id;

    if(msg.text.split(" ").toLowerCase().indexOf("jail") > -1 || msg.text.split(" ").toLowerCase().indexOf("prison") > -1) {
        bot.sendMessage(chatID, "^(school)", {reply_to_message_id: msg["message_id"]});
        return callback(true);
    }

    return callback(false);
};
