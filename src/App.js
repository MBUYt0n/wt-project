import React, { useState } from "react";
import RandomRecipes from "./randomrecipes";
import Login from "./login";
import RegisterPage from "./register"; // Adjust the path accordingly

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
		setCredentials({ username, password }); // After successful registration, switch back to login
		setShowRegister(false);
	};

	const handleLogout = (username, password) => {
		setLoggedIn(false);
		setCredentials({ username: "", password: "" });
	};

	return (
		<div>
			{isLoggedIn ? (
				<RandomRecipes
					credentials={credentials}
					handleLogout={handleLogout}
				/>
			) : (
				<div>
					{showRegister ? (
						<div>
							<RegisterPage
								onRegisterSuccess={handleRegisterSuccess}
								setShowRegister={setShowRegister}
							/>
						</div>
					) : (
						<div>
							<Login
								onLoginSuccess={handleLoginSuccess}
								setShowRegister={setShowRegister}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default App;
