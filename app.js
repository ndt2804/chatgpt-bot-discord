const ChatGPTService = require('./services/chatgpt.service');
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


client.on('messageCreate', async function (message) {
    const chatId = message.author.id;       // ID của cuộc trò chuyện hiện tại
    const chatMsg = message.content;
    ChatGPTService.generateCompletion(chatMsg).then(responseMsg => {
        message.reply(responseMsg)
    });
});
client.login(process.env.DISCORD_TOKEN)
console.log('CHATGPT BOT')