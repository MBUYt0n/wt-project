const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
	"mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/wwt-project?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

app.get("/api/recipe", async (req, res) => {
	try {
		const randomRecipe = await mongoose.connection.db
			.collection("recipe sharing")
			.aggregate([{ $sample: { size: 1 } }])
			.toArray();

		res.json(randomRecipe);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

app.listen(5000, () => {
	console.log("Server is running on http://localhost:5000");
});
