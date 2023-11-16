import React, { useState } from "react";

const Login = ({ onLoginSuccess, setShowRegister }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorDisp, setErrorDisp] = useState(false);

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
			else {
				setErrorDisp(true);
				console.error("Login failed bozo", responseData.message);
			}
		} catch (error) {
			console.error("Login failed:", error.message);
		}
	};

	const styles = {
		container: {
			fontFamily: "Arial, sans-serif",
			background:
				"radial-gradient(circle, rgba(245,127,91,1) 38%, rgba(221,83,65,1) 66%)",
			color: "black",
			textAlign: "center",
			height: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		form: {
			maxWidth: "500px",
			margin: "0 auto",
			backgroundColor: "rgba(255, 255, 255, 0.8)",
			padding: "20px",
			borderRadius: "8px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
			color: "black",
		},
		input: {
			width: "100%",
			padding: "10px",
			margin: "8px 0",
			boxSizing: "border-box",
		},
		button: {
			backgroundColor: "#fff",
			color: "#333",
			padding: "12px 20px",
			border: "none",
			borderRadius: "4px",
			cursor: "pointer",
		},
	};

	return (
		<div style={styles.container}>
			<div style={styles.form}>
				<h2>Login</h2>
				<label>
					Username:
					<input
						style={styles.input}
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						style={styles.input}
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<div>
					{errorDisp ? (
						<label style={{ color: "red" }}>
							Wrong Password, please try again
						</label>
					) : null}
				</div>
				<button
					type="button"
					style={styles.button}
					onClick={handleLogin}
				>
					Login
				</button>
				<p>Dont have an account? </p>
				<button
					onClick={() => setShowRegister(true)}
					style={styles.button}
				>
					Register
				</button>
			</div>
		</div>
	);
};

export default Login;
