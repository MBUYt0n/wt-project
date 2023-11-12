const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

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

// Middleware for user authentication
const authenticateUser = async (req, res, next) => {
	const { username, password } = req.headers;
	console.log("Received authentication request:", { username, password });
	if (!username || !password) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const credentialsCollection = await mongoose.connection.db.collection(
			"credentials"
		);
		const user = await credentialsCollection.findOne({
			username,
			password,
		});

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Attach user information to the request object
		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Middleware to check if the user is authenticated for /api/recipe
const checkAuthenticationForRecipe = async (req, res, next) => {
	console.log(req.user);
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	next();
};

app.use("/api/recipe/like", authenticateUser);

app.use("/api/recipe", checkAuthenticationForRecipe, authenticateUser);

app.get("/api/recipe", async (req, res) => {
	console.log("User:", req.user);
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
	const { usn, pass } = req.body;

	if (!usn || !pass) {
		return res
			.status(400)
			.json({ message: "Missing username or password" });
	}

	try {
		const credentialsCollection = await mongoose.connection.db.collection(
			"credentials"
		);
		const user = await credentialsCollection.findOne({
			username: usn,
			password: pass,
		});
		if (user && (await bcrypt.compare(pass, user.password))) {
			res.status(200).json({ message: "Login successful!" });
		} else {
			res.status(401).json({ error: "Invalid credentials" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Route to handle liking a recipe
app.post("/api/recipe/like/:id/:collectionName", async (req, res) => {
	const recipeId = req.params.id;
	const collectionName = req.params.collectionName;

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
