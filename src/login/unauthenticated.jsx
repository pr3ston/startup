import React from "react";
import Button from "react-bootstrap/Button";

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");

  async function loginUser() {
    localStorage.setItem("userName", userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem("userName", userName);
    props.onLogin(userName);
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
            placeholder="username"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            id="formGroupExampleInput2"
            placeholder="username"
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
    </>
  );
}
