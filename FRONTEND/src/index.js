/** @format */
import "./index.css"; // or './styles.css', wherever Tailwind is defined

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Admin from "./admin";
ReactDOM.render(
	<Router>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/admin" element={<Admin />} />
		</Routes>
	</Router>,
	document.getElementById("root")
);
