// import { useState } from "react";
// const mongoose = require("mongoose");

// const uri =
// 	"mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/?retryWrites=true&w=majority";

// const HomePage = () => {
// 	const [results, setResults] = useState();
// 	mongoose.connect(uri).then(
// 		() =>
// 			async function fetchData() {
// 				try {
// 					await client.connect(); // Connect to the MongoDB server
// 					const database = client.db("wwt-project");
// 					const movies = database.collection("recipe sharing");

// 					const result = await movies
// 						.aggregate([{ $sample: { size: 1 } }])
// 						.toArray();
// 					setResults(result);
// 				} finally {
// 					// Ensures that the client will close when you finish/error
// 					await client.close();
// 				}
// 			}
// 	);

// 	fetchData().catch(console.error); // Empty dependency array to ensure this effect runs only once on component mount
// 	return (
// 		<div>
// 			<div key={results._id}>
// 				<h1>{results.title}</h1>
// 				<h2>{results.director}</h2>
// 				<h3>{results.year}</h3>
// 			</div>
// 		</div>
// 	);
// };

// export default HomePage;

import { useState, useEffect } from "react";

const HomePage = () => {
	const [recipe, setRecipe] = useState({});

	useEffect(() => {
		fetch("/api/recipe")
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
				setRecipe(data[0]);
			})
			.catch((error) => console.error("Error:", error));
	}, []);

	return (
		<div>
			<div key={recipe._id}>
				<h1>{recipe.title}</h1>
				<h2>{recipe.director}</h2>
				<h3>{recipe.year}</h3>
			</div>
		</div>
	);
};

export default HomePage;
