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
		<div>
			<h2>Login</h2>
			<form>
				<label>
					Username:
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<button type="button" onClick={handleLogin}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
