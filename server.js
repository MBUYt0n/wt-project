const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bcrypt = require("bcrypt");

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
	// console.log("User:", req.username);
	try {
		const collections = await mongoose.connection.db
			.listCollections()
			.toArray();

		const validCollections = collections.filter((collection) => {
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

// Route for user login
app.post("/api/login", async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Missing username or password" });
	}

	try {
		const credentialsCollection = await mongoose.connection.db.collection(
			"credentials"
		);
		const user = await credentialsCollection.findOne({
			username: username,
			password: password,
		});

		if (user) {
			res.status(200).json({ message: "Login successful!" });
		} else {
			res.status(401).json({ error: "Invalid credentials" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/api/register", async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Missing username or password" });
	}

	try {
		// Check if the username already exists
		const existingUser = await mongoose.connection.db
			.collection("credentials")
			.findOne({ username: username });

		if (existingUser) {
			return res.status(409).json({ error: "Username already exists" });
		}

		await mongoose.connection.db.collection("credentials").insertOne({
			username: username,
			password: password,
		});

		await mongoose.connection.db.createCollection(username);

		await mongoose.connection.db.collection("liked").insertOne({
			user: username,
			liked: [],
		});

		res.status(201).json({ message: "Registration successful!" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

async function getRecipes(collectionName) {
	return await mongoose.connection.db
		.collection(collectionName)
		.find({})
		.toArray();
}

// Route to handle liking a recipe
app.post("/api/recipe/like/:id/:collectionName", async (req, res) => {
	const recipeId = req.params.id;
	const collectionName = req.params.collectionName;
	const username = req.headers.username;

	const hasLiked = await mongoose.connection.db.collection("liked").findOne({
		user: username,
		liked: recipeId,
	});
	if (!hasLiked) {
		try {
			// Update likes for the recipe in the specified collection
			await updateLikes(collectionName, recipeId);

			await updateLikedCollection(username, recipeId);

			res.json({ message: "Likes updated successfully" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal Server Error" });
		}
	} else {
		console.log("Already liked");
	}
});

async function updateLikes(collectionName, recipeId) {
	await mongoose.connection.db
		.collection(collectionName)
		.updateOne(
			{ _id: new mongoose.Types.ObjectId(recipeId) },
			{ $inc: { likes: 1 } }
		);
}

async function updateLikedCollection(username, recipeId) {
	await mongoose.connection.db
		.collection("liked")
		.updateOne(
			{ user: username },
			{ $addToSet: { liked: recipeId } }
		);
}

app.listen(5000, () => {
	console.log("Server is running on http://localhost:5000");
});
