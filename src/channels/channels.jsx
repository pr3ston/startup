import React from "react";
import "./channel-styles.css";
import Button from "react-bootstrap/Button";
import { getChannels, getCurrentMessages } from "./messageHandler";

export function Channels({ userName }) {
  class channel {
    constructor(fromUser, lastMessage, lastTime, messages) {
      this.fromUser = fromUser;
      this.lastMessage = lastMessage;
      this.lastTime = lastTime;
      this.messages = messages;
    }
  }

  // Hard coding data for now; Will erase when I can actually fetch info
  const aliceChannel = new channel("Alice", "How are you?", "10:30 AM", []);
  const charlieChannel = new channel(
    "Charlie",
    "See you later!",
    "10:30 AM",
    [],
  );
  const eveChannel = new channel("Eve", "Good morning!", "10:30 AM", []);

  let channels = getChannels(channelList);
  let currentChannelMessages = getCurentMessages(channels);

  // Next to do: Find out how to get each of the channels to display on the panel.
  return (
    <main className="container-fluid">
      <section className="current-user">
        <h2>Current User: {userName}</h2>
        <hr />
      </section>
      <section className="channel-list">
        <h2>Channels</h2>
        <article>
          <h3>Alice</h3>
          <p>
            <strong>Last message:</strong> Alice: How are you?
          </p>
          <time> 10:30 AM</time>
        </article>
        <article>
          <h3>Charlie</h3>
          <p>
            <strong>Last message:</strong> Charlie: See you later!
          </p>
          <time> 10:30 AM</time>
        </article>
        <article>
          <h3>Eve</h3>
          <p>
            <strong>Last message:</strong> Eve: Good morning!
          </p>
          <time> 10:30 AM</time>
        </article>
      </section>
      <section className="current-channel">
        <span>
          <h2>Alice</h2> online
        </span>
        <p className="message other">
          <strong>Alice:</strong> Hello everyone!<time> 10:30 AM</time>
        </p>
        <p className="message self">
          <strong>You:</strong> Hi Alice!<time> 10:30 AM</time>
        </p>
        <p className="message other">
          <strong>Alice:</strong> How are you?<time> 10:30 AM</time>
        </p>
        <form method="post" action="channels.html">
          <input type="text" placeholder="Type your message here..." />
          <button type="submit">Send</button>
        </form>
      </section>
    </main>
  );
}

// TODO: Change the button to be like that of the unauthenticated.jsx
