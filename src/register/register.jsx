import React from "react";
import "../../index-styles.css";

export function Register() {
  return (
    <main className="login-main">
      <div className="form-div">
        <form method="post" action="channels.html" className="credential-form">
          <h1>Register for Yapp</h1>
          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <label for="formGroupExampleInput2" className="form-label">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Password"
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </main>
  );
}
