import React, { useState } from "react";
import RandomRecipes from "./randomrecipes";
import Login from "./login";
import RegisterPage from "./register";
import ProfilePage from "./profile"; 

const App = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [credentials, setCredentials] = useState({});
	const [showRegister, setShowRegister] = useState(false);

	const handleLoginSuccess = (username, password) => {
		setLoggedIn(true);
		setCredentials({ username, password });
	};

	const handleRegisterSuccess = (username, password) => {
		console.log("Registration successful!");
		setLoggedIn(true);
		setCredentials({ username, password });
		setShowRegister(false);
	};

	const handleLogout = () => {
		setLoggedIn(false);
		setCredentials({ username: "", password: "" });
	};

	return (
		<div>
			{isLoggedIn ? (
				<ProfilePage
					credentials={credentials}
					handleLogout={handleLogout}
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
