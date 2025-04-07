import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

const AboutUs = () => {
    return (
        <div style={{ minHeight: "100vh", width: "100%" }}>
            <Navbar />
            <div style={styles.container}>
                <header style={styles.header}>
                    {/* <h1 style={styles.title}>About Us</h1> */}
                    <p style={styles.subtitle}>Birth and Breathe - Your Trusted Healthcare Partner</p>
                </header>

                <section style={styles.section}>
                    <div style={styles.contentBox}>
                        <h2 style={styles.sectionTitle}>Our Mission</h2>
                        <p style={styles.sectionText}>
                            Birth and Breathe aim to revolutionize healthcare with seamless technology, 
                            improving patient outcomes and hospital administration through 
                            innovative solutions and compassionate care.
                        </p>
                    </div>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Meet Our Team</h2>
                    <div style={styles.teamGrid}>
                        {teamMembers.map((member, index) => (
                            <div key={index} style={styles.memberCard}>
                                <div style={styles.avatarPlaceholder}>
                                    {member.name.split(" ").map(name => name[0]).join("")}
                                </div>
                                <h3 style={styles.memberName}>{member.name}</h3>
                                <p style={styles.memberRole}>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        width: "100%",
        background: "#000046", /* fallback */
        background: "-webkit-linear-gradient(to right, #1cb5e0, #000046)",
        background: "linear-gradient(to right, #1cb5e0, #000046)",
        color: "white",
        padding: "20px 0 60px",
        minHeight: "calc(100vh - 160px)", // Adjusted for footer height
    },
    header: {
        padding: "40px 20px",
    },
    title: {
        fontSize: "3rem",
        marginBottom: "10px",
        fontWeight: "700",
        background: "linear-gradient(to right, #ffffff, #c9d6ff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    subtitle: {
        fontSize: "1.5rem",
        opacity: 0.9,
        marginTop: "0",
    },
    section: {
        maxWidth: "1200px",
        margin: "0 auto 60px",
        padding: "0 20px",
    },
    contentBox: {
        background: "rgba(0, 0, 70, 0.3)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        padding: "30px",
        margin: "0 auto",
        maxWidth: "800px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    sectionTitle: {
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#ffffff",
    },
    sectionText: {
        fontSize: "1.1rem",
        lineHeight: "1.6",
    },
    teamGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "30px",
        marginTop: "40px",
    },
    memberCard: {
        background: "rgba(0, 0, 70, 0.3)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "30px 20px",
        transition: "all 0.3s ease",
        cursor: "pointer",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
            opacity: 0.9
        },
    },
    avatarPlaceholder: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "linear-gradient(to right,rgb(31, 87, 160),rgb(31, 31, 97))",
        margin: "0 auto 15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "white",
    },
    memberName: {
        fontSize: "1.3rem",
        margin: "10px 0 5px",
        fontWeight: "500"
    },
    memberRole: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: "0.9rem",
    }
};

const teamMembers = [
    { name: "Atharv Mule", role: "Front-end Developer" },
    { name: "Atharv Nawal", role: "Full-stack Developer" },
    { name: "Shreyas Mulavekar", role: "Backend Developer" },
    { name: "Ritesh Nimbalkar", role: "Database Engineer" },
];

export default AboutUs;