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

		const allRecipes = await Promise.all(
			collections.map(async (collection) => {
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
