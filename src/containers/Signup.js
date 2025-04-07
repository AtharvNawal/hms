import Axios from "axios";
import React, { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import logo from "../assets/imgs/logo.png";
import "../assets/css/form.css";

const Signup = () => {
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		age: "",
		type: "patient", // Default user type
	});
	const [errors, setErrors] = useState({ name: "", email: "", password: "", age: "", type: "" });
	const BASE_URL = process.env.REACT_APP_BASE_URL;

	// Email Validation Function
	const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

	// Password Validation Function
	const validatePassword = (password) => /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);

	// Age Validation Function
	const validateAge = (age) => Number(age) >= 18;

	// Handle Input Change and Real-Time Validation
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });

		if (name === "email") {
			setErrors({ ...errors, email: validateEmail(value) ? "" : "Invalid email format" });
		} else if (name === "password") {
			setErrors({
				...errors,
				password: validatePassword(value) ? "" : "Password must be 8+ chars, 1 uppercase, 1 special char",
			});
		} else if (name === "age") {
			setErrors({
				...errors,
				age: validateAge(value) ? "" : "Age must be 18 or above",
			});
		}
	};

	// Form Submission Handler
	const onFormSubmit = async (event) => {
		event.preventDefault();
		const age = Number(user.age);

		if (!user.name || !user.email || !user.password || !user.age || !user.type) {
			setErrors({
				name: !user.name ? "Name is required" : "",
				email: !user.email ? "Email is required" : "",
				password: !user.password ? "Password is required" : "",
				age: !user.age ? "Age is required" : "",
				type: !user.type ? "User type is required" : "",
			});
			return;
		}

		if (!validateEmail(user.email) || !validatePassword(user.password) || !validateAge(age)) {
			return;
		}

		try {
			await Axios.post(`${BASE_URL}/user/signup`, user);
			window.location.href = "/login";
		} catch (error) {
			alert("Signup failed! Try again.");
		}
	};

	return (
		<React.Fragment>
			<div id="super-container">
				<Navbar />
				<div className="parent-container">
					<form id="signin-container" onSubmit={onFormSubmit}>
						<img src={logo} alt="Health Insurance" />

						{/* Name Field */}
						<div className="input-container">
							<i className="fa fa-user icon"></i>
							<input className="logininput" type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
						</div>
						{errors.name && <div className="error-text">{errors.name}</div>}

						{/* Email Field */}
						<div className="input-container">
							<i className="fa fa-envelope icon"></i>
							<input className="logininput" type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
						</div>
						{errors.email && <div className="error-text">{errors.email}</div>}

						{/* Password Field */}
						<div className="input-container">
							<i className="fa fa-fingerprint icon"></i>
							<input className="logininput" type="password" name="password" placeholder="Password (8+ chars, 1 uppercase, 1 special char)" value={user.password} onChange={handleChange} />
						</div>
						{errors.password && <div className="error-text">{errors.password}</div>}

						{/* Age Field */}
						<div className="input-container">
							<i className="fa fa-clock icon"></i>
							<input className="logininput" type="number" name="age" placeholder="Age" value={user.age} onChange={handleChange} />
						</div>
						{errors.age && <div className="error-text">{errors.age}</div>}

						{/* User Type Field */}
						<div className="input-container">
							<i className="fa fa-user-tag icon"></i>
							<select className="logininput" name="type" value={user.type} onChange={handleChange}>
								<option value="patient">Patient</option>
								<option value="admin">Admin</option>
							</select>
						</div>
						{errors.type && <div className="error-text">{errors.type}</div>}

						{/* Submit Button */}
						<button id="submit" type="submit">Sign Up</button>
					</form>
				</div>
			</div>
			<Footer />
		</React.Fragment>
	);
};

export default Signup;
