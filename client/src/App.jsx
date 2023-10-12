import "./App.css"
//https://styled-components.com/
import styled from "styled-components"
// COMPONENTS
import Header from "./components/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import Feed from "./components/Feed/Feed"
import Widget from "./components/Widget"

function App() {
	return (
		<>
			<AppWrapper>
				<Header />
				<div className="app__body">
					<Sidebar />
					<Feed />
					<Widget />
				</div>
			</AppWrapper>
		</>
	)
}

const AppWrapper = styled.div`
	background-color: #f1f2f5;
	.app__body {
		display: flex;
	}
`

export default App
