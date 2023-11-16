import React, { useState } from "react";
import Login from "./login"; // Make sure to use the correct path
import RegisterPage from "./register"; // Make sure to use the correct path
import ProfilePage from "./profile"; // Make sure to use the correct path
import RandomRecipes from "./randomrecipes"

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

  // Callback for password change
  const handleChangePassword = (newPassword) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      password: newPassword,
    }));
  };

  return (
    <div>
      {isLoggedIn ? (
        <RandomRecipes
          credentials={credentials}
          handleLogout={handleLogout}
          handleChangePassword={handleChangePassword}
        />
      ) : (
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
