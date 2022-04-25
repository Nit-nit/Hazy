// Require the necessary discord.js classes
const Discord = require('discord.js');
const config = require('./config.json');
const { Client, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

//custom classes
const ping = "<@913559840780091453>";
const action = require('discord.js');
const snippet = "```";

// ========== LOGS STARTS HERE ==========

client.on("ready", () => {
  //login message
  console.log(`\n~ logged in as ${client.user.tag}`);
  
  const Guilds = client.guilds.cache.map(guild => guild.name);
  const GuildCount = client.guilds.cache.size;
  const GuildIds = client.guilds.cache.map(guild => guild.id);
  const GuildMemCount = client.guilds.cache.map(guild => guild.memberCount);
  const AllMemCount = GuildMemCount.reduce((a, b) => a + b, 0);
  const ChannelCount = client.channels.cache.size;
  const LogChannel = client.channels.cache.get('937315907087269970');
  
  //console logs
  console.log(`~ ${GuildCount} guilds, ${ChannelCount} channels, total ${AllMemCount} members\n`);
  console.log(Guilds, `\n`);
  console.log(GuildIds, `\n`);
  console.log(GuildMemCount, `\n`);
  
  //status
  client.user.setStatus('dnd');
  client.user.setActivity(`${GuildCount} guilds, ${ChannelCount} channels, total ${AllMemCount} members`);
});

// ========== LOGS ENDS HERE ==========




// ========== COMMANDS STARTS HERE ==========

// ========== COMMANDS ENDS HERE ==========




// Login to Discord with your client's token
client.login(config.token)
