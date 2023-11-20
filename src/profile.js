import React, { useState, useEffect } from "react";
import Navbar from "./navbar";

const ProfilePage = ({ credentials, handleLogout, changePage }) => {
	const [activeTab, setActiveTab] = useState("posts");
	const [formData, setFormData] = useState({
		name: "",
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});
	const [userRecipes, setUserRecipes] = useState([]);
	const [userComments, setUserComments] = useState({});
	const [userLikes, setUserLikes] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleChangePassword = async () => {
		const { currentPassword, newPassword, confirmNewPassword } = formData;

		if (newPassword !== confirmNewPassword) {
			console.error("New passwords do not match");
			return;
		}

		try {
			const response = await fetch(
				"http://localhost:5000/api/changePassword",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: credentials.username,
						currentPassword: currentPassword,
						newPassword: newPassword,
					}),
				}
			);

			if (response.ok) {
				console.log("Password changed successfully!");
				alert("You wil be logged out");
				handleLogout();
				changePage("home");
			} else {
				console.error("Failed to change password");
			}
		} catch (error) {
			console.error("Error changing password:", error);
		}
	};

	const fetchUserRecipes = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/userRecipes?username=${credentials.username}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				setUserRecipes(data.recipes); // Assuming the response has a "recipes" array
			} else {
				console.error("Failed to fetch user's recipes");
			}
		} catch (error) {
			console.error("Error fetching user's recipes:", error);
		}
	};

	const fetchUserComments = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/userComments?username=${credentials.username}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.ok) {
				const data = await response.json();
				setUserComments(data.comments);
			} else {
				console.error("failed to fetch user's comments");
			}
		} catch (error) {
			console.error("Error fetching user's comments:", error);
		}
	};

	const fetchUserLikes = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/userLiked?username=${credentials.username}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.ok) {
				const data = await response.json();
				setUserLikes(data.liked);
				console.log(userLikes);
			} else {
				console.error("failed to fetch user's Likes");
			}
		} catch (error) {
			console.error("Error fetching user's Likes:", error);
		}
	};

	useEffect(() => {
		fetchUserRecipes();
		fetchUserComments();
		fetchUserLikes();
	});

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const renderPosts = () => {
		return (
			<div className="activity-feed">
				{userRecipes.map((recipe) => (
					<div key={recipe.id} className="activity-item">
						<h4>Title: {recipe.title}</h4>
						<p>
							Likes: <span className="likes">{recipe.likes}</span>
						</p>
					</div>
				))}
			</div>
		);
	};

	const renderComments = () => {
		return (
			<div className="activity-feed">
				{userComments.map((comment) => (
					<div key={comment.id} className="activity-item">
						<h4>Title: {comment.title}</h4>
						<p>Text: {comment.comment}</p>
						{/* Display other relevant recipe information */}
					</div>
				))}
			</div>
		);
	};

	const renderLikes = () => {
		return (
			<div className="activity-feed">
				{userLikes.map((liked) => (
					<div className="activity-item">
						<h4>Title: {liked}</h4>
					</div>
				))}
			</div>
		);
	};

	const renderActivityFeed = () => {
		// You can implement fetching and displaying posts, comments, and liked items here
		switch (activeTab) {
			case "posts":
				return (
					<div className="activity-feed">
						<h3>Posts</h3>
						{renderPosts()}
					</div>
				);
			case "comments":
				return (
					<div className="activity-feed">
						<h3>Comments</h3>
						{renderComments()}
					</div>
				);
			case "liked":
				return (
					<div className="activity-feed">
						<h3>Liked</h3>
						{renderLikes()}
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div>
			<style>
				{`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: radial-gradient(circle, rgba(245,127,91,1) 38%, rgba(221,83,65,1) 66%);
          }

          header {
            background: linear-gradient(to bottom, #333, #555);
            color: #fff;
            text-align: center;
            padding: 1em;
          }

          section {
            max-width: 800px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          label {
            font-weight: bold;
          }

          input, textarea {
            width: 100%;
            padding: 8px;
            margin-top: 4px;
            margin-bottom: 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }

          button {
            background: linear-gradient(to bottom, #555, #333);
            color: #fff;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .password-change {
            margin-top: 20px;
            background: linear-gradient(to bottom, #f2f2f2, #d9d9d9);
            padding: 20px;
            border-radius: 8px;
          }

          .tab {
            display: inline-block;
            padding: 10px 15px;
            cursor: pointer;
            background: #eee;
            border-radius: 5px;
            margin-right: 10px;
          }

          .tab:hover {
            background: #ddd;
          }

          .active-tab {
            background: linear-gradient(to bottom, #555, #333);
            color: #fff;
          }
		  .activity-feed {
			margin-top: 20px;
		  }
		
		  .activity-item {
			border: 1px solid #ddd;
			border-radius: 8px;
			padding: 10px;
			margin-bottom: 10px;
		  }
		
		  .activity-item p {
			margin: 0;
		  }
		
		  .activity-item h4 {
			margin-bottom: 5px;
		  }
		
		  .likes {
			color: #3273dc;
		  }
        `}
			</style>

			<Navbar
				credentials={credentials}
				handleLogout={handleLogout}
				changePage={changePage}
			/>

			<section>
				<label htmlFor="name">Username:</label>
				<input
					type="text"
					id="name"
					name="name"
					value={credentials.username}
					readOnly
				/>

				<div className="password-change">
					<h3>Password Change</h3>
					<form>
						<label htmlFor="current-password">
							Current Password:
						</label>
						<input
							type="password"
							id="current-password"
							name="currentPassword"
							required
							value={formData.currentPassword}
							onChange={handleChange}
						/>

						<label htmlFor="new-password">New Password:</label>
						<input
							type="password"
							id="new-password"
							name="newPassword"
							value={formData.newPassword}
							onChange={handleChange}
						/>

						<label htmlFor="confirm-new-password">
							Confirm New Password:
						</label>
						<input
							type="password"
							id="confirm-new-password"
							name="confirmNewPassword"
							value={formData.confirmNewPassword}
							onChange={handleChange}
						/>

						<button type="button" onClick={handleChangePassword}>
							Change Password
						</button>
					</form>
				</div>

				<br />

				<div className="tab-container">
					<div
						className={`tab ${
							activeTab === "posts" && "active-tab"
						}`}
						onClick={() => handleTabClick("posts")}
					>
						Posts
					</div>
					<div
						className={`tab ${
							activeTab === "comments" && "active-tab"
						}`}
						onClick={() => handleTabClick("comments")}
					>
						Comments
					</div>
					<div
						className={`tab ${
							activeTab === "liked" && "active-tab"
						}`}
						onClick={() => handleTabClick("liked")}
					>
						Liked
					</div>
				</div>

				{renderActivityFeed()}
			</section>
		</div>
	);
};

export default ProfilePage;
