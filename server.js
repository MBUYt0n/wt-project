const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "15mb" }));
app.use(bodyParser.json({ limit: "15mb" }));

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

app.post("/api/updateProfile", async (req, res) => {
	const { username, name, bio } = req.body;

	try {
		await mongoose.connection.db
			.collection("credentials")
			.updateOne(
				{ username: username },
				{ $set: { name: name, bio: bio } }
			);

		res.status(200).json({ message: "Profile updated successfully!" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/api/changePassword", async (req, res) => {
	const { username, currentPassword, newPassword } = req.body;

	try {
		const credentialsCollection = await mongoose.connection.db.collection(
			"credentials"
		);
		const user = await credentialsCollection.findOne({
			username: username,
		});

		if (!user) {
			return res.status(401).json({ error: "User not found" });
		}

		const isPasswordValid = await bcrypt.compare(
			currentPassword,
			user.password
		);

		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ error: "Incorrect current password" });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await credentialsCollection.updateOne(
			{ username: username },
			{ $set: { password: hashedPassword } }
		);

		res.status(200).json({ message: "Password changed successfully!" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/api/saveContent", async (req, res) => {
	const { title, content, image, username } = req.body;
	if (!title || !content || !username) {
		return res.status(400).json({
			message: "Title, content, date, and username are required fields.",
		});
	}
	try {
		const collectionName = username;

		const collection = mongoose.connection.db.collection(collectionName);
		const newContent = {
			title: title,
			body: content,
			image: image,
			username: username,
			likes: 0,
		};
		console.log("Received POST request data:", req.body);
		await collection.insertOne(newContent);
		console.log("Inserted data into collection");
		res.status(200).json({ message: "Data inserted successfully" });
	} catch (error) {
		console.error("Error inserting data:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

async function getRecipes(collectionName) {
	return await mongoose.connection.db
		.collection(collectionName)
		.find({})
		.toArray();
}

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
		.updateOne({ user: username }, { $addToSet: { liked: recipeId } });
}

app.listen(5000, () => {
	console.log("Server is running on http://localhost:5000");
});
