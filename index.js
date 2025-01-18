var Telegram = require('node-telegram-bot-api');
var request = require("request");
var token = '8050164395:AAHuLjoP_gbWm7cwv-6mbXd0ZGC8xFGHw_c';

// Configure the bot to use polling
var opt = {
  polling: true
};

var bot = new Telegram(token, opt);

// Event listener for receiving messages
bot.on("message", function(msg) {
  var text = msg.text;

  if (text == '/start') {
    // Send a welcome message
    bot.sendMessage(msg.chat.id, "ℹ Dengan Bot ini Anda dapat dengan mudah dan cepat mengunduh konten seperti: Video dan Musik dari jejaring Sosial TikTok.
Yang Anda butuhkan hanyalah mengirimkan tautan ke Bot!");
    
    // Delay for 500ms and then send another message
    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    delay(500).then(() => bot.sendMessage(msg.chat.id, "✨ Tolong kirim link videonya"));
  } else if (text.includes('tiktok.com')) {
    // Acknowledge receipt of the TikTok link
    bot.sendMessage(msg.chat.id, "⏳Please wait...");

    // Request the video from the TikTok API
    var reqvideourl = "https://www.tikwm.com/api/?url=" + text + "&hd=1";
    request(reqvideourl, function(error, response, body) {
      var json = JSON.parse(body);

      // Check if the video data is available
      if (json.data == undefined) {
        bot.sendMessage(msg.chat.id, "😔 Maaf, saya tidak dapat mengunduh video ini sekarang. Silakan coba lagi nanti.");
      } else {
        // Delay for 500ms and then send the video
        function delay(time) {
          return new Promise(resolve => setTimeout(resolve, time));
        }

        delay(500).then(() => bot.sendVideo(msg.chat.id, json.data.hdplay));
      }
    });
  } else {
    // Prompt the user to send a valid link
    bot.sendMessage(msg.chat.id, "🧐 Mohon kirim tautan video yang valid");
  }
});
