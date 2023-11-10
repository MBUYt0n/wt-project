import React, { useState, useEffect } from "react";

const renderRecipeBody = (body) => {
	return body.split("\n").map((line, i) => (
		<React.Fragment key={i}>
			{i > 0 && <br />} {/* Add line break if not the first line */}
			{line}
		</React.Fragment>
	));
};

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

	const styles = {
		container: {
			fontFamily: "Arial, sans-serif",
			backgroundColor: "#FF0000", // Red
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
			background: "#FFFF00", // Yellow
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
			// whiteSpace: "pre-line", // Add this line for preserving line breaks
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
					<div style={styles.smallerText}>
						{renderRecipeBody(recipe.body)}
					</div>
					<div style={styles.smallerText}>{recipe.year}</div>
				</div>
			))}

			<div id="load-more-trigger" style={{ height: "1px" }} />
		</div>
	);
};

export default RandomRecipes;
