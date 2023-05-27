import React, { useState } from "react";
import "../App.css";
import { Button, CircularProgress, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  function handlesubmit() {
    setLoading(true);
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        // expiresInMins: 60, // optional
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token === undefined) {
          toast.error(res.message);
        } else {
          navigate("/");
          console.log("hello" + res.firstName);
        }
      })
      .finally(() => {
        setLoading(false);
        setUsername("");
        setPassword("");
      });
  }

  return (
    <main className="login">
      <div className="left-login">
        <h1>Hello welcome back</h1>
        <TextField
          sx={{ width: 400 }}
          id="outlined-username-basic"
          label="username"
          variant="outlined"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          sx={{ width: 400 }}
          id="outlined-password-basic"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button
          sx={{
            width: 200,
            paddingY: 2,
          }}
          variant="contained"
          onClick={handlesubmit}
        >
          {loading ? <CircularProgress /> : "Login"}
          Login
        </Button>
      </div>
      <div className="right-login"></div>
      <ToastContainer />
    </main>
  );
}

export default Login;
