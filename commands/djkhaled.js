var http = require('http');

exports.handleCommand = function(bot, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    if(msg.args.length < 1) {
        bot.sendMessage(chatID,  "Oops! They dont want us to have these gifs. 🔑");
        return callback(null);
    }

    var symbol = msg.args[0];

    http.get({
        host: 'api.giphy.com',
        path: 'v1/gifs/search?q=dj+khaled&api_key=dc6zaTOxFJmzC'
    },
    function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) { body += d; });
            // parse as JSON
            var data = JSON.parse(body).query.results.quote;

            console.log(data);

            var message_txt = data.url
            bot.sendMessage(chatID, message_txt, {reply_to_message_id: msg["message_id"]});
            return callback(null);
        });
    });
};
