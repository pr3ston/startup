import React from "react";
import "/index-styles.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Authenticated } from "./authenticated";
import { AuthState } from "./authState";
import { Unauthenticated } from "./unauthenticated";

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="login-main">
      <div className="form-div">
        {authState !== AuthState.Unknown && <h1>Welcome to Simon</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated
            userName={userName}
            onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
          />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}
