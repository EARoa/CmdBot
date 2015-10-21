// var db = require('text-db')('./config');

// exports.handleCommand = function(bot, msg, callback) {
//     //Generate the details view
//     var chatID = msg.chat.id;

//     if(db.getItem(chatID + "-active") == true) {
//         bot.sendMessage(chatID,  "You can't create a new vote while one is running.");
//         return callback(null);
//     }

//     if(msg.args.length < 1) {
//         bot.sendMessage(chatID,  "Oops, I think you forgot to give me a question");
//         return callback(null);
//     }

//     if(msg.args.length < 2 || msg.args[1].split(",").length <= 1) {
//         bot.sendMessage(chatID,  "Oops, I think you forgot to give me a list of choices");
//         return callback(null);
//     }

//     debugger;

//     db.setItem(chatID + "-active", true);

//     var voteMessage = {
//         reply_markup: JSON.stringify({
//             keyboard: [
//                 ["test1", "test2"],
//                 ["test3"]
//             ],
//             resize_keyboard: true,
//             one_time_keyboard: true
//         })
//     };

//     bot.sendMessage(chatID, "What do you want", voteMessage);
//     return callback(null);
// };
