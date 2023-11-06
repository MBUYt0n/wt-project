// // const { MongoClient } = require("mongodb");

// // // Replace the uri string with your connection string.
// // const uri =
// // 	"mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/?retryWrites=true&w=majority";

// // const client = new MongoClient(uri);

// // async function run() {
// // 	try {
// // 		const database = client.db("wwt-project");
// // 		const movies = database.collection("recipe sharing");

// // 		const documents = [
// // 			{
// // 				title: "Inception",
// // 				director: "Christopher Nolan",
// // 				year: 2010,
// // 			},
// // 			{
// // 				title: "nowtakwb",
// // 				director: "me",
// // 				year: 30102,
// // 			},
// // 			{
// // 				title: "oweffjfw",
// // 				director: "not me",
// // 				year: 4232,
// // 			},
// // 			{
// // 				title: "thanks ",
// // 				director: "him",
// // 				year: 433,
// // 			},
// // 		];

// // 		const result = await movies.insertMany(documents);

// // 		console.log(`Inserted ${result.insertedCount} documents`);
// // 	} finally {
// // 		// Ensures that the client will close when you finish/error
// // 		await client.close();
// // 	}
// // }
// // run().catch(console.dir);

// // import React, { useState } from "react";
// const { MongoClient } = require("mongodb");

// const uri =
// 	"mongodb+srv://pes1202201377:iamdarock2004@cluster0.buvuxr1.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// async function run() {
// 	try {
// 		const database = client.db("wwt-project");
// 		const movies = database.collection("recipe sharing");

// 		movies.aggregate([{ Sample: { size: 4 } }]).toArray((err, result) => {
// 			if (err) throw err;
// 			items = [result];
// 			console.log(result);
// 		});
// 	} finally {
// 		// Ensures that the client will close when you finish/error
// 		await client.close();
// 	}
// }
// run().catch(console.dir);

const { MongoClient } = require("mongodb");

const uri =
	"mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
	try {
		await client.connect(); // Connect to the MongoDB server
		const database = client.db("wwt-project");
		const movies = database.collection("recipe sharing");

		const result = await movies.aggregate([{ $sample: { size: 4 } }]).toArray();
		console.log(result)
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

run().catch(console.dir);
