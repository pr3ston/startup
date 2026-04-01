import React, { useEffect } from "react";
import "./channel-styles.css";
import Button from "react-bootstrap/Button";
import { getChannels } from "./messageHandler";
import { useState } from "react";

export function Channels({ userName }) {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messageToSend, setMessageToSend] = useState("");
  const [currentChannelMessages, setCurrentChannelMessages] = useState([]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChannelUser, setNewChannelUser] = useState("");
  const [newChannelMessage, setNewChannelMessage] = useState("");

  useEffect(() => {
    async function getChannels() {
      const response = await fetch("/api/channels", {
        credentials: "include",
      });
      const data = await response.json();
      setChannels(data);
      if (data.length > 0) {
        setSelectedChannel(data[0]);
        console.log(data[0]);
        setCurrentChannelMessages(data[0].messages);
      }
    }
    getChannels();
  }, []);

  async function createChannel(fromUser, lastMessage) {
    const response = await fetch("/api/channels/", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        fromUser: fromUser,
        lastMessage: lastMessage,
        lastTime: new Date().toLocaleTimeString(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const response2 = await fetch("/api/channels", {
      credentials: "include",
    });
    const data = await response2.json();
    setChannels(data);
  }

  async function sendMessage() {
    const response = await fetch("/api/channels/messages", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        channelId: selectedChannel._id,
        message: messageToSend,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const response2 = await fetch("/api/channels", {
      credentials: "include",
    });
    const data = await response2.json();
    console.log("channels:" + data);
    setChannels(data);
    const updatedChannel = data.find(
      (channel) => channel.id === selectedChannel.id,
    );
    if (updatedChannel) {
      setSelectedChannel(updatedChannel);
      setCurrentChannelMessages(updatedChannel.messages);
    }

    setMessageToSend("");
  }

  return (
    <main className="container-fluid">
      <section className="current-user">
        <h2>Current User: {userName}</h2>
        <hr />
      </section>
      <section className="channel-list">
        <h2>Channels</h2>
        {channels.map((channel, index) => (
          <article
            key={index}
            onClick={() => {
              setSelectedChannel(channel);
              setCurrentChannelMessages(channel.messages);
            }}
          >
            <h3>{channel.users.find((user) => user !== userName)}</h3>
            <p>
              <strong>Last message:</strong>
              {" \n"}
              {channel.users.find((user) => user !== userName)}:{" "}
              {channel.lastMessage}
            </p>
            <time>{channel.lastTime}</time>
          </article>
        ))}
        <Button onClick={() => setShowCreateForm(true)}>Create</Button>
        {showCreateForm && (
          <div className="create-channel-popup">
            <h4>New Channel</h4>
            <input
              type="text"
              placeholder="Recipient"
              value={newChannelUser}
              onChange={(e) => setNewChannelUser(e.target.value)}
            />
            <input
              type="text"
              placeholder="Message"
              value={newChannelMessage}
              onChange={(e) => setNewChannelMessage(e.target.value)}
            />
            <Button
              variant="secondary"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                createChannel(newChannelUser, newChannelMessage);
                setNewChannelUser("");
                setNewChannelMessage("");
                setShowCreateForm(false);
              }}
            >
              Send
            </Button>
          </div>
        )}
      </section>
      <section className="current-channel">
        <span>
          <h2>{selectedChannel?.users.find((user) => user !== userName)}</h2>
        </span>
        {currentChannelMessages.length === 0 ? (
          <p>Nothing to display</p>
        ) : (
          currentChannelMessages.map((message, index) => (
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
          ))
        )}
        <div className="form">
          <input
            type="text"
            placeholder="Type your message here..."
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
          />
          <button onClick={() => sendMessage()} type="submit">
            Send
          </button>
        </div>
      </section>
    </main>
  );
}

// TODO: Change the send button to be like that of the unauthenticated.jsx
// TODO: Make the Create button functional
// TODO: Make the send button functional
// TODO: Finish the sendMessage function
