import React, { useEffect } from "react";

const AboutUs = () => {
    useEffect(() => {
        // Slide-in effect for the whole page
        const page = document.querySelector(".page-slide");
        if (page) {
            page.style.opacity = "0";
            page.style.transform = "translateX(-100vw)"; // Start off-screen

            requestAnimationFrame(() => {
                page.style.transition = "opacity 1s ease-out, transform 1s ease-out";
                page.style.opacity = "1";
                page.style.transform = "translateX(0)"; // Slide in
            });
        }        
    }, []);

    return (
        <div className="page-slide" style={styles.container}>
            <header style={styles.header}>
                <h1>About Us</h1>
                <p>Your Trusted Healthcare Partner</p>
            </header>

            <section style={styles.mission}>
                <h2>Our Mission</h2>
                <div style={styles.missionBox}>
                    <p>We aim to revolutionize healthcare with seamless technology, improving patient outcomes and hospital administration.</p>
                </div>
            </section>

            <section style={styles.team}>
                <h2>Meet Our Team</h2>
                <div style={styles.teamContainer}>
                    {teamMembers.map((member, index) => (
                        <div key={index} style={styles.teamMember}>
                            <img src={member.image} alt={member.name} style={styles.teamImage} />
                            <h3>{member.name}</h3>
                            <p>{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer style={styles.footer}>
                <p>&copy; 2025 Medicore - Hospital Management System | All Rights Reserved</p>
            </footer>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        background: "linear-gradient(to right, #1cb5e0, #000046)",
        color: "white",
        paddingBottom: "20px",
        minHeight: "100vh",
        opacity: "0",
        transform: "translateX(-100vw)",
        transition: "opacity 1s ease-out, transform 1s ease-out",
    },
    header: {
        padding: "20px",
        background: "linear-gradient(to right, #1cb5e0, #000046)",
        //borderBottom: "2px solid white"
    },
    mission: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        //background: "linear-gradient(to right, #1cb5e0, #000046)"
    },
    missionBox: {
        //background: "rgba(255, 255, 255, 0.15)",
        padding: "20px",
        borderRadius: "10px",
        fontSize: "1.2em"
    },
    team: {
        marginTop: "30px",
        background: "linear-gradient(to right, #1cb5e0, #000046)"
    },
    teamContainer: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "40px",
        marginTop: "30px"
    },
    teamMember: {
        background: "rgba(255, 255, 255, 0.15)",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
        width: "250px",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
        cursor: "pointer"
    },
    
    teamImage: {
            width: "30px",   // Set width as needed
            height: "30px",  // Set height as needed
            objectFit: "cover", // Prevent distortion, keep aspect ratio
            borderRadius: "50%", // Optional: Make it circular
        },
    footer: {
        marginTop: "40px",
        padding: "15px",
        background: "linear-gradient(to right, #1cb5e0, #000046)",
        fontSize: "1em"
    }
};

const teamMembers = [
    { name: "Atharv Mule", role: "Front-end Developer"},
    { name: "Atharv Nawal", role: "Full-stack Developer"},
    { name: "Shreyas Mulavekar", role: "Backend Developer"},
    { name: "Ritesh Nimbalkar", role: "Database Engineer" }
];

export default AboutUs;

// import React, { useState } from 'react';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
//   const [patients, setPatients] = useState([
//     { id: 'P-10042', name: 'John Smith', age: 45, doctor: 'Dr. Wilson', department: 'Cardiology', status: 'Admitted', room: '304A', admitDate: '03/05/2025' },
//     { id: 'P-10078', name: 'Sarah Johnson', age: 32, doctor: 'Dr. Martinez', department: 'Neurology', status: 'Discharged', room: '—', admitDate: '02/28/2025' },
//     { id: 'P-10103', name: 'Robert Brown', age: 62, doctor: 'Dr. Chen', department: 'Oncology', status: 'Critical', room: '201B', admitDate: '03/10/2025' },
//     { id: 'P-10115', name: 'Emily Davis', age: 28, doctor: 'Dr. Patel', department: 'Orthopedics', status: 'Outpatient', room: '—', admitDate: '03/12/2025' },
//     { id: 'P-10126', name: 'Michael Wilson', age: 51, doctor: 'Dr. Garcia', department: 'Pulmonology', status: 'Stable', room: '405C', admitDate: '03/07/2025' },
//   ]);
  
//   const [doctors, setDoctors] = useState([
//     { id: 'D-5042', name: 'Dr. James Wilson', department: 'Cardiology', patients: 12, status: 'Available', specialization: 'Interventional Cardiology', experience: '15 yrs' },
//     { id: 'D-5078', name: 'Dr. Maria Martinez', department: 'Neurology', patients: 8, status: 'In Surgery', specialization: 'Neurological Surgery', experience: '12 yrs' },
//     { id: 'D-5103', name: 'Dr. Lin Chen', department: 'Oncology', patients: 15, status: 'Available', specialization: 'Medical Oncology', experience: '18 yrs' },
//     { id: 'D-5115', name: 'Dr. Raj Patel', department: 'Orthopedics', patients: 10, status: 'On Rounds', specialization: 'Sports Medicine', experience: '10 yrs' },
//     { id: 'D-5126', name: 'Dr. Sofia Garcia', department: 'Pulmonology', patients: 7, status: 'On Leave', specialization: 'Respiratory Care', experience: '14 yrs' },
//   ]);

//   const [appointments, setAppointments] = useState([
//     { id: 'A-2042', patient: 'Olivia Roberts', doctor: 'Dr. Wilson', department: 'Cardiology', date: '03/12/2025', time: '10:30 AM', status: 'Confirmed' },
//     { id: 'A-2078', patient: 'Thomas Lee', doctor: 'Dr. Martinez', department: 'Neurology', date: '03/12/2025', time: '11:45 AM', status: 'In Progress' },
//     { id: 'A-2103', patient: 'Emma Phillips', doctor: 'Dr. Chen', department: 'Oncology', date: '03/12/2025', time: '2:15 PM', status: 'Confirmed' },
//     { id: 'A-2115', patient: 'Daniel Clark', doctor: 'Dr. Patel', department: 'Orthopedics', date: '03/13/2025', time: '9:00 AM', status: 'Rescheduled' },
//     { id: 'A-2126', patient: 'Sophia Adams', doctor: 'Dr. Garcia', department: 'Pulmonology', date: '03/13/2025', time: '3:30 PM', status: 'Waiting' },
//   ]);

//   // Mock data for charts
//   const patientAdmissionData = [
//     { month: 'Jan', admitted: 125, discharged: 110 },
//     { month: 'Feb', admitted: 148, discharged: 135 },
//     { month: 'Mar', admitted: 138, discharged: 127 }
//   ];
  
//   const departmentOccupancyData = [
//     { name: 'Cardiology', value: 85 },
//     { name: 'Neurology', value: 72 },
//     { name: 'Oncology', value: 91 },
//     { name: 'Orthopedics', value: 68 },
//     { name: 'Pulmonology', value: 77 }
//   ];

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   const getStatusClass = (status) => {
//     const statusMap = {
//       'admitted': 'status-primary',
//       'discharged': 'status-success',
//       'outpatient': 'status-warning',
//       'critical': 'status-danger',
//       'stable': 'status-info',
//       'available': 'status-success',
//       'in surgery': 'status-danger',
//       'on rounds': 'status-warning',
//       'on leave': 'status-gray',
//       'confirmed': 'status-success',
//       'in progress': 'status-primary',
//       'rescheduled': 'status-warning',
//       'waiting': 'status-info'
//     };
    
//     return statusMap[status.toLowerCase()] || 'status-default';
//   };

//   return (
//     <div className="admin-container">
//       <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
//         <div className="sidebar-header">
//           <div className="logo">
//             <div className="logo-icon">H</div>
//             {!sidebarCollapsed && <h1>ClinicEase</h1>}
//           </div>
//           <button className="sidebar-toggle" onClick={toggleSidebar}>
//             {sidebarCollapsed ? '≫' : '≪'}
//           </button>
//         </div>
        
//         <div className="sidebar-menu">
//           <div 
//             className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
//             onClick={() => setActiveTab('dashboard')}
//           >
//             <i className="icon">📊</i> 
//             {!sidebarCollapsed && <span>Dashboard</span>}
//           </div>
//           <div 
//             className={`menu-item ${activeTab === 'patients' ? 'active' : ''}`}
//             onClick={() => setActiveTab('patients')}
//           >
//             <i className="icon">🧑</i> 
//             {!sidebarCollapsed && <span>Patients</span>}
//           </div>
//           <div 
//             className={`menu-item ${activeTab === 'doctors' ? 'active' : ''}`}
//             onClick={() => setActiveTab('doctors')}
//           >
//             <i className="icon">👨‍⚕️</i> 
//             {!sidebarCollapsed && <span>Doctors</span>}
//           </div>
//           <div 
//             className={`menu-item ${activeTab === 'appointments' ? 'active' : ''}`}
//             onClick={() => setActiveTab('appointments')}
//           >
//             <i className="icon">📅</i> 
//             {!sidebarCollapsed && <span>Appointments</span>}
//           </div>
//           <div 
//             className={`menu-item ${activeTab === 'departments' ? 'active' : ''}`}
//             onClick={() => setActiveTab('departments')}
//           >
//             <i className="icon">🏥</i> 
//             {!sidebarCollapsed && <span>Departments</span>}
//           </div>
//           <div 
//             className={`menu-item ${activeTab === 'pharmacy' ? 'active' : ''}`}
//             onClick={() => setActiveTab('pharmacy')}
//           >
//             <i className="icon">💊</i> 
//             {!sidebarCollapsed && <span>Pharmacy</span>}
//           </div>
//           <div 
//             className={`menu-item ${activeTab === 'billing' ? 'active' : ''}`}
//             onClick={() => setActiveTab('billing')}
//           >
//             <i className="icon">💲</i> 
//             {!sidebarCollapsed && <span>Billing</span>}
//           </div>
//           <div 
//             className={`menu-item ${activeTab === 'reports' ? 'active' : ''}`}
//             onClick={() => setActiveTab('reports')}
//           >
//             <i className="icon">📝</i> 
//             {!sidebarCollapsed && <span>Reports</span>}
//           </div>
//           <div 
//             className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
//             onClick={() => setActiveTab('settings')}
//           >
//             <i className="icon">⚙️</i> 
//             {!sidebarCollapsed && <span>Settings</span>}
//           </div>
//         </div>
        
//         <div className="sidebar-footer">
//           <div className="menu-item">
//             <i className="icon">🔒</i> 
//             {!sidebarCollapsed && <span>Logout</span>}
//           </div>
//         </div>
//       </div>
      
//       <div className={`main-wrapper ${sidebarCollapsed ? 'expanded' : ''}`}>
//         <header className="admin-header">
//           <div className="header-left">
//             <div className="page-title">
//               {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//             </div>
//           </div>
          
//           <div className="header-right">
//             <div className="search-container">
//               <input type="text" placeholder="Search..." className="search-input" />
//               <button className="search-btn">🔍</button>
//             </div>
            
//             <div className="notification-bell">
//               <span className="notification-icon">🔔</span>
//               <span className="notification-badge">3</span>
//             </div>
            
//             <div className="user-profile">
//               <div className="user-avatar">
//                 <span>A</span>
//               </div>
//               <div className="user-info">
//                 <span className="user-name">Admin User</span>
//                 <span className="user-role">System Administrator</span>
//               </div>
//             </div>
//           </div>
//         </header>
        
//         <div className="content-wrapper">
//           {activeTab === 'dashboard' && (
//             <div className="dashboard-content">
//               <div className="welcome-banner">
//                 <div className="welcome-message">
//                   <h2>Welcome back, Admin!</h2>
//                   <p>Here's what's happening at ClinicEase today.</p>
//                 </div>
//                 <div className="date-display">
//                   <div className="current-date">Wednesday, March 12, 2025</div>
//                   <div className="hospital-status">Hospital Status: <span className="status-operational">Operational</span></div>
//                 </div>
//               </div>
              
//               <div className="stats-row">
//                 <div className="stat-card">
//                   <div className="stat-icon patients-icon">🏥</div>
//                   <div className="stat-content">
//                     <h3>Total Patients</h3>
//                     <div className="stat-value">1,245</div>
//                     <div className="stat-change positive">+3.2% from last week</div>
//                   </div>
//                 </div>
                
//                 <div className="stat-card">
//                   <div className="stat-icon doctors-icon">👨‍⚕️</div>
//                   <div className="stat-content">
//                     <h3>Available Doctors</h3>
//                     <div className="stat-value">42 / 58</div>
//                     <div className="stat-change neutral">72% availability</div>
//                   </div>
//                 </div>
                
//                 <div className="stat-card">
//                   <div className="stat-icon beds-icon">🛏️</div>
//                   <div className="stat-content">
//                     <h3>Bed Occupancy</h3>
//                     <div className="stat-value">182 / 250</div>
//                     <div className="stat-change warning">73% occupied</div>
//                   </div>
//                 </div>
                
//                 <div className="stat-card">
//                   <div className="stat-icon revenue-icon">💰</div>
//                   <div className="stat-content">
//                     <h3>Today's Revenue</h3>
//                     <div className="stat-value">$28,650</div>
//                     <div className="stat-change positive">+12.8% from yesterday</div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="dashboard-grid">
//                 <div className="dashboard-card appointments-today">
//                   <div className="card-header">
//                     <h3>Today's Appointments</h3>
//                     <button className="view-all-btn">View All</button>
//                   </div>
//                   <div className="appointment-list">
//                     {appointments.filter((apt, idx) => idx < 3).map(appointment => (
//                       <div key={appointment.id} className="appointment-item">
//                         <div className="appointment-time">{appointment.time}</div>
//                         <div className="appointment-info">
//                           <div className="appointment-patient">{appointment.patient}</div>
//                           <div className="appointment-doctor">{appointment.doctor} • {appointment.department}</div>
//                         </div>
//                         <div className={`appointment-status ${getStatusClass(appointment.status)}`}>
//                           {appointment.status}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div className="dashboard-card recent-patients">
//                   <div className="card-header">
//                     <h3>Recent Patients</h3>
//                     <button className="view-all-btn">View All</button>
//                   </div>
//                   <div className="table-container">
//                     <table className="data-table compact">
//                       <thead>
//                         <tr>
//                           <th>ID</th>
//                           <th>Name</th>
//                           <th>Department</th>
//                           <th>Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {patients.filter((patient, idx) => idx < 4).map(patient => (
//                           <tr key={patient.id}>
//                             <td>{patient.id}</td>
//                             <td>{patient.name}</td>
//                             <td>{patient.department}</td>
//                             <td>
//                               <span className={`status-pill ${getStatusClass(patient.status)}`}>
//                                 {patient.status}
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
                
//                 <div className="dashboard-card patient-chart">
//                   <div className="card-header">
//                     <h3>Admission Trends</h3>
//                     <div className="chart-period-selector">
//                       <button className="period-btn active">Week</button>
//                       <button className="period-btn">Month</button>
//                       <button className="period-btn">Quarter</button>
//                     </div>
//                   </div>
//                   <div className="chart-container">
//                     <div className="chart-placeholder">
//                       <div className="chart-bars">
//                         {patientAdmissionData.map((data, idx) => (
//                           <div key={idx} className="chart-bar-group">
//                             <div 
//                               className="chart-bar admitted" 
//                               style={{ height: `${data.admitted / 2}px` }}
//                               title={`${data.month}: ${data.admitted} Admitted`}
//                             ></div>
//                             <div 
//                               className="chart-bar discharged"
//                               style={{ height: `${data.discharged / 2}px` }}
//                               title={`${data.month}: ${data.discharged} Discharged`}
//                             ></div>
//                             <div className="chart-label">{data.month}</div>
//                           </div>
//                         ))}
//                       </div>
//                       <div className="chart-legend">
//                         <div className="legend-item">
//                           <div className="legend-color admitted"></div>
//                           <div className="legend-label">Admitted</div>
//                         </div>
//                         <div className="legend-item">
//                           <div className="legend-color discharged"></div>
//                           <div className="legend-label">Discharged</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="dashboard-card department-occupancy">
//                   <div className="card-header">
//                     <h3>Department Occupancy</h3>
//                   </div>
//                   <div className="occupancy-chart">
//                     {departmentOccupancyData.map((dept, idx) => (
//                       <div key={idx} className="occupancy-item">
//                         <div className="occupancy-info">
//                           <div className="department-name">{dept.name}</div>
//                           <div className="occupancy-value">{dept.value}%</div>
//                         </div>
//                         <div className="occupancy-bar-container">
//                           <div 
//                             className={`occupancy-bar ${dept.value > 90 ? 'critical' : dept.value > 75 ? 'warning' : 'normal'}`}
//                             style={{ width: `${dept.value}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {activeTab === 'patients' && (
//             <div className="module-content">
//               <div className="module-header">
//                 <h2>Patient Management</h2>
//                 <div className="action-buttons">
//                   <button className="action-button secondary">Export</button>
//                   <button className="action-button primary">+ Add Patient</button>
//                 </div>
//               </div>
              
//               <div className="filter-toolbar">
//                 <div className="filter-group">
//                   <select className="filter-select">
//                     <option>All Departments</option>
//                     <option>Cardiology</option>
//                     <option>Neurology</option>
//                     <option>Oncology</option>
//                     <option>Orthopedics</option>
//                     <option>Pulmonology</option>
//                   </select>
                  
//                   <select className="filter-select">
//                     <option>All Status</option>
//                     <option>Admitted</option>
//                     <option>Discharged</option>
//                     <option>Outpatient</option>
//                     <option>Critical</option>
//                     <option>Stable</option>
//                   </select>
                  
//                   <input type="date" className="filter-date" />
//                 </div>
                
//                 <div className="search-filter">
//                   <input type="text" placeholder="Search patients..." className="search-input" />
//                 </div>
//               </div>
              
//               <div className="table-responsive">
//                 <table className="data-table">
//                   <thead>
//                     <tr>
//                       <th>Patient ID</th>
//                       <th>Name</th>
//                       <th>Age</th>
//                       <th>Doctor</th>
//                       <th>Department</th>
//                       <th>Room</th>
//                       <th>Admit Date</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {patients.map(patient => (
//                       <tr key={patient.id}>
//                         <td>{patient.id}</td>
//                         <td className="patient-name">{patient.name}</td>
//                         <td>{patient.age}</td>
//                         <td>{patient.doctor}</td>
//                         <td>{patient.department}</td>
//                         <td>{patient.room}</td>
//                         <td>{patient.admitDate}</td>
//                         <td>
//                           <span className={`status-pill ${getStatusClass(patient.status)}`}>
//                             {patient.status}
//                           </span>
//                         </td>
//                         <td>
//                           <div className="row-actions">
//                             <button className="icon-button view-btn" title="View Details">👁️</button>
//                             <button className="icon-button edit-btn" title="Edit">✏️</button>
//                             <button className="icon-button delete-btn" title="Delete">🗑️</button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               <div className="pagination">
//                 <button className="pagination-btn">Previous</button>
//                 <div className="pagination-pages">
//                   <button className="pagination-page active">1</button>
//                   <button className="pagination-page">2</button>
//                   <button className="pagination-page">3</button>
//                   <span className="pagination-ellipsis">...</span>
//                   <button className="pagination-page">8</button>
//                 </div>
//                 <button className="pagination-btn">Next</button>
//               </div>
//             </div>
//           )}
          
//           {activeTab === 'doctors' && (
//             <div className="module-content">
//               <div className="module-header">
//                 <h2>Doctor Management</h2>
//                 <div className="action-buttons">
//                   <button className="action-button secondary">Export</button>
//                   <button className="action-button primary">+ Add Doctor</button>
//                 </div>
//               </div>
              
//               <div className="filter-toolbar">
//                 <div className="filter-group">
//                   <select className="filter-select">
//                     <option>All Departments</option>
//                     <option>Cardiology</option>
//                     <option>Neurology</option>
//                     <option>Oncology</option>
//                     <option>Orthopedics</option>
//                     <option>Pulmonology</option>
//                   </select>
                  
//                   <select className="filter-select">
//                     <option>All Status</option>
//                     <option>Available</option>
//                     <option>In Surgery</option>
//                     <option>On Rounds</option>
//                     <option>On Leave</option>
//                   </select>
//                 </div>
                
//                 <div className="search-filter">
//                   <input type="text" placeholder="Search doctors..." className="search-input" />
//                 </div>
//               </div>
              
//               <div className="table-responsive">
//                 <table className="data-table">
//                   <thead>
//                     <tr>
//                       <th>Doctor ID</th>
//                       <th>Name</th>
//                       <th>Department</th>
//                       <th>Specialization</th>
//                       <th>Experience</th>
//                       <th>Patients</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {doctors.map(doctor => (
//                       <tr key={doctor.id}>
//                         <td>{doctor.id}</td>
//                         <td className="doctor-name">{doctor.name}</td>
//                         <td>{doctor.department}</td>
//                         <td>{doctor.specialization}</td>
//                         <td>{doctor.experience}</td>
//                         <td>{doctor.patients}</td>
//                         <td>
//                           <span className={`status-pill ${getStatusClass(doctor.status)}`}>
//                             {doctor.status}
//                           </span>
//                         </td>
//                         <td>
//                           <div className="row-actions">
//                             <button className="icon-button view-btn" title="View Details">👁️</button>
//                             <button className="icon-button edit-btn" title="Edit">✏️</button>
//                             <button className="icon-button schedule-btn" title="Schedule">📅</button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               <div className="pagination">
//                 <button className="pagination-btn">Previous</button>
//                 <div className="pagination-pages">
//                   <button className="pagination-page active">1</button>
//                   <button className="pagination-page">2</button>
//                   <button className="pagination-page">3</button>
//                 </div>
//                 <button className="pagination-btn">Next</button>
//               </div>
//             </div>
//           )}
          
//           {activeTab === 'appointments' && (
//             <div className="module-content">
//               <div className="module-header">
//                 <h2>Appointment Management</h2>
//                 <div className="action-buttons">
//                   <button className="action-button secondary">Export</button>
//                   <button className="action-button primary">+ Schedule Appointment</button>
//                 </div>
//               </div>
              
//               <div className="filter-toolbar">
//                 <div className="filter-group">
//                   <select className="filter-select">
//                     <option>All Departments</option>
//                     <option>Cardiology</option>
//                     <option>Neurology</option>
//                     <option>Oncology</option>
//                     <option>Orthopedics</option>
//                     <option>Pulmonology</option>
//                   </select>
                  
//                   <select className="filter-select">
//                     <option>All Status</option>
//                     <option>Confirmed</option>
//                     <option>In Progress</option>
//                     <option>Completed</option>
//                     <option>Rescheduled</option>
//                     <option>Waiting</option>
//                   </select>
                  
//                   <input type="date" className="filter-date" value="2025-03-12" />
//                 </div>
                
//                 <div className="search-filter">
//                   <input type="text" placeholder="Search appointments..." className="search-input" />
//                 </div>
//               </div>
              
//               <div className="table-responsive">
//                 <table className="data-table">
//                   <thead>
//                     <tr>
//                       <th>Appt ID</th>
//                       <th>Patient</th>
//                       <th>Doctor</th>
//                       <th>Department</th>
//                       <th>Date</th>
//                       <th>Time</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {appointments.map(appointment => (
//                       <tr key={appointment.id}>
//                         <td>{appointment.id}</td>
//                         <td>{appointment.patient}</td>
//                         <td>{appointment.doctor}</td>
//                         <td>{appointment.department}</td>
//                         <td>{appointment.date}</td>
//                         <td>{appointment.time}</td>
//                         <td>
//                           <span className={`status-pill ${getStatusClass(appointment.status)}`}>
//                             {appointment.status}
//                           </span>
//                         </td>
//                         <td>
//                           <div className="row-actions">
//                             <button className="icon-button edit-btn" title="Edit">✏️</button>
//                             <button className="icon-button reschedule-btn" title="Reschedule">📆</button>
//                             <button className="icon-button cancel-btn" title="Cancel">✖️</button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               <div className="pagination">
//                 <button className="pagination-btn">Previous</button>
//                 <div className="pagination-pages">
//                   <button className="pagination-page active">1</button>
//                   <button className="pagination-page">2</button>
//                 </div>
//                 <button className="pagination-btn">Next</button>
//               </div>
//             </div>
//           )}
          
//           {activeTab !== 'dashboard' && activeTab !== 'patients' && activeTab !== 'doctors' && activeTab !== 'appointments' && (
//             <div className="module-content">
//               <div className="module-header">
//                 <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
//               </div>
//               <div className="coming-soon">
//                 <div className="coming-soon-icon">🚧</div>
//                 <h3>Module Under Development</h3>
//                 <p>This functionality will be available in the next update.</p>
//                 <button className="action-button secondary">Return to Dashboard</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;