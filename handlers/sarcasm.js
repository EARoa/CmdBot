exports.handleCommand = function(bot, type, msg, callback) {
    //Grab the chat ID
    var chatID = msg.chat.id;

    if(!msg.text) {
        return callback(false);
    }

    if(msg.text.split(" ").indexOf("/s") > -1 || msg.text.split(" ").indexOf("</s>") > -1) {
        bot.sendMessage(chatID, "^^ Sarcasm", {reply_to_message_id: msg["message_id"]});
        return callback(true);
    }

    return callback(false);
};