import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';

import storyRoutes from './routes/stories.js';

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(cors());
app.use('/stories', storyRoutes)

const MONGO_URI = "mongodb+srv://keerthana:admin123@cluster0.x1g4q.mongodb.net/"
const PORT = process.env.PORT || 5001;

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`));
	} catch (err) {
		console.error("Connection to mongoDB failed", err.message);
	}
}

connectDB();

mongoose.connection.on("open", ()=>console.log("MongoDB connection has been established successfully."))
mongoose.connection.on("error", (err)=>console.log(err));

