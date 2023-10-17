import styled from "styled-components"
import Stories from "./Stories"
import Addpost from "../Posts/Addpost"
import Post from "../Posts/Post"

import axios from "../../axios.js"

import { useEffect, useState } from "react"

const Feed = () => {
	const [postsData, setPostsData] = useState([])

	const syncFeed = async () => {
		try {
			const res = await axios.get("/posts")
			console.log(res.data)
			setPostsData(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		syncFeed()
	}, [])

	return (
		<FeedWrapper>
			<Stories />
			<Addpost />
			{postsData.map((post) => (
				<Post
					key={post._id}
					profilePic={post.avatar}
					message={post.text}
					timestamp={post.timestamp}
					imgName={post.imgName}
					username={post.user}
				/>
			))}
		</FeedWrapper>
	)
}

const FeedWrapper = styled.div`
	flex: 1;
	padding: 30px 150px;
	display: flex;
	flex-direction: column;
	align-items: center;
`
export default Feed
