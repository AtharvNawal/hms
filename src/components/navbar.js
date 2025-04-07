import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginDetails from "../context/LoginContext";

const Navbar = () => {
    const { loggedIn, user } = useContext(LoginDetails);

    const navbarStyles = {
        navbar: {
            background: "linear-gradient(to right, #1cb5e0, #000046)",
            padding: "10px 20px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        },
        navLinks: {
            display: "flex",
            gap: "20px",
            listStyle: "none"
        },
        navLink: {
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
            transition: "all 0.3s ease",
            ":hover": {
                opacity: 0.8
            }
        },
        navHead: {
            cursor: "pointer",
            fontSize: "1.5rem",
            fontWeight: "bold"
        }
    };

    return (
        <div className="navbar" style={navbarStyles.navbar}>
            <div className="nav-container">
                <h1
                    onClick={() => {
                        window.location.href = "/";
                    }}
                    className="nav-head"
                    style={navbarStyles.navHead}
                >
                    ClinicEase
                </h1>
            </div>

            <ul className="nav-links" style={navbarStyles.navLinks}>
                {!loggedIn ? (
                    <>
                        <li>
                            <Link to="/" style={navbarStyles.navLink}>Home</Link>
                        </li>
                        <li>
                            <Link to="/login" style={navbarStyles.navLink}>Login</Link>
                        </li>
                        <li>
                            <Link to="/signup" style={navbarStyles.navLink}>Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/about-us" style={navbarStyles.navLink}>About Us</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/appointmentpage" style={navbarStyles.navLink}>
                                {user?.name || "Profile"}
                            </Link>
                        </li>
                        <li>
                            <Link to="/appointments" style={navbarStyles.navLink}>Book Appointment</Link>
                        </li>
                        <li>
                            <a
                                rel="noreferrer"
                                href="https://kivihealth.com/iam/atul.vijaykumar.vadgaonkar.28386"
                                target="_blank"
                                style={navbarStyles.navLink}
                            >
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