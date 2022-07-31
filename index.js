// Require the necessary discord.js classes
const config = require('./config.json');
const { 
  Discord, 
  Client, 
  Intents 
} = require('discord.js');

const client = new Client({ 
  intents: [ 
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.DIRECT_MESSAGES 
  ] 
});

// ========== CONSOLE LOGS STARTS HERE ==========

client.on("ready", () => {
  const Username = client.user.tag;
  const Guilds = client.guilds.cache.map(guild => guild.name);
  const GuildCount = client.guilds.cache.size;
  const GuildIds = client.guilds.cache.map(guild => guild.id);
  const GuildMembersCount = client.guilds.cache.map(guild => guild.memberCount);
  const AllMembersCount = GuildMembersCount.reduce((a, b) => a + b, 0);
  const ChannelCount = client.channels.cache.size;
  const LogChannel = client.channels.cache.get(config.logChannel);
  
  // Console logs
  console.log(`\n~ logged in as ${Username}`);
  console.log(`~ ${GuildCount} guilds, ${ChannelCount} channels, total ${AllMembersCount} members\n`);

  // These three logs can be too big to get logged, write them at your own risk
  console.log(Guilds, `\n`);
  console.log(GuildIds, `\n`);
  console.log(GuildMembersCount, `\n`);

  // Status and Activity
  client.user.setStatus('dnd');
  client.user.setActivity(`${GuildCount} guilds, ${ChannelCount} channels, total ${AllMembersCount} members`);
});

// ========== CONSOLE LOGS ENDS HERE ==========




// ========== MESSAGE LOGS STARTS HERE ==========
// Message logs coming soon
// ========== MESSAGE LOGS ENDS HERE ==========




// ========== COMMANDS STARTS HERE ==========
// Commands coming soon
// ========== COMMANDS ENDS HERE ==========




// Login to Discord with your client's token
client.login(config.token)
