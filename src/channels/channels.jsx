import React from "react";
import "./channel-styles.css";
import Button from "react-bootstrap/Button";
import { getChannels } from "./messageHandler";
import { useState } from "react";

export function Channels({ userName }) {
  // class channel {
  //   constructor(fromUser, lastMessage, lastTime, messages) {
  //     this.fromUser = fromUser;
  //     this.lastMessage = lastMessage;
  //     this.lastTime = lastTime;
  //     this.messages = messages;
  //   }
  // }

  // // Hard coding data for now; Will erase when I can actually fetch info
  // const aliceChannel = new channel("Alice", "How are you?", "10:30 AM", [
  //   { fromUser: "Alice", message: "Hello everyone!", time: "10:30 AM" },
  //   { fromUser: "test", message: "Hi Alice!", time: "10:30 AM" },
  //   { fromUser: "Alice", message: "How are you?", time: "10:30 AM" },
  // ]);
  // const charlieChannel = new channel(
  //   "Charlie",
  //   "See you later!",
  //   "10:30 AM",
  //   [],
  // );
  // const eveChannel = new channel("Eve", "Good morning!", "10:30 AM", []);

  // let channelList = [aliceChannel, charlieChannel, eveChannel];

  // getChannels will eventually fetch the channels from the backend, but for now it just returns the hard coded channels
  const [channels, setChannels] = useState(() => getChannels(channelList));

  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [messageToSend, setMessageToSend] = useState("");

  const currentChannelMessages = selectedChannel.messages;

  return (
    <main className="container-fluid">
      <section className="current-user">
        <h2>Current User: {userName}</h2>
        <hr />
      </section>
      <section className="channel-list">
        <h2>Channels</h2>
        {channels.map((channel, index) => (
          <article key={index} onClick={() => setSelectedChannel(channel)}>
            <h3>{channel.fromUser}</h3>
            <p>
              <strong>Last message:</strong> {channel.fromUser}:{" "}
              {channel.lastMessage}
            </p>
            <time>{channel.lastTime}</time>
          </article>
        ))}
        <Button>Create</Button>
      </section>
      <section className="current-channel">
        <span>
          <h2>{selectedChannel.fromUser}</h2>
        </span>
        {currentChannelMessages.map((message, index) => (
          <p
            key={index}
            className={
              message.fromUser == userName ? "message self" : "message other"
            }
          >
            <strong>{message.fromUser}: </strong>
            {message.message}
            <time>{message.time}</time>
          </p>
        ))}
        <form method="post" action="channels.html">
          <input
            type="text"
            placeholder="Type your message here..."
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </main>
  );
}

// TODO: Change the send button to be like that of the unauthenticated.jsx
// TODO: Make the Create button functional
// TODO: Make the send button functional
// TODO: Finish the sendMessage function
