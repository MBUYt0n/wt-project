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

return (
	<div>
		<h1>Random Recipes</h1>

		{randomRecipes.map((recipe) => (
			<div key={recipe._id}>
				<h1>{recipe.title}</h1>
				<h2>{recipe.director}</h2>
				<h3>{recipe.year}</h3>
			</div>
		))}
	</div>
);

};

export default RandomRecipes;
