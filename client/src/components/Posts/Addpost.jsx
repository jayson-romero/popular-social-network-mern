import styled from "styled-components"

import { Avatar, Input } from "@mui/material"
import VideocamIcon from "@mui/icons-material/Videocam"
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"

import { useState } from "react"
import { useStateValue } from "../Login/context/StateProvider"

import axios from "../../axios.js"
import { storage, ref, uploadBytes, getDownloadURL } from "../../firebase.js"

const Addpost = () => {
	const [input, setInput] = useState("")
	const [image, setImage] = useState(null)
	const [{ user }, dispatch] = useStateValue()

	const [url, setUrl] = useState("")

	const handleChange = (e) => {
		if (e.target.files[0]) setImage(e.target.files[0])
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (image == null) return
		try {
			const imageRef = ref(storage, `images/${image.name}`)
			const result = await uploadBytes(imageRef, image)
			const url = await getDownloadURL(result.ref)
			if (url) {
				try {
					setUrl(url)
					const response = await axios.post("/upload/post", {
						user: user.displayName,
						avatar: user.photoUR,
						image: url,
						caption: input,
						timestamp: Date.now(),
					})
					if (response) {
						alert("post upload success")

						setImage(null)
						setInput("")
					}
				} catch (error) {
					console.log(error)
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<MessengerWrapper>
			<MessengerTop>
				<Avatar src={user.photoURL} />
				<form>
					<input
						type="text"
						className="messenger__input"
						placeholder="What's on your mind?"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<Input
						type="file"
						className="messenger__fileSelector"
						onChange={handleChange}
					/>
					<button onClick={handleSubmit} type="submit">
						Hidden
					</button>
				</form>
			</MessengerTop>
			<MessengerBottom>
				<div className="messenger__option">
					<VideocamIcon style={{ color: "red" }} />
					<h3>Live Video</h3>
				</div>
				<div className="messenger__option">
					<PhotoLibraryIcon style={{ color: "green" }} />
					<h3>Photo/Video</h3>
				</div>
				<div className="messenger__option">
					<InsertEmoticonIcon style={{ color: "orange" }} />
					<h3>Feeling/Activity</h3>
				</div>
			</MessengerBottom>
		</MessengerWrapper>
	)
}

const MessengerWrapper = styled.div`
	display: flex;
	margin-top: 30px;
	flex-direction: column;
	background-color: white;
	border-radius: 15px;
	box-shadow: 0px 5px 7px -7px rgba(0, 0, 0, 0.75);
	width: 100%;
`
const MessengerTop = styled.div`
	display: flex;
	border-bottom: 1px solid #eff2f5;
	padding: 15px;
	form {
		flex: 1;
		display: flex;
		.messenger__input {
			flex: 1;
			outline-width: 0;
			border: none;
			padding: 5px 20px;
			margin: 0 10px;
			border-radius: 999px;
			background-color: #eff2f5;
		}
		.messenger__fileSelector {
			width: 20%;
		}
		button {
			visibility: hidden;
		}
	}
`
const MessengerBottom = styled.div`
	display: flex;
	justify-content: space-evenly;
	.messenger__option {
		padding: 20px;
		display: flex;
		align-items: center;
		color: gray;
		margin: 5px;
		h3 {
			font-size: medium;
			margin-left: 10px;
		}
		&:hover {
			background-color: #eff2f5;
			border-radius: 20px;
			cursor: pointer;
		}
	}
`

export default Addpost
