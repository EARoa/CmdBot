var db    = require('../inc/MemoryStorage.js');

exports.handleCommand = function(bot, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    if(db.get(chatID + "-active") == true) {
        bot.sendMessage(chatID,  "You can't create a new vote while one is running.");
        return callback(null);
    }

    if(msg.args.length < 1) {
        bot.sendMessage(chatID,  "Oops, I think you forgot to give me a question");
        return callback(null);
    }

    if(msg.args.length < 2) {
        bot.sendMessage(chatID,  "Oops, I think you forgot to give me a list of choices");
        return callback(null);
    }

    if(msg.args.length > 10) {
        bot.sendMessage(chatID,  "That's too many answers.");
        return callback(null);
    }

    db.set(chatID + "-active", true);

    var title = msg.args[0], chunks = [], data = {};
    msg.args.shift();

    for(var i in msg.args) {
        data[msg.args[i]] = [];
    }

    db.set(chatID + "-data", data);

    while (msg.args.length > 0) {
      var chunk = msg.args.splice(0,3);
      chunks.push(chunk);
    }

    setTimeout(function(){
        var data = db.get(chatID + "-data"),
            table = "";

        for(var key in data) {
            table += key + ": " + data[key].length + '\n';
        }
        bot.sendMessage(chatID, 'Vote Statistics for \"' + title + '\": \n\n=============\n' + table + '=============');

        db.remove(chatID + "-active");
        db.remove(chatID + "-data");
    }, 20 * 1000);

    var voteMessage = {
        reply_markup: JSON.stringify({
            keyboard: chunks,
            resize_keyboard: true,
            one_time_keyboard: true
        })
    };

    bot.sendMessage(chatID, "VOTE TIME! \n Question: \"" + title + "\" \n \n You have 20 seconds to answer.", voteMessage);
    return callback(null);
};
