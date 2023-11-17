import React, { useState, useEffect } from "react";
import Navbar from "./navbar";

const RandomRecipes = ({ credentials, handleLogout, changePage }) => {
	const [randomRecipes, setRandomRecipes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [likeLoading, setLikeLoading] = useState([]);
	const [commentText, setCommentText] = useState("");
	const [commentingIndex, setCommentingIndex] = useState(null);
	// const [comments, setComments] = useState([]);

	useEffect(() => {
		const loadMoreRecipes = async () => {
			console.log("Loading more recipes...");
			if (!loading) {
				setLoading(true);
				fetch("http://localhost:5000/api/recipe", {
					headers: {
						username: credentials.username,
						password: credentials.password,
					},
				})
					.then((response) => response.json())
					.then((data) => {
						setRandomRecipes((prevRecipes) => [
							...prevRecipes,
							...data,
						]);
						setLoading(false);
					})
					.catch((error) => {
						console.error("Error:", error);
						setLoading(false);
					});
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMoreRecipes();
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(document.getElementById("load-more-trigger"));

		return () => {
			observer.disconnect();
		};
	}, [loading, credentials]);

	const handleExpand = (index) => {
		const updatedRecipes = randomRecipes.map((recipe, i) =>
			i === index
				? { ...recipe, expanded: !recipe.expanded }
				: { ...recipe, expanded: false }
		);
		setRandomRecipes(updatedRecipes);
	};

	const handleLike = async (index, collectionName, clickEvent) => {
		console.log("Handling like...");
		if (likeLoading[index]) return;

		try {
			clickEvent.stopPropagation();
			setLikeLoading((prevLoading) => {
				const updatedLoading = [...prevLoading];
				updatedLoading[index] = true;
				return updatedLoading;
			});

			const response = await fetch(
				`http://localhost:5000/api/recipe/like/${randomRecipes[index]._id}/${collectionName}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						username: credentials.username,
					},
				}
			);
			if (response.ok) {
				setRandomRecipes((prevRecipes) => {
					const updatedRecipes = [...prevRecipes];
					updatedRecipes[index] = {
						...updatedRecipes[index],
						likes: updatedRecipes[index].likes + 1,
					};
					return updatedRecipes;
				});
			} else {
				console.error("Failed to update likes");
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setLikeLoading((prevLoading) => {
				const updatedLoading = [...prevLoading];
				updatedLoading[index] = false;
				return updatedLoading;
			});
		}
	};

	const handleComment = (index, clickEvent) => {
		clickEvent.stopPropagation();
		setCommentingIndex(index);
		// Fetch comments for the recipe at index here if needed
		// fetchCommentsForRecipe(randomRecipes[index]._id);
	};

	const handlePostComment = async (index, title, collection) => {
		try {
			console.log(
				`Posting comment for recipe at index ${index}: ${commentText}`
			);

			if (collection !== credentials.username) {
				const response = await fetch(
					`http://localhost:5000/api/recipe/comment/${randomRecipes[index]._id}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							username: credentials.username,
						},
						body: JSON.stringify({
							username: credentials.username,
							text: commentText,
							title: title,
							collection: collection,
						}),
					}
				);

				if (response.ok) {
					// fetchCommentsForRecipe(randomRecipes[index]._id);
					setCommentText("");
					setCommentingIndex(null);
				} else {
					console.error("Failed to post comment");
				}
			} else console.log("Can't comment on your own post");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const styles = {
		container: {
			fontFamily: "Arial, sans-serif",
			padding: "20px",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			background:
				"radial-gradient(circle, rgba(245,127,91,1) 38%, rgba(221,83,65,1) 66%)",
		},

		content: {
			display: "flex",
			border: "2px solid #ccc",
			padding: "10px",
			margin: "10px",
			background: "#FFFFFF",
			boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
			overflow: "hidden",
			cursor: "pointer",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap",
			transition: "max-height 0.3s ease-in-out",
			borderRadius: "8px",
		},
		expanded: {
			maxHeight: "none",
		},
		leftContent: {
			display: "flex",
			flexDirection: "column",
			marginRight: "10px",
		},
		rightContent: {
			flex: 1,
		},
		title: {
			fontSize: "24px",
			marginBottom: "10px",
			color: "#333",
		},
		smallerText: {
			fontSize: "16px",
			color: "#555",
			whiteSpace: "pre-line",
		},
		likeCount: {
			fontSize: "14px",
			color: "#333",
			textAlign: "center",
		},
		likeIcon: {
			fontSize: "24px",
			color: "#FF0000",
			cursor: "pointer",
		},
		image: {
			width: "500px",
			height: "500px",
		},
		expandedImageContainer: {
			width: "100%", // Make sure this div takes up the full width
			textAlign: "center",
		},
		expandedImage: {
			width: "500px",
			height: "500px",
			display: "inline-block",
		},
	};

	const renderRecipeBody = (body, expanded) => {
		if (expanded) {
			var howToMakeIndex = body.toLowerCase().indexOf("how to make");
			if (howToMakeIndex === -1)
				howToMakeIndex = body.toLowerCase().indexOf("method");

			if (howToMakeIndex !== -1) {
				const firstHalf = body.slice(0, howToMakeIndex);
				const secondHalf = body.slice(howToMakeIndex);

				return expanded ? (
					<div style={{ display: "flex" }}>
						<div style={{ flex: 1 }}>
							<div
								style={styles.smallerText}
								dangerouslySetInnerHTML={{
									__html: firstHalf,
								}}
							></div>
						</div>
						<div style={{ flex: 1 }}>
							<div
								style={styles.smallerText}
								dangerouslySetInnerHTML={{
									__html: secondHalf,
								}}
							></div>
						</div>
					</div>
				) : null;
			}
		}
	};

	return (
		<div>
			<Navbar
				credentials={credentials}
				handleLogout={handleLogout}
				changePage={changePage}
			/>
			<div style={styles.container}>
				<h1 style={{ textAlign: "center", color: "#333" }}>
					Random Recipes
				</h1>

				{randomRecipes.map((recipe, index) => (
					<div
						key={`${recipe._id}`}
						id="content"
						style={{
							...styles.content,
							...(recipe.expanded && styles.expanded),
						}}
						onClick={() => handleExpand(index)}
					>
						<div style={styles.leftContent}>
							<span
								onClick={(clickEvent) =>
									handleLike(
										index,
										recipe.collection,
										clickEvent
									)
								}
								style={styles.likeIcon}
							>
								❤️
							</span>
							<div style={styles.likeCount}>{recipe.likes}</div>

							{/* Comment symbol */}
							<span
								onClick={(clickEvent) =>
									handleComment(index, clickEvent)
								}
								style={{
									...styles.likeIcon,
									marginLeft: "10px",
								}}
							>
								💬
							</span>
						</div>

						<div style={styles.rightContent}>
							<div
								style={
									recipe.expanded
										? styles.expandedImageContainer
										: {}
								}
							>
								<img
									src={recipe.image}
									style={
										recipe.expanded
											? styles.expandedImage
											: styles.image
									}
									alt={recipe.title}
								/>
							</div>
							<div style={styles.title}>{recipe.title}</div>
							{renderRecipeBody(recipe.body, recipe.expanded)}
							<div style={styles.smallerText}>{recipe.year}</div>
							{/* Comment box */}
							{commentingIndex === index && (
								<div>
									<textarea
										rows="3"
										cols="40"
										placeholder="Type your comment here..."
										value={commentText}
										onChange={(e) =>
											setCommentText(e.target.value)
										}
									/>
									<button
										onClick={() =>
											handlePostComment(
												index,
												recipe.title,
												recipe.collection
											)
										}
									>
										Post Comment
									</button>
								</div>
							)}
						</div>
					</div>
				))}

				<div id="load-more-trigger" style={{ height: "1px" }} />
			</div>
		</div>
	);
};

export default RandomRecipes;
