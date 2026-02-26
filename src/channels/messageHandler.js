class channel {
  constructor(fromUser, lastMessage, lastTime, messages) {
    this.fromUser = fromUser;
    this.lastMessage = lastMessage;
    this.lastTime = lastTime;
    this.messages = messages;
  }
}

const aliceChannel = new channel("Alice", "How are you?", "10:30 AM", []);
const charlieChannel = new channel("Charlie", "See you later!", "10:30 AM", []);
const eveChannel = new channel("Eve", "Good morning!", "10:30 AM", []);

let channelList = [aliceChannel, charlieChannel, eveChannel];

function getChannels(channels) {
  let userChannels = [];

  for (const channelInfo of channels) {
    userChannels.push(channelInfo);
  }

  return userChannels;
}

getChannels(channelList);
