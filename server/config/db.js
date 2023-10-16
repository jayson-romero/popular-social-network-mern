import mongoose from "mongoose"

const ConnectDB = async () => {
	try {
		const connectionParams = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
		const conn = await mongoose.connect(process.env.MONGO_URI, connectionParams)
		console.log(`MongoDB Connected to ${conn.connection.host}`)
	} catch (error) {
		console.log(`ERROR ${error.message}`)
		process.exit(1)
	}
}

export default ConnectDB
