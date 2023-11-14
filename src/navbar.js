import React, { useState } from "react";

const Navbar = ({ credentials, handleLogout }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const logout = () => {
		alert("Do you want to logout?")
		handleLogout(credentials.username, credentials.password);
		console.log("Logout");
	};

	const styles = {
		navbar: {
			background: "#333",
			padding: "7px",
			color: "#fff",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			margin: "0 auto",
		},
		title: {
			marginLeft: "46%",
		},
		usernameContainer: {
			position: "relative",
			display: "flex",
			alignItems: "center",
			cursor: "pointer",
			fontSize: "20px",
		},
		username: {
			marginLeft: "8px",
			color: "rgba(255, 255, 255, 0.8)",
			borderRadius: "20px",
			padding: "8px 12px",
			backgroundColor: "rgba(0, 0, 0, 0.3)",
		},
		dropdown: {
			position: "absolute",
			top: "100%",
			left: 0,
			display: dropdownOpen ? "block" : "none",
			background: "#333",
			borderRadius: "8px",
			padding: "8px",
			minWidth: "120px",
			color: "#fff",
			zIndex: 1,
		},
		dropdownItem: {
			cursor: "pointer",
			padding: "8px",
			borderBottom: "1px solid #555",
		},
	};

	return (
		<div style={styles.navbar}>
			<h1 style={styles.title}>My Recipe App</h1>
			<div style={styles.usernameContainer} onClick={toggleDropdown}>
				<div style={styles.username}>
					{credentials.username}{" "}
					<span style={{ fontSize: "12px", padding: "5px" }}>▼</span>
				</div>
				<div style={styles.dropdown}>
					<div
						style={styles.dropdownItem}
						onClick={() => console.log("Profile")}
					>
						Profile
					</div>
					<div style={styles.dropdownItem} onClick={logout}>
						Logout
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
