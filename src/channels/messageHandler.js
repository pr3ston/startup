// This is what the channel data would look like
// class channel {
//   constructor(fromUser, lastMessage, lastTime, messages) {
//     this.fromUser = fromUser;
//     this.lastMessage = lastMessage;
//     this.lastTime = lastTime;
//     this.messages = messages;
//   }
// }

// // Hard coding data for now; Will erase when I can actually fetch info
// const aliceChannel = new channel("Alice", "How are you?", "10:30 AM", []);
// const charlieChannel = new channel("Charlie", "See you later!", "10:30 AM", []);
// const eveChannel = new channel("Eve", "Good morning!", "10:30 AM", []);

//let channelList = [aliceChannel, charlieChannel, eveChannel];

// This function will be used to get the channel information from the DB
// In the future, there wouldn't be any need to pass in parameters. Just need to call the function and it would return the list of channels
export function getChannels(channels) {
  let userChannels = [];

  for (const channelInfo of channels) {
    userChannels.push(channelInfo);
  }

  userChannels[0]
    ? localStorage.setItem("fromUser", userChannels[0].fromUser)
    : localStorage.setItem("fromUser", "unknown");

  return userChannels;
}

// Returning the list of channels for the channel preview panel
//let channels = getChannels(channelList);

// I need to determine how I want to keep track of which user is selected in order to know what messages to get.
// I also need to add a create channel button, will work on that later. They would need to know the username (unique) which would be checked on the db

export function getCurentMessages(channels) {
  if (localStorage.getItem("fromUser") != "unknown") {
    for (let i = 0; i < channels.length; i++) {
      if (channels[i].fromUser == localStorage.getItem("fromUser")) {
        let messages = channels[i].messages;
        return messages;
      }
    }
  }
  return [];
}

//let currentChannelMessages = getCurentMessages(channels);

// also create an event handler that switches the username based on which channel is selected
