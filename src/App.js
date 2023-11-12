import React, { useState } from "react";
import RandomRecipes from "./randomrecipes";
import Login from "./login";

const App = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [credentials, setCredentials] = useState({});

	const handleLoginSuccess = (username, password) => {
		setLoggedIn(true);
		setCredentials({ username, password });
	};

	return (
		<div>
			{isLoggedIn ? (
				<RandomRecipes credentials={credentials} />
			) : (
				<Login onLoginSuccess={handleLoginSuccess} />
			)}
		</div>
	);
};

export default App;
