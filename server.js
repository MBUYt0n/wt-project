const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
	"mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/wwt-project?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

app.get("/api/recipe", async (req, res) => {
	try {
		const collections = await mongoose.connection.db
			.listCollections()
			.toArray();

		const validCollections = collections.filter((collection) => {
			// Check if the collection has the required labels
			return (
				collection.name !== "credentials" && collection.name !== "liked"
			);
		});

		const allRecipes = await Promise.all(
			validCollections.map(async (collection) => {
				const recipes = await getRecipes(collection.name);
				return recipes;
			})
		);

		const flattenedRecipes = [].concat(...allRecipes);

		res.json(flattenedRecipes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// Function to check if a collection has a specific field
async function hasField(collectionName, fieldName) {
	const collection = await mongoose.connection.db.collection(collectionName);
	const document = await collection.findOne();
	return document && fieldName in document;
}

// app.get("/api/recipe", async (req, res) => {
// 	try {
// 		const hello123Recipes = await getRecipes("hello123");
// 		const goodmorningRecipes = await getRecipes("goodmornings");
// 		const yellosRecipes = await getRecipes("yellos");
// 		const lisansRecipes = await getRecipes("lisans");

// 		const allRecipes = [
// 			...hello123Recipes,
// 			...goodmorningRecipes,
// 			...yellosRecipes,
// 			...lisansRecipes,
// 		];

// 		res.json(allRecipes);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: "Internal Server Error" });
// 	}
// });

app.post("/api/recipe/like/:id/:collectionName", async (req, res) => {
	const recipeId = req.params.id;
	const collectionName = req.params.collectionName;
	console.log(collectionName);
	try {
		await updateLikes(collectionName, recipeId);

		res.json({ message: "Likes updated successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

async function getRecipes(collectionName) {
	return await mongoose.connection.db
		.collection(collectionName)
		.find({})
		.toArray();
}

async function updateLikes(collectionName, recipeId) {
	await mongoose.connection.db
		.collection(collectionName)
		.updateOne(
			{ _id: new mongoose.Types.ObjectId(recipeId) },
			{ $inc: { likes: 1 } }
		);
}

app.listen(5000, () => {
	console.log("Server is running on http://localhost:5000");
});
