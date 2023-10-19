import "./App.css"
//https://styled-components.com/
import styled from "styled-components"
// COMPONENTS
import Header from "./components/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import Feed from "./components/Feed/Feed"
import Widget from "./components/Widget"
import Login from "./components/Login/Login"
// HOOKS

// REDUCER
import { useStateValue } from "./components/Login/context/StateProvider"

function App() {
	const [{ user }, setUser] = useStateValue()

	return (
		<AppWrapper>
			{user ? (
				<>
					<Header />
					<div className="app__body">
						<Sidebar />
						<Feed />
						<Widget />
					</div>
				</>
			) : (
				<Login />
			)}
		</AppWrapper>
	)
}

const AppWrapper = styled.div`
	background-color: #f1f2f5;
	.app__body {
		display: flex;
	}
`

export default App
