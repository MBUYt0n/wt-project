// import React, { useState, useEffect } from "react";

// const RandomRecipes = () => {
// 	const [randomRecipes, setRandomRecipes] = useState([]);
// 	const [loading, setLoading] = useState(false);

// 	useEffect(() => {
// 		const loadMoreRecipes = () => {
// 			if (!loading) {
// 				setLoading(true);

// 				fetch("http://localhost:5000/api/recipe")
// 					.then((response) => response.json())
// 					.then((data) => {
// 						setRandomRecipes((prevRecipes) => [
// 							...prevRecipes,
// 							...data,
// 						]);
// 						setLoading(false);
// 					})
// 					.catch((error) => {
// 						console.error("Error:", error);
// 						setLoading(false);
// 					});
// 			}
// 		};

// 		const observer = new IntersectionObserver(
// 			(entries) => {
// 				if (entries[0].isIntersecting) {
// 					loadMoreRecipes();
// 				}
// 			},
// 			{ threshold: 0.1 }
// 		);

// 		observer.observe(document.getElementById("load-more-trigger"));

// 		return () => {
// 			observer.disconnect();
// 		};
// 	}, [loading]);

// 	const handleExpand = (index) => {
// 		const updatedRecipes = randomRecipes.map((recipe, i) =>
// 			i === index
// 				? { ...recipe, expanded: !recipe.expanded }
// 				: { ...recipe, expanded: false }
// 		);
// 		setRandomRecipes(updatedRecipes);
// 	};

// 	const handleLike = async (index, collectionName) => {
// 		try {
// 			const response = await fetch(
// 				`http://localhost:5000/api/recipe/like/${randomRecipes[index]._id}/${collectionName}`,
// 				{
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 				}
// 			);

// 			if (response.ok) {
// 				const updatedRecipes = [...randomRecipes];
// 				updatedRecipes[index].like += 1;
// 				setRandomRecipes(updatedRecipes);
// 			} else {
// 				console.error("Failed to update likes");
// 			}
// 		} catch (error) {
// 			console.error("Error:", error);
// 		}
// 	};

// 	const styles = {
// 		container: {
// 			fontFamily: "Arial, sans-serif",
// 			backgroundColor: "#FF0000", // Red
// 			padding: "20px",
// 		},
// 		content: {
// 			display: "flex",
// 			border: "2px solid #ccc",
// 			padding: "10px",
// 			margin: "10px",
// 			background: "#FFFF00", // Yellow
// 			boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
// 			overflow: "hidden",
// 			textOverflow: "ellipsis",
// 			whiteSpace: "nowrap",
// 			cursor: "pointer",
// 		},
// 		leftContent: {
// 			display: "flex",
// 			flexDirection: "column",
// 			marginRight: "10px", // Adjust as needed for spacing
// 		},
// 		rightContent: {
// 			flex: 1,
// 		},
// 		expanded: {
// 			transform: "scale(1.05)",
// 		},
// 		title: {
// 			fontSize: "24px",
// 			marginBottom: "10px",
// 			color: "#333",
// 		},
// 		smallerText: {
// 			fontSize: "16px",
// 			color: "#555",
// 			whiteSpace: "pre-line",
// 		},

// 		likeCount: {
// 			fontSize: "14px",
// 			color: "#333",
// 			textAlign: "center",
// 		},

// 		likeIcon: {
// 			fontSize: "24px",
// 			color: "#FF0000",
// 			cursor: "pointer",
// 		},
// 	};

// 	const renderRecipeBody = (body) => {
// 		return (
// 			<div
// 				style={{ ...styles.smallerText, whiteSpace: "pre-line" }}
// 				dangerouslySetInnerHTML={{ __html: body }}
// 			/>
// 		);
// 	};

// 	return (
// 		<div style={styles.container}>
// 			<h1 style={{ textAlign: "center", color: "#333" }}>
// 				Random Recipes
// 			</h1>

// 			{randomRecipes.map((recipe, index) => (
// 				<div
// 					key={recipe._id}
// 					id="content"
// 					style={{
// 						...styles.content,
// 						...(recipe.expanded && styles.expanded),
// 					}}
// 					onClick={() => handleExpand(index)}
// 				>
// 					<div style={styles.leftContent}>
// 						<span
// 							onClick={() =>
// 								handleLike(index, recipe.collectionName)
// 							}
// 							style={styles.likeIcon}
// 						>
// 							❤️
// 						</span>
// 						<div style={styles.likeCount}>{recipe.like}</div>
// 					</div>
// 					<div style={styles.rightContent}>
// 						<div style={styles.title}>{recipe.title}</div>
// 						<div style={styles.smallerText}>
// 							{renderRecipeBody(recipe.body)}
// 						</div>
// 						<div style={styles.smallerText}>{recipe.year}</div>
// 					</div>
// 				</div>
// 			))}

// 			<div id="load-more-trigger" style={{ height: "1px" }} />
// 		</div>
// 	);
// };

// export default RandomRecipes;

import React, { useState, useEffect } from "react";

const RandomRecipes = () => {
	const [randomRecipes, setRandomRecipes] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadMoreRecipes = () => {
			if (!loading) {
				setLoading(true);

				fetch("http://localhost:5000/api/recipe")
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
	}, [loading]);

	const handleExpand = (index) => {
		const updatedRecipes = randomRecipes.map((recipe, i) =>
			i === index
				? { ...recipe, expanded: !recipe.expanded }
				: { ...recipe, expanded: false }
		);
		setRandomRecipes(updatedRecipes);
	};

	const handleLike = async (index, collectionName) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/recipe/like/${randomRecipes[index]._id}/${collectionName}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const updatedRecipes = [...randomRecipes];
				updatedRecipes[index].like += 1;
				setRandomRecipes(updatedRecipes);
			} else {
				console.error("Failed to update likes");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const styles = {
		container: {
			fontFamily: "Arial, sans-serif",
			backgroundColor: "#FF0000", // Red
			padding: "20px",
		},
		content: {
			display: "flex",
			border: "2px solid #ccc",
			padding: "10pppppppppppppppppppppppppppppppppx",
			margin: "10px",
			background: "#FFFF00", // Yellow
			boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
			overflow: "hidden",
			cursor: "pointer",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap",
			maxHeight: "100px", // Set a fixed height for collapsed state
			transition: "max-height 0.3s ease-in-out",
			maxWidth: "66.666%", // Set to 2/3rds of the screen width
		},
		expanded: {
			transform: "scale(1.05)",
			maxHeight: "none",
		},
		leftContent: {
			display: "flex",
			flexDirection: "column",
			marginRight: "10px", // Adjust as needed for spacing
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
	};

	const renderRecipeBody = (body) => {
		return (
			<div
				style={{ ...styles.smallerText, whiteSpace: "pre-line" }}
				dangerouslySetInnerHTML={{ __html: body }}
			/>
		);
	};

	return (
		<div style={styles.container}>
			<h1 style={{ textAlign: "center", color: "#333" }}>
				Random Recipes
			</h1>

			{randomRecipes.map((recipe, index) => (
				<div
					key={`${recipe._id}${Math.floor(Math.random() * 900) + 100}`}
					id="content"
					style={{
						...styles.content,
						...(recipe.expanded && styles.expanded),
					}}
					onClick={() => handleExpand(index)}
				>
					<div style={styles.leftContent}>
						<span
							onClick={() =>
								handleLike(index, recipe.collectionName)
							}
							style={styles.likeIcon}
						>
							❤️
						</span>
						<div style={styles.likeCount}>{recipe.like}</div>
					</div>
					<div style={styles.rightContent}>
						<div style={styles.title}>{recipe.title}</div>
						<div style={styles.smallerText}>
							{renderRecipeBody(recipe.body)}
						</div>
						<div style={styles.smallerText}>{recipe.year}</div>
					</div>
				</div>
			))}

			<div id="load-more-trigger" style={{ height: "1px" }} />
		</div>
	);
};

export default RandomRecipes;
