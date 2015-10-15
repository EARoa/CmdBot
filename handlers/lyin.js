exports.handleMessage = function(bot, msg, callback) {
    //Grab the chat ID
    var chatID = msg.chat.id;

    if(!msg.text) {
        return callback(false);
    }

    msg.text = msg.text.toLowerCase()
    if(msg.text.indexOf("why") > -1 && msg.text.indexOf("you") > -1 && (msg.text.indexOf("lyin") > -1 || msg.text.indexOf("lying") > -1)) {
        bot.sendPhoto(chatID, 'AgADBAADlagxGyTEigLL21MPL9nat5XxcDAABLi3RPvOe6sZaTcBAAEC', {reply_to_message_id: msg["message_id"]});
        return callback(true);
    }

    return callback(false);
};