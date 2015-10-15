exports.handleCommand = function(bot, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    bot.sendPhoto(chatID, 'AgADBAADmagxGyTEigLg14Eb29CvKPUMizAABINaFYeugwgMEcoAAgI', {caption: 'Take me down to Mexico City, where the grass is green and the girls are pretty.'});

    return callback(null);
};