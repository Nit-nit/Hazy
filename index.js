// Require the necessary discord.js classes.
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
  const GuildsCount = client.guilds.cache.size;
  const GuildsIds = client.guilds.cache.map(guild => guild.id);
  const GuildMembersCount = client.guilds.cache.map(guild => guild.memberCount);
  const TotalMembersCount = GuildMembersCount.reduce((a, b) => a + b, 0);
  const ChannelsCount = client.channels.cache.size;
  const LogChannel = client.channels.cache.get(config.logChannel);
  
  // Console logs
  console.log(`\n~ logged in as ${Username}`);
  console.log(`~ ${GuildsCount} guilds, ${ChannelsCount} channels, total ${TotalMembersCount} members\n`);

  /*
  // These three logs can be too big to get logged, write them at your own risk
  console.log(Guilds, `\n`);
  console.log(GuildsIds, `\n`);
  console.log(GuildMembersCount, `\n`);
  */

  // Status and Activity
  client.user.setStatus('dnd');
  client.user.setActivity(`${GuildsCount} guilds, ${ChannelsCount} channels, total ${TotalMembersCount} members`);
});

// ========== CONSOLE LOGS ENDS HERE ==========




// ========== MESSAGE LOGS STARTS HERE ==========
// Message logs coming soon.
// ========== MESSAGE LOGS ENDS HERE ==========




// ========== COMMANDS STARTS HERE ==========
// Commands coming soon.
// ========== COMMANDS ENDS HERE ==========




// Login to Discord with your bot token in 'config.json' file.
client.login(config.token)
