// // // // // const mongoose = require("mongoose");
// // // // // mongoose.connect(
// // // // // 	"mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/wwt-project?retryWrites=true&w=majority",
// // // // // 	{
// // // // // 		useNewUrlParser: true,
// // // // // 		useUnifiedTopology: true,
// // // // // 	}
// // // // // );

// // // // // // // Step 1: Define a Mongoose schema for individual credentials
// // // // // // const credentialSchema = new mongoose.Schema({
// // // // // // 	username: String,
// // // // // // 	password: String,
// // // // // // });

// // // // // // const Credential = mongoose.model("Credential", credentialSchema);

// // // // // // // Step 2: Insert credentials into the "credentials" collection
// // // // // const creds = [
// // // // // 	{
// // // // // 		username: "Hello123",
// // // // // 		password: "bye123",
// // // // // 	},
// // // // // 	{
// // // // // 		username: "Goodmorning",
// // // // // 		password: "goodnight",
// // // // // 	},
// // // // // 	{
// // // // // 		username: "lisan",
// // // // // 		password: "lisan",
// // // // // 	},
// // // // // 	{
// // // // // 		username: "yello",
// // // // // 		password: "bai",
// // // // // 	},
// // // // // ];

// // // // // // async function insertCredentials() {
// // // // // // 	try {
// // // // // // 		const result = await Credential.insertMany(creds);
// // // // // // 		console.log(`${result.length} documents inserted successfully`);
// // // // // // 		return result;
// // // // // // 	} catch (error) {
// // // // // // 		console.error(error);
// // // // // // 	}
// // // // // // }

// // // // // // Step 3: For each inserted credential, create a new collection with the username as the name
// // // // // async function createCollections(creds) {
// // // // // 	for (const cred of creds) {
// // // // // 		const username = cred.username;

// // // // // 		// Step 5: Define a schema for the new collection
// // // // // 		const collectionSchema = new mongoose.Schema({
// // // // // 			title: String,
// // // // // 			body: String,
// // // // // 			image: String,
// // // // // 			comments: [
// // // // // 				{
// // // // // 					commenter: String,
// // // // // 					comment: String,
// // // // // 				},
// // // // // 			],
// // // // // 			like: Number,
// // // // // 		});

// // // // // 		// Step 6: Create a model for the new collection
// // // // // 		const CollectionModel = mongoose.model(username, collectionSchema);

// // // // // 		// You can now use CollectionModel to interact with the collection
// // // // // 		// For example, to create a new document:
// // // // // 		const newDocument = new CollectionModel({
// // // // // 			title: "Sample Title",
// // // // // 			body: "Sample Body",
// // // // // 			image: "sample.jpg",
// // // // // 			comments: [
// // // // // 				{
// // // // // 					commenter: "Commenter1",
// // // // // 					comment: "Comment 1",
// // // // // 				},
// // // // // 				{
// // // // // 					commenter: "Commenter2",
// // // // // 					comment: "Comment 2",
// // // // // 				},
// // // // // 			],
// // // // // 			like: 0,
// // // // // 		});

// // // // // 		try {
// // // // // 			await newDocument.save();
// // // // // 			console.log(`Document saved in collection "${username}"`);
// // // // // 		} catch (error) {
// // // // // 			console.error(error);
// // // // // 		}
// // // // // 	}
// // // // // }

// // // // // async function main() {
// // // // // 	// const insertedCredentials = await insertCredentials();
// // // // // 	// if (insertedCredentials) {
// // // // // 		await createCollections(creds);

// // // // // 	mongoose.connection.close(); // Close the connection after insertion
// // // // // }

// // // // // main();

// // // // const mongoose = require("mongoose");
// // // // mongoose.connect(
// // // // 	"mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/wwt-project?retryWrites=true&w=majority",
// // // // 	{
// // // // 		useNewUrlParser: true,
// // // // 		useUnifiedTopology: true,
// // // // 	}
// // // // );

// // // // // Step 5: Define a schema for the new collection
// // // // const collectionSchema = new mongoose.Schema({
// // // // 	title: String,
// // // // 	body: String,
// // // // 	image: String,
// // // // 	comments: [
// // // // 		{
// // // // 			commenter: String,
// // // // 			comment: String,
// // // // 		},
// // // // 	],
// // // // 	like: Number,
// // // // });

// // // // // Step 6: Create a model for the new collection
// // // // const CollectionModel = mongoose.model("Username", collectionSchema);

// // // // // Step 7: Insert recipes into the user's collection
// // // // const recipes = [
// // // // 	{
// // // // 		title: "Recipe 1",
// // // // 		body: "Recipe description 1",
// // // // 		image: "recipe1.jpg",
// // // // 		comments: [],
// // // // 		like: 0,
// // // // 	},
// // // // 	{
// // // // 		title: "Recipe 2",
// // // // 		body: "Recipe description 2",
// // // // 		image: "recipe2.jpg",
// // // // 		comments: [],
// // // // 		like: 0,
// // // // 	},
// // // // 	{
// // // // 		title: "Recipe 3",
// // // // 		body: "Recipe description 3",
// // // // 		image: "recipe3.jpg",
// // // // 		comments: [],
// // // // 		like: 0,
// // // // 	},
// // // // ];

// // // // async function insertRecipes() {
// // // // 	try {
// // // // 		await CollectionModel.insertMany(recipes);
// // // // 		console.log("Recipes inserted successfully");
// // // // 	} catch (error) {
// // // // 		console.error(error);
// // // // 	} finally {
// // // // 		mongoose.connection.close(); // Close the connection after insertion
// // // // 	}
// // // // }

// // // // insertRecipes();

// // // const mongoose = require("mongoose");
// // // mongoose.connect(
// // //   "mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/wwt-project?retryWrites=true&w=majority",
// // //   {
// // //     useNewUrlParser: true,
// // //     useUnifiedTopology: true,
// // //   }
// // // );

// // // // Step 5: Define a schema for the recipes
// // // const recipeSchema = new mongoose.Schema({
// // //   title: String,
// // //   body: String,
// // //   image: String,
// // //   comments: [{
// // //     commenter: String,
// // //     comment: String
// // //   }],
// // //   like: Number,
// // //   collection: String // Add a field to track the collection name
// // // });

// // // const RecipeModel = mongoose.model('Recipe', recipeSchema);

// // // // Function to insert three recipes into a collection
// // // async function insertRecipesIntoCollection(collectionName) {
// // //   const recipes = [
// // //     {
// // //       title: "Recipe 1",
// // //       body: "Recipe description 1",
// // //       image: "recipe1.jpg",
// // //       comments: [],
// // //       like: 0
// // //     },
// // //     {
// // //       title: "Recipe 2",
// // //       body: "Recipe description 2",
// // //       image: "recipe2.jpg",
// // //       comments: [],
// // //       like: 0
// // //     },
// // //     {
// // //       title: "Recipe 3",
// // //       body: "Recipe description 3",
// // //       image: "recipe3.jpg",
// // //       comments: [],
// // //       like: 0
// // //     }
// // //   ];

// // //   try {
// // //     await RecipeModel.insertMany(recipes.map(recipe => ({
// // //       ...recipe,
// // //       collection: collectionName // Add the collection name to each recipe
// // //     })));
// // //     console.log(`Recipes inserted into collection "${collectionName}"`);
// // //   } catch (error) {
// // //     console.error(error);
// // //   }
// // // }

// // // // Function to fetch the names of existing collections
// // // async function getCollections() {
// // //   try {
// // //     const collections = await mongoose.connection.db.listCollections().toArray();
// // //     const collectionNames = collections.map(collection => collection.name);

// // //     return collectionNames;
// // //   } catch (error) {
// // //     console.error(error);
// // //   }
// // // }

// // // async function main() {
// // //   const collections = await getCollections();

// // //   if (collections.length === 0) {
// // //     console.log('No collections found.');
// // //     mongoose.connection.close();
// // //     return;
// // //   }

// // //   for (const collection of collections) {
// // //     await insertRecipesIntoCollection(collection);
// // //   }

// // //   mongoose.connection.close();
// // // }

// // // main();
// // const mongoose = require("mongoose");
// // mongoose.connect(
// // 	"mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/wwt-project?retryWrites=true&w=majority",
// // 	{
// // 		useNewUrlParser: true,
// // 		useUnifiedTopology: true,
// // 	}
// // );

// // const recipeSchema = new mongoose.Schema({
// // 	title: String,
// // 	body: String,
// // 	image: String,
// // 	comments: [
// // 		{
// // 			commenter: String,
// // 			comment: String,
// // 		},
// // 	],
// // 	like: Number,
// // });

// // const Recipe = mongoose.model("Recipe", recipeSchema);

// // const recipesToAdd = [
// // 	{
// // 		title: "Recipe 1",
// // 		body: "Recipe description 1",
// // 		image: "recipe1.jpg",
// // 		comments: [],
// // 		like: 0,
// // 	},
// // 	{
// // 		title: "Recipe 2",
// // 		body: "Recipe description 2",
// // 		image: "recipe2.jpg",
// // 		comments: [],
// // 		like: 0,
// // 	},
// // 	{
// // 		title: "Recipe 3",
// // 		body: "Recipe description 3",
// // 		image: "recipe3.jpg",
// // 		comments: [],
// // 		like: 0,
// // 	},
// // ];

// // async function addRecipesToCollection(collectionName, recipes) {
// // 	try {
// // 		const RecipeModel = mongoose.model(collectionName, recipeSchema);

// // 		await RecipeModel.insertMany(recipes);
// // 		console.log(`Recipes inserted into collection "${collectionName}"`);
// // 	} catch (error) {
// // 		console.error(error);
// // 	} finally {
// // 		mongoose.connection.close();
// // 	}
// // }

// // const collectionName = "yellos";

// // addRecipesToCollection(collectionName, recipesToAdd);

// const mongoose = require("mongoose");

// async function f() {
// 	try {
// 		const credentialsCollection = await mongoose.connection.db.collection(
// 			"credentials"
// 		);
// 		const user = await credentialsCollection.findOne({
// 			username: "hello123",
// 			password: "bye123",
// 		});
// 		if (user) console.log(user);
// 		else console.log("nope");
// 	} catch (error) {
// 		console.error(error);
// 	}
// 	await mongoose.connection.close();
// }

// f();

const mongoose = require("mongoose");

async function fetchData(username, password) {
	try {
		await mongoose.connect(
			"mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/wwt-project?retryWrites=true&w=majority",
			{
				useNewUrlParser: false,
				useUnifiedTopology: false,
			}
		);

		const credentialsCollection =
			mongoose.connection.db.collection("credentials");

		const user = await credentialsCollection.findOne({
			username: username,
			password: password,
		});

		if (user) {
			console.log(user);
		} else {
			console.log("nope");
		}

		// Close the connection after fetching data
		await mongoose.connection.close();
	} catch (error) {
		console.error(error);
	}
}

// Call the fetchData function
fetchData("hello123", "bye123");
