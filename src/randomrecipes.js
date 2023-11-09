import React, { useState, useEffect } from "react";

const RandomRecipes = () => {
	const [randomRecipes, setRandomRecipes] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/api/recipe")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setRandomRecipes(data); // Update state with random recipes
			})
			.catch((error) => console.error("Error:", error));
	}, []);

	const styles = {
		container: {
			fontFamily: "Arial, sans-serif",
			backgroundColor: "#f9f9f9",
			padding: "20px",
		},
		content: {
			border: "2px solid #ccc",
			padding: "10px",
			margin: "10px",
			textAlign: "center",
			transition: "transform 0.3s",
			cursor: "pointer",
			maxWidth: "600px",
			marginLeft: "auto",
			marginRight: "auto",
			background: "#fff",
			boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
		},
		expanded: {
			transform: "scale(1.05)",
			maxHeight: "none",
		},
		title: {
			fontSize: "24px",
			marginBottom: "10px",
			color: "#333",
		},
		smallerText: {
			fontSize: "16px",
			color: "#555",
		},
	};

	const handleExpand = (index) => {
		const updatedRecipes = randomRecipes.map((recipe, i) =>
			i === index
				? { ...recipe, expanded: !recipe.expanded }
				: { ...recipe, expanded: false }
		);
		setRandomRecipes(updatedRecipes);
	};

	return (
		<div style={styles.container}>
			<h1 style={{ textAlign: "center", color: "#333" }}>
				Random Recipes
			</h1>

			{randomRecipes.map((recipe, index) => (
				<div
					key={recipe._id}
					id="content"
					style={{
						...styles.content,
						...(recipe.expanded && styles.expanded),
					}}
					onClick={() => handleExpand(index)}
				>
					<div style={styles.title}>{recipe.title}</div>
					<div style={styles.smallerText}>{recipe.body}</div>
					<div style={styles.smallerText}>{recipe.year}</div>
				</div>
			))}
		</div>
	);
};

export default RandomRecipes;
