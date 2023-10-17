// imports
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import Grid from "gridfs-stream"
import bodyParser from "body-parser"
import mongo from "mongodb"
import Pusher from "pusher"

import upload from "./middleware/upload.js"
import Posts from "./model/postModel.js"

import ConnectDB from "./config/db.js"

// App Config
dotenv.config()
const app = express()
const port = process.env.PORT || 9000

// DB config
ConnectDB()

// Middleware config
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

let gfs
const conn = mongoose.connection
conn.once("open", () => {
	gfs = Grid(conn.db, mongoose.mongo)
	gfs.collection("images")
})

// API Endpoints
app.get("/", (req, res) => res.status(200).send("API is WORKING"))

app.post("/upload/image", upload.single("files"), (req, res) => {
	if (req.file) {
		// File upload was successful.
		res.json({ filename: req.file.filename })
	} else {
		// No file was uploaded or an error occurred.
		res.status(400).send("File upload failed.")
	}
})

app.get("/images/single", async (req, res) => {
	try {
		const file = await gfs.files.findOne({ filename: req.query.name })
		const readStream = gfs.createReadStream(file._id)
		const daya = readStream.pipe(res)
		res.send(daya)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.post("/upload/post", async (req, res) => {
	const dbPost = req.body
	try {
		const response = await Posts.create(dbPost)
		res.status(201).send(response.message)
	} catch (error) {
		res.status(500).send(error.message || error)
	}
})

app.get("/posts", async (req, res) => {
	try {
		const response = await Posts.find()
		const data = response.sort((b, a) => a.timestamp - b.timestamp)
		res.status(200).send(data)
	} catch (error) {
		res.status(500).send(error.message)
	}
})

// App Listener
app.listen(port, () => console.log(`Listening on ${port}`))
