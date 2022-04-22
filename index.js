// Require the necessary discord.js classes
const Discord = require('discord.js');
const config = require('./config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

//custom classes
const ping = "<@913559840780091453>";
const action = require('discord.js');
const snippet = "```";

//bot on getting ready events
client.on("ready", () => {
  //login message
  console.log(`\n~ logged in as ${client.user.tag}`);
  
  //console guilds list
  const mem = client.guilds.cache.map(guild => guild.memberCount);
  const Guilds = client.guilds.cache.map(guild => guild.name);
  console.log(`~ ${client.guilds.cache.size} guilds ${client.channels.cache.size} channels`);
  console.log(Guilds);
  
  //status
  client.user.setStatus('dnd');
  client.user.setActivity(`inside ${client.guilds.cache.size} guilds with total ${client.channels.cache.size} channels`);
  client.channels.cache.get(`929229613819916328`).send(`i came online\n${client.guilds.cache.size} guilds\n${client.channels.cache.size} channels\n${mem} members respectively in each server`);
});


// ========== COMMANDS STARTS HERE ==========

//ping message (it works as a help command)
client.on('messageCreate', (message) => {
  if (message.author.bot) return
  if (message.content.toLowerCase() === `${ping}`) {  
    message.reply(`well, if you pinged me i think you need some help, by the way, i dont have any prefix, just ping me :D\n\n**here is a list of all my commands:**\n${ping} guilds\n${ping} data`);
  }
});

//server list (it wont list out if there are too many servers because the message will be too big to get answered by bot)
client.on('messageCreate', (message) => {
  if (message.author.bot) return
  const Guilds = client.guilds.cache.map(guild => guild.name);
  if (message.content.toLowerCase() === `${ping} guilds`) {
    message.reply(`i am available in the following guilds\n${snippet}\n${Guilds}\n${snippet}`);
  }
});

//all data
client.on('messageCreate', (message) => {
  if (message.author.bot) return
  const mem = client.guilds.cache.map(guild => guild.memberCount);
  if (message.content.toLowerCase() === `${ping} data`) {
    message.reply(`${client.guilds.cache.size} guilds\n${client.channels.cache.size} channels\n${mem} members respectively in each server`);
  }
});

// Login to Discord with your client's token
client.login(config.token)
