import React, { useState } from "react";

const RegisterPage = ({ onRegisterSuccess, setShowRegister }) => {
	const [isButtonHovered, setButtonHovered] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:5000/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					email: email,
					password: password,
				}),
			});

			if (response.ok) {
				console.log("Registration successful!");
				onRegisterSuccess(username, password);
				// You can redirect the user to the login page or perform other actions after successful registration
			} else {
				console.error("Registration failed:", response.statusText);
			}
		} catch (error) {
			console.error("Registration failed:", error.message);
		}
	};

	const styles = {
		body: {
			fontFamily:
				'"Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"',
			background:
				"radial-gradient(circle, rgba(245,127,91,1) 38%, rgba(221,83,65,1) 66%)",
			margin: 0,
			padding: 0,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh",
		},

		form: {
			background: "linear-gradient(to right, #fff, #f5f5f5)",
			padding: "30px",
			borderRadius: "8px",
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
			width: "100%",
			maxWidth: "400px",
			textAlign: "center",
		},

		label: {
			display: "block",
			textAlign: "left",
			marginTop: "10px",
		},
		inputStyles: {
			width: "calc(100% - 16px)",
			padding: "10px",
			marginBottom: "16px",
			boxSizing: "border-box",
			border: "1px solid #ccc",
			borderRadius: "4px",
		},

		buttonStyles: {
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
		<div style={styles.body}>
			<form style={styles.form}>
				<h2>Register</h2>

				<label style={styles.label}>Username:</label>
				<input
					type="text"
					value={username}
					style={styles.inputStyles}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>

				<label style={styles.label}>Email:</label>
				<input
					type="email"
					value={email}
					style={styles.inputStyles}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<label style={styles.label}>Password:</label>
				<input
					type="password"
					value={password}
					style={styles.inputStyles}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<button
					type="button"
					style={styles.buttonStyles}
					onClick={handleRegister}
					onMouseEnter={() => setButtonHovered(true)}
					onMouseLeave={() => setButtonHovered(false)}
				>
					Register
				</button>

				<p>Already have an account? </p>
				<button onClick={() => setShowRegister(false)} style={styles.buttonStyles}>Login</button>
			</form>
		</div>
	);
};

export default RegisterPage;
