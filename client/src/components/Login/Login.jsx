import styled from "styled-components"
import { Button } from "@mui/material"

import { signInWithGoogle } from "../../firebase.js"

// REDCUER
import { useStateValue } from "./context/StateProvider.jsx"
import { actionTypes } from "./context/Reducer.js"

const Login = () => {
	const [{}, dispatch] = useStateValue()

	const signIn = () => {
		signInWithGoogle()
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				})
			})
			.catch((error) => alert(error.message))
	}
	return (
		<LoginWrapper>
			<div className="login__logo">
				<img
					src="https://cdn1.iconfinder.com/data/icons/soleicons-solid-vol-1/64/reactjs_javascript_library_atom_atomic_react-512.png"
					alt="login"
				/>
				<h1>Popular Social</h1>
			</div>
			<Button type="submit" className="login__btn" onClick={signIn}>
				Sign In
			</Button>
		</LoginWrapper>
	)
}

const LoginWrapper = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
	.login__logo {
		display: flex;
		flex-direction: column;
		img {
			object-fit: contain;
			height: 150px;
			max-width: 200px;
		}
	}
	.login__btn {
		width: 300px;
		background-color: #2e81f4;
		color: #eff2f5;
		font-weight: 800;
		&:hover {
			background-color: white;
			color: #2e81f4;
		}
	}
`
export default Login
