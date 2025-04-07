import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";

import { BASE_URL } from "./config/base";
import BookAppointments from "./containers/BookAppointments";
import LandingPage from "./containers/LandingPage";
import Login from "./containers/Login";
import LoginDetails from "./context/LoginContext";
import HomePage from "./components/Home";
import Signup from "./containers/Signup";
import AboutUs from "./components/AboutUs";
import AdminDashboard from "./components/AdminDashboard";


// import React from 'react';
// import AdminDashboard from './AdminDashboard';
// import './AdminDashboard.css';

// function App() {
//   return (
//     <div className="App">
//       <AdminDashboard />
//     </div>
//   );
// }


const App = () => {
	const [user, setUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);
	const baseURL = BASE_URL;

	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		if (!loggedIn && savedUser) {
			setUser(JSON.parse(savedUser).user);
			setLoggedIn(true);
		}
	}, [loggedIn]);

	return (
		<LoginDetails.Provider value={{ loggedIn, user, setUser, baseURL }}>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/appointments" element={<BookAppointments />} />
					<Route path="/appointmentpage" element={<LandingPage />} />
					<Route path="/about-us" element={<AboutUs />} />
					<Route path="/patient" element={<LandingPage />} />
					<Route path="/admin" element={<AdminDashboard />} />

					{/* 404 Page Not Found */}
					<Route path="/404" element={<h1>Page not found</h1>} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Routes>
			</Router>
		</LoginDetails.Provider>
	);
};

export default App;
