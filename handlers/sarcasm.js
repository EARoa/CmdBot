exports.handleCommand = function(bot, type, msg, callback) {
    //Grab the chat ID
    var chatID = msg.chat.id;

    if(msg.text.split(" ")[msg.text.split(" ").indexOf("/s")] || msg.text.split(" ")[msg.text.split(" ").indexOf("</s>")]) {
        bot.sendMessage(chatID, "^^ Sarcasm", {reply_to_message_id: msg["message_id"]});
        return callback(true);
    }

    return callback(false);
};