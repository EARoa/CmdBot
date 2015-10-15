exports.handleCommand = function(bot, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    bot.sendPhoto(chatID, 'AgADBAAD8qcxGyTEigIzVfOyy7cOGJS8aTAABGjctUY0jdFi45EAAgI', {caption: 'United Kingdom: The home of Top Hats, amazing accents, and Rain.'});
    //bot.sendAudio(chatID, './inc/assets/God_Save_the_Queen.mp3');
    return callback(null);
};