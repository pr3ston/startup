import React from "react";
import "./channel-styles.css";

export function Channels() {
  return (
    <main>
      <section>
        <h2>Current User: Bob</h2>
        <hr />
      </section>
      <section>
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
      <section>
        <span>
          <h2>Alice</h2> online
        </span>
        <p class="message other">
          <strong>Alice:</strong> Hello everyone!<time> 10:30 AM</time>
        </p>
        <p class="message self">
          <strong>Bob:</strong> Hi Alice!<time> 10:30 AM</time>
        </p>
        <p class="message other">
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
