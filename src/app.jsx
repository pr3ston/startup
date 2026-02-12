import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import "/index-styles.css";
// import "./channels/channel-styles.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Register } from "./register/register";
import { Channels } from "./channels/channels";
import { About } from "./about/about";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <a class="navbar-brand">Yapp</a>
              </li>
              <li>
                <NavLink className="nav-link" to="/">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/channels">
                  Channels
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/register" element={<Register />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <hr />
          <span className="text-reset">Author Name: Preston Viloria</span>
          <br />
          <a href="https://github.com/pr3ston/startup/tree/main">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary">
      404: Return to sender. Address unknown.
    </main>
  );
}
