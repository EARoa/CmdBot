var f    = require('../inc/functions.js'),
    http = require('http');

exports.handleCommand = function(bot, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    http.get({
        host: 'ws.audioscrobbler.com',
        path: '/2.0/?method=user.getrecenttracks&user=' + f.getConfig().lastFMID + '&api_key=' + f.getConfig().lastFMKey + '&format=json'
    },
    function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) { body += d; });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed   = JSON.parse(body).recenttracks.track[0],
                response = "My glorious, amazing and handsome creator is Jonathan Kingsley! (@JFKingsley)";

                debugger;
            if(parsed['@attr'].nowplaying == 'true') {
                response += "\nHe's currently listening to " + parsed.name + " by " + parsed.artist["#text"] + " on Spotify.";
            }
            bot.sendMessage(chatID, response);

            return callback(null);
        });
    });

    return callback(null);
};