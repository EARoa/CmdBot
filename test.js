var TelegramBot = require('node-telegram-bot-api');

var token = '139493957:AAE2nLUuRbAVMGNo_0mYHVYsNPhO6TrxBp4';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});
bot.on('text', function (msg) {
  var chatId = msg.chat.id;
  // photo can be: a file path, a stream or a Telegram file_id
  bot.sendMessage(chatId, "Testing");
});
