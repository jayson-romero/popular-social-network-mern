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
conn.once("open", async () => {
	gfs = await Grid(conn.db, mongoose.mongo)
	gfs.collection("images")
})

// API Endpoints
app.get("/", (req, res) => res.status(200).send("API is WORKING"))

app.post("/upload/image", upload.single("images"), (req, res) => {
	res.status(201).send(req.file)
})

app.get("/images/single", async (req, res) => {
	try {
		const file = await gfs.files.findOne({ filename: req.query.name })
		try {
			const readStream = gfs.createReadStream({
				filename: req.query.name,
			})
			console.log(readStream.toString)
		} catch (error) {
			console.log(error.message)
		}

		// if (file) {
		// 	const readStream = gfs.createReadStream(file._id)
		// 	const daya = readStream.pipe(res)
		// 	res.send(daya)
		// }
	} catch (error) {
		res.status(500).send(error)
	}
})

// App Listener
app.listen(port, () => console.log(`Listening on ${port}`))
