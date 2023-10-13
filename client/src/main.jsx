import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
// REDUCER
import { StateProvider } from "./components/Login/context/StateProvider.jsx"
import reducer, { initialState } from "./components/Login/context/Reducer.js"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<App />
		</StateProvider>
	</React.StrictMode>
)
