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
    // Chinese, Spanish, Italian, French, German, Hebrew
    var languageWhitelist = ['zh-chs', 'es', 'it', 'fr', 'de', 'he'];
    var phraseBlacklist = ['no', 'lol', 'lel', 'heh', 'hah', 'hehe', 'ayy', 'ahaha'];

    if(!msg.text || phraseBlacklist.indexOf(msg.text.toLowerCase().replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")) > -1) {
        return callback(false);
    }

    translateClient.detect({text: msg.text}, function(err, language) {
        if(err) {
            return callback(err);
        }

        console.log("Detected language: " + language + " for message \"" + msg.text + "\"");

        if(languageWhitelist.indexOf(language.toLowerCase()) > -1 && msg.text.length > 2 && msg.text[0] != "@" && language != null) {
            var params = {
                text: msg.text,
                from: language,
                to: 'en'
            };

            console.log("Language passed checks, translating..");
            // Don't worry about access token, it will be auto-generated if needed.
            translateClient.translate(params, function(err, data) {
                if(err) {
                    return callback(err);
                }

                bot.sendMessage(chatID, "\"" + data + "\"", {reply_to_message_id: msg["message_id"]});
                return callback(true);
            });
        } else {
            return callback(false);
        }
    });
};

