exports.handleCommand = function(bot, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;
    var hangoutsURL = "https://plus.google.com/hangouts/_/google.com/" + randomStr(27);

    //bot.sendMessage(chatID, "It's HANGOUT TIME! \nEveryone get in here, or else.. \n" + hangoutsURL + "");
    bot.sendMessage(chatID, "Coming soon..");

    return callback(null);
};

function randomStr(len) {
    charSet = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}