var db = require('../inc/MemoryStorage.js');
exports.handleMessage = function(bot, msg, callback) {
    //Grab the chat ID
    var chatID = msg.chat.id,
        data   = db.get(chatID + "-data");

    if(!msg.text || !db.get(chatID + "-active")) {
        return callback(false);
    }

    if(data.hasOwnProperty(msg.text)) {
        if(data[msg.text].indexOf(msg.from.username) > -1) {
            bot.sendMessage(chatID, 'Vote already counted.', {reply_to_message_id: msg["message_id"]});
            return callback(true);
        }
        data[msg.text].push(msg.from.username);
        bot.sendMessage(chatID, 'Vote counted.', {reply_to_message_id: msg["message_id"]});
        db.set(chatID + "-data", data);
        return callback(true);
    }

    return callback(false);
};