// import React from "react";
// import { Link } from "react-router-dom"; // Import Link for navigation
// import Navbar from "./navbar";

// const Header = () => {
// 	return (
// 		<header className={"header"}>
// 			<Navbar />
// 			<div className={"welcome-container"}>
// 				<h1 className={"welcome-head"}>The Efficient HealthCare Solution</h1>
// 				<div className={"button-container"} style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
// 					{/* { <Link to="/about-us">
// 						<button className={"about-us"}>About-Us</button>
// 					</Link> } */}

// 					<Link to="/login">
// 						<button className={"about-us"}>Patient Login</button>
// 					</Link>
// 					{/* <Link to="/login">
// 						<button className={"about-us"}>Doctor Login</button>
// 					</Link> */}
// 					<Link to="/login">
// 						<button className={"about-us"}>Admin Login</button>
// 					</Link>
// 				</div>
// 			</div>
// 		</header>
// 	);
// };

// export default Header;

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const Header = () => {
	return (
		<header className="header">
			<Navbar />
			<div className="welcome-container">
				<h1 className="welcome-head">The Efficient HealthCare Solution</h1>
				<div className="button-container" style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
					{/* <Link to="/login?role=patient">
						<button className="about-us">Patient Login</button>
					</Link> */}
					<Link to="/login?role=admin">
						<button className="about-us">Login</button>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
