var http = require('http');

exports.handleCommand = function(bot, type, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    http.get({
        host: 'api.coindesk.com',
        path: '/v1/bpi/currentprice.json'
    },
    function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) { body += d; });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            var message_txt = "The current price of 1BTC is \n" +
                              "USD: $" + parsed.bpi.USD.rate_float.toFixed(2) + "\n" +
                              "GBP: £" + parsed.bpi.GBP.rate_float.toFixed(2) + "\n" +
                              "EUR: €" + parsed.bpi.EUR.rate_float.toFixed(2) + "\n"

            bot.sendMessage(chatID, message_txt, {reply_to_message_id: msg["message_id"]});
            return callback(null);
        });
    });
};