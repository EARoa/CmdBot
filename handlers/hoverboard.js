exports.handleMessage = function(bot, msg, callback) {
    //Grab the chat ID
    var chatID = msg.chat.id;

    if(!msg.text) {
        return callback(false);
    }

    msg.text = msg.text.toLowerCase()

    if(msg.text.indexOf("hoverboard") > -1) {
         bot.sendMessage(chatID, "^^ (it doesn't really hover) ^^", {reply_to_message_id: msg["message_id"]});
         return callback(true);
    }

    return callback(false);
};
