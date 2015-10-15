exports.handleCommand = function(bot, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    bot.sendPhoto(chatID, 'AgADBAADuKcxG0WCUAiN_3o_Pv8vWHKEaTAABDiBl8VjCJZINe8AAgI', {caption: '\'Murica: Land of the (mostly) free.'});
    //bot.sendAudio(chatID, './inc/assets/Star_Spangled_Banner_instrumental.mp3');
    return callback(null);
};