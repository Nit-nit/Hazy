// Requires the necessary discord.js classes.
const {
  Discord,
  Client,
  GatewayIntentBits,
  Partials,
  Collections,
  ChannelType
} = require('discord.js');

const client = new Client({ 
  intents: [ 
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]

  partials: [
    Partials.Channel
  ]
});

// Required custom node modules and files.
const config = require('./config.json');
const chalk = require('chalk');

// ========== CONSOLE LOGS STARTS HERE ==========

client.on("ready", async function() => {
  // Cache shortcuts to make code convenient and short.
  const GuildsCache = client.guilds.cache;
  const ChannelsCache = client.channels.cache;

  // Things which are actually going to get logged.
  const Username = client.user.tag;
  const Guilds = GuildsCache.map(guild => guild.name);
  const GuildsCount = GuildsCache.size;
  const GuildsIds = GuildsCache.map(guild => guild.id);
  const GuildMembersCount = GuildsCache.map(guild => guild.memberCount);
  const TotalMembersCount = GuildMembersCount.reduce((a, b) => a + b, 0);
  const ChannelsCount = ChannelsCache.size;
  const LogChannel = ChannelsCache.get(config.logChannel);
  
  // Console logs.
  console.log(`\n~ logged in as ${Username}`);
  console.log(`~ ${GuildsCount} guilds, ${ChannelsCount} channels, total ${TotalMembersCount} members\n`);

  /*
  // These three logs can be too big to get logged, write them at your own risk.
  console.log(Guilds, `\n`);
  console.log(GuildsIds, `\n`);
  console.log(GuildMembersCount, `\n`);
  */

  // Status and Activity.
  client.user.setStatus('dnd');
  client.user.setActivity(`${GuildsCount} guilds, ${ChannelsCount} channels, total ${TotalMembersCount} members`);
  LogChannel.send('i came online');
});

// ========== CONSOLE LOGS ENDS HERE ==========




// ========== MESSAGE LOGS STARTS HERE ==========

// Guild message logger
client.on('messageCreate', (message) => {
  const RoleTheme = chalk.hex('#000').bgHex(`${message.member?.displayHexColor}`);
  
  if (message.author.bot) return
  if (message.member?.displayHexColor === '#000000') return
  
  if (message.channel.type === ChannelType.GuildText) {
    console.log(RoleTheme(`${message.author.tag}`)+` in #${message.channel.name}\n`+`${message.content} \n`);
  }
});

// Guild message logger if the role color is black
client.on('messageCreate', (message) => {
  const NoTheme = chalk.hex('#000').bgHex('#fff');
  
  if (message.author.bot) return
  if (message.member?.displayHexColor === '#000000') {
    console.log(NoTheme(`${message.author.tag}`)+` in #${message.channel.name}\n`+`${message.content} \n`);
  }
});

// DMs message logger
client.on('messageCreate', (message) => {
  const DMTheme = chalk.hex('#fff').bgHex('#828282');
  
  if (message.author.bot) return
  if (message.channel.type === ChannelType.Dm) {
    console.log(DMTheme(`${message.author.tag}`)+` in dms\n`+`${message.content} \n`);
  }
});

// ========== MESSAGE LOGS ENDS HERE ==========




// ========== TEXT COMMANDS STARTS HERE ==========

// A simple ping command.
client.on('messageCreate', (message) => {
  if (message.content.toLowerCase() === 'ping') {
    message.reply('pong');
  }
});

// ========== TEXT COMMANDS ENDS HERE ==========




// Login to Discord with your bot token in 'config.json' file.
client.login(config.token)
