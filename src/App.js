import { useState } from "react";
const { MongoClient } = require("mongodb");

const uri =
	"mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/?retryWrites=true&w=majority";

const HomePage = () => {
	const [results, setResults] = useState();
	const client = new MongoClient(uri)
		async function fetchData() {
			try {
				await client.connect(); // Connect to the MongoDB server
				const database = client.db("wwt-project");
				const movies = database.collection("recipe sharing");

				const result = await movies
					.aggregate([{ $sample: { size: 1 } }])
					.toArray();
				setResults(result);
			} finally {
				// Ensures that the client will close when you finish/error
				await client.close();
			}
		}

		fetchData().catch(console.error);
	; // Empty dependency array to ensure this effect runs only once on component mount

	return (
		<div>

				<div key={results._id}>
					<h1>{results.title}</h1>
					<h2>{results.director}</h2>
					<h3>{results.year}</h3>
				</div>
		</div>
	);
};

export default HomePage;

