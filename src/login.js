import React, { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const responseData = await response.json();

      console.log(responseData.message);
      if (response.ok) onLoginSuccess(username, password);
      else console.error("Login failed bozo", responseData.message);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(to right, #4caf50, #3498db)",
        color: "black",
        textAlign: "center",
        padding: "40px",
        minHeight: "100vh", // Set minimum height to fill the viewport
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          color: "black",
        }}
      >
        <h2>Login</h2>
        <form>
          <label>
            Username:
            <input
              style={{
                width: "100%",
                padding: "10px",
                margin: "8px 0",
                boxSizing: "border-box",
              }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              style={{
                width: "100%",
                padding: "10px",
                margin: "8px 0",
                boxSizing: "border-box",
              }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button
            type="button"
            style={{
              backgroundColor: "#fff",
              color: "#333",
              padding: "12px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
