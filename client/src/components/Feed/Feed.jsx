import styled from "styled-components"
import Stories from "./Stories"
import Addpost from "../Posts/Addpost"
import Post from "../Posts/Post"

import axios from "../../axios.js"
import Pusher from "pusher-js"

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

	// USEEFFECT FOR PUSHER
	useEffect(() => {
		const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
			cluster: "ap1",
		})
		const channel = pusher.subscribe("posts")
		channel.bind("inserted", (data) => {
			syncFeed()
		})
		return () => {
			channel.unbind_all()
			channel.unsubscribe()
		}
	}, [])

	return (
		<FeedWrapper>
			<Stories />
			<Addpost />
			{postsData.map((post) => (
				<Post
					key={post._id}
					profilePic={post.avatar}
					message={post.caption}
					timestamp={post.timestamp}
					imgName={post.image}
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
