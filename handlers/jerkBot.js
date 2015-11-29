exports.handleMessage = function(bot, msg, callback) {
    //Grab the chat ID
    var chatID = msg.chat.id;

    if(!msg.text) {
        return callback(false);
    }

    msg.text = msg.text.toLowerCase()

    if(msg.text.indexOf("change") > -1 & msg.text.indexOf("your") > -1 & msg.text.indexOf("life") > -1) {
        bot.sendMessage(chatID, "This Will Not Change Your Life in ANY Meaningful Way", {reply_to_message_id: msg["message_id"]});
        return callback(true);
    }
    if(msg.text.indexOf("go") > -1 & msg.text.indexOf("viral") > -1) {
        bot.sendMessage(chatID, "This Will Be Overused So Much That You'll Silently Pray for the Sweet Release of Death to Make it Stop", {reply_to_message_id: msg["message_id"]});
        return callback(true);
    }

    if(msg.text.indexOf("crying") > -1) {
        bot.sendMessage(chatID, "^they had a brief chuckle", {reply_to_message_id: msg["message_id"]});
        return callback(true);
    }
    if(msg.text.indexOf("check") > -1 & msg.text.indexOf("this") > -1 & msg.text.indexOf("out") > -1)  {
        bot.sendMessage(chatID, "^Bookmark this now and later completely forget about", {reply_to_message_id: msg["message_id"]});
        return callback(true);
    }
    if(msg.text.indexOf("jumbo") > -1 & msg.text.indexOf("shrimp") > -1)  {
        bot.sendMessage(chatID, "^average sized shrimp", {reply_to_message_id: msg["message_id"]});
        return callback(true);
    }
    if(msg.text.indexOf("i") > -1 & msg.text.indexOf("can't") > -1 & msg.text.indexOf("even") > -1) {
        bot.sendMessage(chatID, "You can and you will even.", {reply_to_message_id: msg["message_id"]});
        return callback(true);
    }
    return callback(false);
};
