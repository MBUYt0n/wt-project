import React, { useState } from "react";

const Login = ({ onLoginSuccess, setShowRegister }) => {
	const [isButtonHovered, setButtonHovered] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorDisp, setErrorDisp] = useState(0);

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
				setErrorDisp(response.status);
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
			background: isButtonHovered
				? "linear-gradient(to right, #4caf50, #45a049)"
				: "linear-gradient(to right, #45a049, #4caf50)",
			color: "#fff",
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
							{errorDisp === 401 ? "Wrong Password, please try again" : "Please enter username and password"}
						</label>
					) : null}
					<br /><br />
				</div>
				<button
					type="button"
					style={styles.button}
					onClick={handleLogin}
					onMouseEnter={() => setButtonHovered(true)}
					onMouseLeave={() => setButtonHovered(false)}
				>
					Login
				</button>
				<p>Dont have an account? </p>
				<button
					onClick={() => setShowRegister(true)}
					style={styles.button}
					onMouseEnter={() => setButtonHovered(true)}
					onMouseLeave={() => setButtonHovered(false)}
				>
					Register
				</button>
			</div>
		</div>
	);
};

export default Login;
