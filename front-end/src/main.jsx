import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StoreProvider>
			<Router>
				<App />
			</Router>
		</StoreProvider>
	</React.StrictMode>
);
