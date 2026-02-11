import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "/index-styles.css";

export default function App() {
  return (
    <div>
      <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <a class="navbar-brand">Yapp</a>
            </li>
            <li>
              <a class="nav-link" href="index.html">
                Login
              </a>
            </li>
            <li>
              <a class="nav-link" href="register.html">
                Register
              </a>
            </li>
            <li>
              <a class="nav-link" href="channels.html">
                Channels
              </a>
            </li>
            <li>
              <a class="nav-link" href="about.html">
                About
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>This is the main page</main>

      <footer>
        <hr />
        <span class="text-reset">Author Name(s): Preston Viloria</span>
        <br />
        <a href="https://github.com/pr3ston/startup/tree/main">GitHub</a>
      </footer>
    </div>
  );
}
