const { Client , EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, InteractionType } = require(`discord.js`);
const { Configuration , OpenAIApi } = require(`openai`);
const fs = require("node:fs");
const chalk = require("chalk");
const moment = require("moment");
const time = `${moment().utcOffset("+5:30").format("DD/MM/YYYY | hh:mm:ss")}`;
const dotenv = require('dotenv');
dotenv.config();
const config = require("./vars.json");
const images = require("./data/image/object");

sk-WJLApx14T

kp5rIuGt2RLT3BlbkFJcvkxGAgNKNT1pKH0w56A

const client = new Client({
  intents: 33347,
  allowedMentions: { repliedUser: true }
});

client.login(config.token);

module.exports.client = client;
require("./modules/hello");
require("./modules/bye");

client.on("ready", () => {
    console.log(chalk.grey(time) + " " +  chalk.hex("#CF9FFF")("[LOG]") + " " + "Trying to Initialize.")
})

const configuration = new Configuration({
  apiKey: process.env.API_KEY
})

const api = new OpenAIApi(configuration)

client.on("ready", () => {
  console.log(client.user.username + " is Online!");
});

client.on("messageCreate", async message => {
  if(message.author.bot) return;
  let question = message.content;

  let model = "gpt-3.5-turbo";

  await message.channel.sendTyping();

  let answer = await api.createChatCompletion({
    model: model,
    messages: [{role: "user",content: question}]
  });


  return message.reply({
    embeds : [
      new EmbedBuilder()
      .setColor("2F3136")
      .setDescription(answer.data.choices[0].message.content)
    ]
  })
});

client.login(process.env.TOKEN);
