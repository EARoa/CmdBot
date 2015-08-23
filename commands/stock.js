var http       = require('http');

exports.handleCommand = function(bot, type, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    if(msg.args.length < 1) {
        bot.sendMessage(chatID,  "Oops, I think you forgot to give me a stock symbol. :/");
        return callback(null);
    }

    var symbol = msg.args[0];

    http.get({
        host: 'query.yahooapis.com',
        path: '/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20=%22' + symbol + '%22&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env'
    },
    function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) { body += d; });
        response.on('end', function() {
            if (JSON.parse(body).query.results === null || JSON.parse(body).query.results.quote.StockExchange === null) {
                bot.sendMessage(chatID,  symbol + " is not a valid ticker symbol!", {reply_to_message_id: msg["message_id"]});
                return callback(null);
            }

            // parse as JSON
            var data = JSON.parse(body).query.results.quote;

            var message_txt = "The current stock data for " + symbol + " is \n" +
                              "Latest Price: " + data.LastTradePriceOnly + ", " + (data.Change < 0 ? "down" : "up") + " by " + data.Change + " points\n" +
                              "Last Trade: " + data.LastTradeDate + ' ' + data.LastTradeTime + "\n" +
                              "Stock Exchange: " + (data.StockExchange).replace("NMS", "NASDAQ").toUpperCase() + "\n"

            bot.sendMessage(chatID, message_txt, {reply_to_message_id: msg["message_id"]});
            return callback(null);
        });
    });
};