import multer from "multer"
import { GridFsStorage } from "multer-gridfs-storage"
import path from "path"
import mongoose from "mongoose"

const conn = mongoose.connection
const storage = new GridFsStorage({
	db: conn,
	url: process.env.MONGO_URI,
	options: { useNewUrlParser: true, useUnifiedTopology: true },
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			const filename = `image-${Date.now()}${path.extname(file.originalname)}`
			const fileInfo = {
				filename: filename,
				bucketName: "images",
			}
			resolve(fileInfo)
		})
	},
})

const upload = multer({ storage })
export default upload
