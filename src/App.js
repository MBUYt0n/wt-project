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

	return (
		<div>
			{isLoggedIn ? (
				<RandomRecipes credentials={credentials} />
			) : (
				<div>
					{showRegister ? (
						<RegisterPage
							onRegisterSuccess={handleRegisterSuccess}
						/>
					) : (
						<Login onLoginSuccess={handleLoginSuccess} />
					)}

					<p>
						{showRegister
							? "Already have an account? "
							: "Don't have an account? "}
						<button onClick={() => setShowRegister(!showRegister)}>
							{showRegister ? "Login here!" : "Sign up here!"}
						</button>
					</p>
				</div>
			)}
		</div>
	);
};

export default App;
