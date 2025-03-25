import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginDetails from "../context/LoginContext";

const Navbar = () => {
	const { loggedIn, user } = useContext(LoginDetails);

	return (
		<div className="navbar">
			<div className="nav-container">
				<h1
					onClick={() => {
						window.location.href = "/";
					}}
					className="nav-head">
					ClinicEase
				</h1>
			</div>

			<ul className="nav-links">
				{!loggedIn ? (
					<>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Sign Up</Link>
						</li>
						<li>
							<Link to="/about-us">About Us</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/appointmentpage">{user?.name || "Profile"}</Link>
						</li>
						<li>
							<Link to="/appointments">Book Appointment</Link>
						</li>
						<li>
							<a
								rel="noreferrer"
								href="https://kivihealth.com/iam/atul.vijaykumar.vadgaonkar.28386"
								target="_blank">
								About Us
							</a>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default Navbar;
