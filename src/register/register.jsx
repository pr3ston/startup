import React from "react";
import "../../index-styles.css";

export function Register() {
  return (
    <main>
      <div class="form-div">
        <form method="post" action="channels.html">
          <h1>Register for Yapp</h1>
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              placeholder="Username"
            />
          </div>
          <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">
              Password
            </label>
            <input
              type="text"
              class="form-control"
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
