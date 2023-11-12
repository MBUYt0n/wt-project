import React, { useState } from "react";


const Login = ({ onLoginSuccess }) => {
	const [usn, setUsername] = useState("");
	const [pass, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			// Send a POST request to the login endpoint on your server using fetch
			const response = await fetch("http://localhost:5000/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: usn,
					password: pass,
				}),
			});

			const responseData = await response.json();

			console.log(responseData.message);

			// Call the onLoginSuccess prop to notify the parent component about the successful login
			onLoginSuccess();
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
						value={usn}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						type="password"
						value={pass}
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
