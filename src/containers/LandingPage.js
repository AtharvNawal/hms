import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import AppointmentCard from "../components/appointmentCards";
import Footer from "../components/footer";
import Loader from "../components/loader";
import LoginDetails from "../context/LoginContext";
import Navbar from "../components/navbar";

import "../assets/css/main.css";

const LandingPage = () => {
	// const { user, loggedIn, baseURL } = useContext(LoginDetails);
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(false);

	const ud = localStorage.getItem("user");
	let userData = JSON.parse(ud);
	useEffect(() => {
		const accessToken = localStorage.getItem("token")

			setLoading(true);
			if (!userData || !accessToken) {
				console.error("User data or access token is missing.");
				setLoading(false);
				return;
			}
	
			console.log(userData);
	
			const fetchAppointments = async () => {
				try {
					const { data: foundAppointments } = await Axios.get(
						`http://localhost:5001/user/getApt/${userData._id}`, 
						{
							headers: { authorization: `Bearer ${accessToken}` }
						}
					);
					console.info(`Appointments found for user: ${userData.name}`);
					setAppointments(foundAppointments);
					console.log(foundAppointments)
				} catch (error) {
					console.error(`Error fetching appointments for ${userData.name}`, error);
				} finally {
					setLoading(false);
				}
			};
	
			fetchAppointments();
	}, []);  // Ensure dependencies are properly set

	const BookMore = () => {
		window.location.href = "/appointments";
	};

	const onLogout = () => {
		localStorage.clear();
		window.location.href = "/";
	};
	const renderAppointments = appointments.map((appointment, index) => {
		return <AppointmentCard appointment={appointment} key={index} />;
	});

	return !loading ? (
		<React.Fragment>
			<div id="apt-container">
				<Navbar />
				<br />
				<h1 id="welcome-head">Welcome,&nbsp;{userData?.name || "Guest"}!</h1>
				<p id="Appointment-sub-head">
					Get all your pending appointments here.
				</p>
				<button id="apt-bookmore-btn" onClick={BookMore}>
					Book More
				</button>
				<button id="logout-btn" onClick={onLogout}>
					Logout
				</button>
				<br />
				<br />
				<div id="appointments-cards">{renderAppointments}</div>
			</div>

			<Footer />
		</React.Fragment>
	) : (
		<Loader />
	);
};
export default LandingPage;
