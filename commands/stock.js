var http         = require('http');
var yahooFinance = require('yahoo-finance');

exports.handleCommand = function(bot, type, msg, callback) {
    //Generate the details view
    var chatID = msg.chat.id;

    console.log(msg.args)

    yahooFinance.snapshot({
      symbol: 'AAPL',
      fields: ['s', 'n', 'd1', 'l1', 'c1'],
    }, function (err, snapshot) {
      console.log(snapshot)
    });
};