const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
mongoose.connect(
	"mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/wwt-project?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);


app.get("/api/recipe", async (req, res) => {
	try {
		const randomRecipes = await mongoose.connection.db
			.collection("recipe-sharing")
			.find({})
			.toArray();

		const hello123Recipes = await mongoose.connection.db
			.collection("hello123")
			.find({})
			.toArray();

		const goodmorningRecipes = await mongoose.connection.db
			.collection("goodmornings")
			.find({})
			.toArray();

		const yellosRecipes = await mongoose.connection.db
			.collection("yellos")
			.find({})
			.toArray();

		const lisansRecipes = await mongoose.connection.db
			.collection("lisans")
			.find({})
			.toArray();

		const allRecipes = [
			...randomRecipes,
			...hello123Recipes,
			...goodmorningRecipes,
			...yellosRecipes,
			...lisansRecipes,
		];

		res.json(allRecipes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

app.listen(5000, () => {
	console.log("Server is running on http://localhost:5000");
});