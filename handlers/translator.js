'use strict';

var MsTranslator = require('mstranslator'),
    f            = require('../inc/functions.js'),
    translateClient = new MsTranslator({
      client_id: f.getConfig().translateID,
      client_secret: f.getConfig().translateSecret
    }, true);

exports.handleMessage = function(bot, msg, callback) {
    //Grab the chat ID
    var chatID = msg.chat.id;

    if(!msg.text) {
        return callback(false);
    }

    translateClient.detect({text: msg.text}, function(err, language) {
        if(err) {
            return callback(err);
        }

        if(msg.text.length < 3 && language != "zh-CHT") {
            return callback(false);
        }

        if(language != "en" && language != "gl" && language != "ca" && language != "pl" && language != "de" && language != "sq" && language != null) {
            var params = {
                text: msg.text,
                from: language,
                to: 'en'
            };

            console.log("Detected language: " + language + ", translating..");
            // Don't worry about access token, it will be auto-generated if needed.
            translateClient.translate(params, function(err, data) {
                if(err) {
                    return callback(err);
                }

                console.log(data + '\n');
                bot.sendMessage(chatID, "\"" + data + "\"", {reply_to_message_id: msg["message_id"]});
                return callback(true);
            });
        } else {
            return callback(false);
        }
    });
};

