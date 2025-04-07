import Axios from "axios";
import React, { useState, useContext } from "react";

import Footer from "../components/footer";
import LoginDetails from "../context/LoginContext";
import Navbar from "../components/navbar";

import logo from "../assets/imgs/Doctor_20.png";
import "../assets/css/form.css";

const BookAppointments = () => {
	const { user, baseURL } = useContext(LoginDetails);
	const [appointment, setAppointment] = useState({});
	const [phoneNumber, setPhoneNumber] = useState("");
	const [problem, setProblem] = useState("");

	const onMakeAppointment = async (e) => {
		const ud = localStorage.getItem("user");
		let userData = JSON.parse(ud);
		let accessToken = localStorage.getItem("token")
		e.preventDefault();

		// Validate phone number before submitting
		const phoneRegex = /^[0-9]{10}$/;
		if (!phoneRegex.test(phoneNumber)) {
			alert("Please enter a valid 10-digit phone number.");
			return;
		}

		await Axios.post(
			"http://localhost:5001/user/makeApt",
			{
				...appointment,
				pid: userData._id,
				phoneNumber,
				problem,
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			}
		)
			.then(() => {
				window.alert("Your appointment successfully scheduled.");
				window.location.href = "/appointmentpage";
			})
			.catch((error) => {
				console.error("Some error occurred while making appointment", error);
			});
	};

	return (
		<React.Fragment>
			<div id="super-container">
				<Navbar />
				<div className="parent-container">
					<form id="login-container">
						<img src={logo} alt="Health Insurance" />
						<div className="input-container">
							<i className="fa fa-calendar-check icon"></i>
							<input
								id="dateinput"
								type="date"
								name="date"
								placeholder="Date *"
								required
								min={new Date().toISOString().split("T")[0]}
								onChange={(e) => {
									const selectedDate = new Date(e.target.value);
									const currentDate = new Date();
									currentDate.setHours(0, 0, 0, 0);

									if (selectedDate < currentDate) {
										alert("You cannot book an appointment for a past date!");
										e.target.value = "";
										return;
									}

									setAppointment({
										...appointment,
										date: selectedDate.getTime(),
									});
								}}
						/>
					</div>

					<div className="input-container">
						<label>Phone Number:</label>
						<input
							type="text"
							className="form-control"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							placeholder="Enter 10-digit phone number"
							pattern="[0-9]{10}"
						/>
					</div>

					<div className="input-container">
						<label>Health Issue Details:</label>
						<textarea
							className="form-control"
							value={problem}
							onChange={(e) => setProblem(e.target.value)}
							placeholder="Describe your issue"
						/>
					</div>

					<div className="radio-container">
						<h3 id="radio-container-head">Choose time slot</h3>
						<label>
							<input className="radio" type="radio" name="slot" value={1} onChange={(e) => setAppointment({ ...appointment, slot: e.target.value })} />
							<span className="radio-text">1 (7AM - 10AM)</span>
						</label>
						<label>
							<input className="radio" type="radio" name="slot" value={2} onChange={(e) => setAppointment({ ...appointment, slot: e.target.value })} />
							<span className="radio-text">2 (12PM - 4PM)</span>
						</label>
						<label>
							<input className="radio" type="radio" name="slot" value={3} onChange={(e) => setAppointment({ ...appointment, slot: e.target.value })} />
							<span className="radio-text">3 (6PM - 11PM)</span>
						</label>
					</div>
					<button id="submit" type="submit" onClick={onMakeAppointment}>Book</button>
				</form>
			</div>
			</div>
			<Footer />
		</React.Fragment>
	);
};

export default BookAppointments;
