
// Require the necessary discord.js classes
const Discord = require('discord.js');
const config = require('./config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

//custom classes
const ping = "<@913559840780091453>";
const snippet = "```";

//login log
client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}`)
})

//console guilds list logg
client.on("ready", () => {
  const Guilds = client.guilds.cache.map(guild => guild.name);
  console.log(Guilds);
});

//console message logger
client.on('messageCreate', (message) => {
  if (message.author.id === `913559840780091453`) return
  console.log(`\n[${message.author.tag}] in [${message.guild.name}, ${message.channel.name}]:\n${message.content}\n`);
});

//ping message (help command)
client.on('messageCreate', (message) => {
  if (message.author.bot) return
  if (message.content === `<@913559840780091453>`) {  
    message.reply('well, if you pinged me i think you need some help, by the way, i dont have any prefix, just ping me :D\n\n**here is a list of all my commands:**\n<@913559840780091453> guilds\n\nthere is only one command available rn, more comamnds coming soon lol');
  }
});

//servers list command
client.on('messageCreate', (message) => {
  if (message.author.bot) return
  const Guilds = client.guilds.cache.map(guild => guild.name);
  if (message.content.toLowerCase() === `${ping} guilds`) {
    message.reply(`i am available in the following guilds\n${snippet}\n${Guilds}\n${snippet}`);
  }
});

//channels message logger
client.on('messageCreate', (message) => {
  if (message.author.id === `913559840780091453`) return
  client.channels.cache.get('929229613819916328').send(`\n**[__${message.author.tag}__]** in **[__${message.guild.name}, ${message.channel.name}__]**:\n${message.content}\n`);
})

// Login to Discord with your client's token
client.login(config.token)
