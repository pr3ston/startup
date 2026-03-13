import React from "react";
import "./about-styles.css";

export function About() {
  const [quote, setQuote] = React.useState("Loading...");
  const [quoteAuthor, setQuoteAuthor] = React.useState("unknown");

  React.useEffect(() => {
    async function getQuote() {
      const response = await fetch('/api/quote')
      const data = await response.json()
      setQuote(data.quoteText)
      setQuoteAuthor(data.quoteAuthor)
    }
    getQuote()
    // setQuote("This is an inspirational quote");
    // setQuoteAuthor("Preston Viloria");
  }, []);

  return (
    <main className="about-main">
      <img width="400px" src="/yapp.png" alt="Yapp Logo" />
      <h1>About Yapp</h1>
      <p>
        Yapp is a simple chat application that allows users to communicate in
        real-time through various channels. It is designed to be user-friendly
        and accessible, providing a seamless chatting experience.
      </p>
      <p>Features of Yapp include:</p>
      <ul>
        <li>User Login, Logout, Register</li>
        <li>Send a receive messages in a channel</li>
        <li>View previous messages</li>
        <li>View the online status of other users</li>
      </ul>
      <br />
      <strong>
        <p>We hope you enjoy using Yapp!</p>
      </strong>
      <br />
      <div id="quote">
        <div>{quote}</div>
        <div>- {quoteAuthor}</div>
      </div>
    </main>
  );
}
