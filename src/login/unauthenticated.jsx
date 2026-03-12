import React from "react";
import Button from "react-bootstrap/Button";
import { MessageDialog } from "./messageDialog";

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`http://localhost:4000/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`http://localhost:4000/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    console.log(userName, password);
    const response = await fetch(endpoint, {
      method: "post",
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    });
    if (response?.status === 200) {
      localStorage.setItem("userName", userName);
      localStorage.setItem("token", response.token);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            id="formGroupExampleInput"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            id="formGroupExampleInput2"
            placeholder="Password"
          />
        </div>
        <Button
          variant="primary"
          onClick={() => loginUser()}
          disabled={!userName || !password}
        >
          Login
        </Button>
        <Button
          variant="secondary"
          onClick={() => createUser()}
          disabled={!userName || !password}
        >
          Create
        </Button>
      </div>

      <MessageDialog
        message={displayError}
        onHide={() => setDisplayError(null)}
      />
    </>
  );
}
