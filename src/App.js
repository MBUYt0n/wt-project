import React, { useState } from "react";
import Login from "./login";
import RegisterPage from "./register";
import ProfilePage from "./profile";

const App = () => {
  // State to manage authentication status and credentials
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({});
  const [showRegister, setShowRegister] = useState(false);

  // Callback for successful login
  const handleLoginSuccess = (username, password) => {
    setLoggedIn(true);
    setCredentials({ username, password });
  };

  // Callback for successful registration
  const handleRegisterSuccess = (username, password) => {
    console.log("Registration successful!");
    setLoggedIn(true);
    setCredentials({ username, password });
    setShowRegister(false);
  };

  // Callback for logout
  const handleLogout = () => {
    setLoggedIn(false);
    setCredentials({ username: "", password: "" });
  };

  return (
    <div>
      {/* Check authentication status */}
      {isLoggedIn ? (
        // If logged in, render the ProfilePage
        <ProfilePage credentials={credentials} handleLogout={handleLogout} />
      ) : (
        // If not logged in, render either Login or RegisterPage based on showRegister state
        <div>
          {showRegister ? (
            <RegisterPage
              onRegisterSuccess={handleRegisterSuccess}
              setShowRegister={setShowRegister}
            />
          ) : (
            <Login
              onLoginSuccess={handleLoginSuccess}
              setShowRegister={setShowRegister}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
