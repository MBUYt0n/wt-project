import React, { useState } from "react";

const RegisterPage = ({ onRegisterSuccess }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			});

			if (response.ok) {
				console.log("Registration successful!");
                onRegisterSuccess(username, password)
				// You can redirect the user to the login page or perform other actions after successful registration
			} else {
				console.error("Registration failed:", response.statusText);
			}
		} catch (error) {
			console.error("Registration failed:", error.message);
		}
	};

	return (
		<div className="container">
			<h2>Register</h2>
			<form>
				<label>Username:</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>

				<label>Email:</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<button type="button" onClick={handleRegister}>
					Register
				</button>
			</form>

			<p>
				Already have an account?{" "}
				<a href="login.js" className="login-link">
					Login here!
				</a>
			</p>
		</div>
	);
};

export default RegisterPage;
