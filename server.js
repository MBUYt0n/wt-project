const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

mongoose.connect(
  "mongodb+srv://pes1202201377:lisanlisan@cluster0.buvuxr1.mongodb.net/wwt-project?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Middleware to authenticate requests with a JWT token
app.use(authenticateToken);

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
      // Generate JWT token and send it in the response
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: "Login successful!", token: token });
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
    await mongoose.connection.db.collection("credentials").updateOne(
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
      return res.status(401).json({ error: "Incorrect current password" });
    }

    await credentialsCollection.updateOne(
      { username: username },
      { $set: { password: newPassword } }
    );

    res.status(200).json({ message: "Password changed successfully!" });
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
app.post('/saveContent', async (req, res) => {
  const { title, content, image, date, username, likes } = req.body;
  if (!title || !content || !date || !username) {
    return res.status(400).json({ message: 'Title, content, date, and username are required fields.' });
  }
  try {
    const client = await MongoClient.connect(mongoURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const db = client.db();
    const collectionName = username;

    // Check if collection exists, create if it doesn't
    const collectionExists = await db.listCollections({ name: collectionName }).hasNext();
    if (!collectionExists) {
      await db.createCollection(collectionName);
      console.log('Created new collection');
    }
    const collection = db.collection(collectionName);
    const newContent = {
      title: title,
      content: content,
      image: image,
      date: new Date(date),
      username: username,
      likes: likes || 0,
    };

    console.log('Received POST request data:', req.body);
    await collection.insertOne(newContent);
    console.log('Inserted data into collection');
    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware function to authenticate JWT tokens
function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
