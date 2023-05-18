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
    try {
        if (message.author.bot) return;
        ChatGPTService.generateCompletion(message.content).then(responseMsg => {
            message.reply(responseMsg)
        });
    } catch (err) {
        console.log(err);
    }

});
client.login(process.env.DISCORD_TOKEN)
console.log('CHATGPT BOT')