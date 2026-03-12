import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./authenticated.css";

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userName");
    let response = fetch(`http://localhost:4000/api/auth/logout`, {
      method: "delete",
      credentials: "include",
    });
    props.onLogout();
  }

  return (
    <div>
      <div className="playerName">Current User: {props.userName}</div>
      <Button variant="primary" onClick={() => navigate("/channels")}>
        Message
      </Button>
      <Button variant="secondary" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
