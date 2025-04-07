import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; 
import Navbar from "../components/navbar";
import Axios from "axios";
import Footer from "../components/footer";
import LoginDetails from "../context/LoginContext";
import logo from "../assets/imgs/logo.png";
import "../assets/css/form.css";

const Login = () => {
	const navigate = useNavigate();
	const { setUser } = useContext(LoginDetails);
	const BASE_URL = process.env.REACT_APP_BASE_URL;

	const [searchParams] = useSearchParams();
	const selectedRole = searchParams.get("role") || "patient"; // Default to "patient"

	const [credentials, setCredentials] = useState({ email: "", password: "", role: selectedRole });
	const [error, setError] = useState("");

	// Ensure role is set from query parameter or default value
	useEffect(() => {
		setCredentials((prev) => ({ ...prev, role: selectedRole }));
	}, [selectedRole]);

	const onFormSubmit = async (event) => {
		event.preventDefault();
		setError(""); // Reset error message
	
		if (!credentials.email || !credentials.password) {
			setError("All fields are required!");
			return;
		}
	
		try {
			console.log("Sending Credentials:", credentials);
			console.log("BASE_URL:", BASE_URL);
	
			const response = await Axios.post(`${BASE_URL}/user/login`, credentials);
			const data = response.data;
	
			console.log("Login Response:", data);
	
			if (!data.user || !data.user.role) {
				setError("Invalid response from server.");
				return;
			}
	
			// Store user data and token in localStorage
			localStorage.setItem("user", JSON.stringify(data.user));
			localStorage.setItem("token", data.accessToken);
			setUser(data.user);
	
			console.log("User Role:", data.user.role); // Debugging line
	
			// Redirect based on role
			if (credentials.role== "admin") {
				navigate("/admin"); // Admin Dashboard
			} else if (data.user.role === "patient") {
				navigate("/patient"); // Patient Dashboard
			} else {
				setError("Unauthorized user role!");
			}
		} catch (error) {
			console.error("Login Error:", error);
	
			if (error.response) {
				if (error.response.status === 401) {
					setError("Incorrect Email or Password!");
				} else if (error.response.status === 404) {
					setError("User not found. Please sign up.");
				} else {
					setError("Something went wrong! Please try again.");
				}
			} else if (error.request) {
				setError("Server is not responding. Please try again later.");
			} else {
				setError("An unexpected error occurred.");
			}
		}
	};
	
	

	const toSignUp = () => {
		navigate("/signup");
	};

	return (
		<React.Fragment>
			<div id="super-container">
				<Navbar />
				<div className="parent-container">
					<form id="login-container" onSubmit={onFormSubmit}>
						<img src={logo} alt="Health Insurance" />
						{/* <h2>{selectedRole ? `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login` : "Login"}</h2> */}

						{/* Role Selection */}
						<div className="input-container">
							<i className="fa fa-user-tag icon"></i>
							<select
								className="logininput"
								value={credentials.role}
								onChange={(e) =>
									setCredentials({ ...credentials, role: e.target.value })
								}
							>
								<option value="patient">Patient</option>
								<option value="admin">Admin</option>
							</select>
						</div>

						{/* Email Input */}
						<div className="input-container">
							<i className="fa fa-envelope icon"></i>
							<input
								className="logininput"
								type="email"
								name="email"
								placeholder="Email *"
								required
								value={credentials.email}
								onChange={(e) =>
									setCredentials({ ...credentials, email: e.target.value })
								}
							/>
						</div>

						{/* Password Input */}
						<div className="input-container">
							<i className="fa fa-lock icon"></i>
							<input
								className="logininput"
								type="password"
								name="password"
								placeholder="Password *"
								required
								value={credentials.password}
								onChange={(e) =>
									setCredentials({ ...credentials, password: e.target.value })
								}
							/>
						</div>

						{/* Error Message */}
						{error && <div id="Incorrect-credentials">{error}</div>}

						{/* Submit Button */}
						<button id="submit" type="submit">
							Login
						</button>

						{/* Sign Up Link */}
						<span className="spantext">Don't have an account? Create one.</span>
						<button id="lastbtn" type="button" onClick={toSignUp}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
			<Footer />
		</React.Fragment>
	);
};

export default Login;
