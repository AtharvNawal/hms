import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const ClinicDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Simulate live patient data
  const generateLivePatients = () => {
    const basePatients = [
      { id: 'P-10042', name: 'Atharv Mule', age: 20, department: 'General Medicine', status: 'Active', lastVisit: '03/05/2024', nextAppointment: '04/05/2025' },
      { id: 'P-10078', name: 'Atharv Nawal', age: 32, department: 'Pediatrics', status: 'Active', lastVisit: '02/28/2025', nextAppointment: '03/28/2025' },
      { id: 'P-10103', name: 'Ritesh Nimbalkar', age: 62, department: 'General Medicine', status: 'Critical', lastVisit: '03/10/2025', nextAppointment: '03/17/2025' },
      { id: 'P-10115', name: 'Shreyas Mulavekar', age: 28, department: 'Dentistry', status: 'Active', lastVisit: '03/12/2025', nextAppointment: '06/12/2025' }
    ];
    
    return basePatients.map(patient => {
      const randomChange = Math.floor(Math.random() * 3) - 1;
      return {
        ...patient,
        age: patient.age + randomChange,
        status: randomChange === -1 ? 'Recovering' : 
               randomChange === 1 ? 'Critical' : patient.status
      };
    });
  };
  
  const [patients, setPatients] = useState(generateLivePatients());
  
  const doctor = {
    id: 'D-5042', 
    name: 'Dr. James', 
    specialization: 'General Practitioner',
    experience: '15 yrs',
    availability: 'Mon-Fri: 9AM-5PM',
    contact: '+91 9876543219',
    email: 'dr.james@clinicease.com',
    currentStatus: 'In Consultation'
  };

  // Simulate live appointment data
  const generateLiveAppointments = () => {
    const baseAppointments = [
      { id: 'A-2042', patient: 'Olivia Roberts', department: 'General Medicine', date: '03/12/2025', time: '10:30 AM', status: 'Confirmed', reason: 'Follow-up' },
      { id: 'A-2078', patient: 'Thomas Lee', department: 'Pediatrics', date: '03/12/2025', time: '11:45 AM', status: 'In Progress', reason: 'Vaccination' },
      { id: 'A-2103', patient: 'Emma Phillips', department: 'General Medicine', date: '03/12/2025', time: '2:15 PM', status: 'Confirmed', reason: 'Consultation' },
      { id: 'A-2115', patient: 'Daniel Clark', department: 'Dentistry', date: '03/13/2025', time: '9:00 AM', status: 'Rescheduled', reason: 'Cleaning' },
      { id: 'A-2126', patient: 'Sophia Adams', department: 'General Medicine', date: '03/13/2025', time: '3:30 PM', status: 'Waiting', reason: 'Check-up' },
    ];
    
    const now = new Date();
    return baseAppointments.map(apt => {
      const aptTime = new Date(`${apt.date} ${apt.time}`);
      const timeDiff = (aptTime - now) / (1000 * 60);
      
      let newStatus = apt.status;
      if (timeDiff < -60) newStatus = 'Completed';
      else if (timeDiff < 0) newStatus = 'In Progress';
      else if (timeDiff < 30 && apt.status === 'Confirmed') newStatus = 'Waiting';
      
      return {
        ...apt,
        status: newStatus
      };
    });
  };

  const [appointments, setAppointments] = useState(generateLiveAppointments());
  
  const [stats, setStats] = useState({
    totalPatients: 247,
    todayAppointments: { completed: 4, remaining: 4, total: 8 },
    todayRevenue: 1250,
    clinicStatus: 'Open'
  });

  const [patientVisitData, setPatientVisitData] = useState([
    { month: 'Jan', visits: 125, newPatients: 18 },
    { month: 'Feb', visits: 148, newPatients: 22 },
    { month: 'Mar', visits: 138, newPatients: 15 }
  ]);
  
  const [departmentDistributionData, setDepartmentDistributionData] = useState([
    { name: 'General Medicine', value: 68 },
    { name: 'Pediatrics', value: 21 },
    { name: 'Dentistry', value: 11 }
  ]);

  useEffect(() => {
    const dateTimer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    const dataTimer = setInterval(() => {
      setPatients(generateLivePatients());
      setAppointments(generateLiveAppointments());
      
      setStats(prev => ({
        ...prev,
        totalPatients: prev.totalPatients + Math.floor(Math.random() * 3) - 1,
        todayAppointments: {
          ...prev.todayAppointments,
          completed: Math.min(
            prev.todayAppointments.completed + (Math.random() > 0.7 ? 1 : 0),
            prev.todayAppointments.total
          )
        },
        todayRevenue: prev.todayRevenue + (Math.floor(Math.random() * 50) - 10)
      }));
      
      setPatientVisitData(prev => prev.map(item => ({
        ...item,
        visits: item.visits + (Math.floor(Math.random() * 5) - 2),
        newPatients: item.newPatients + (Math.random() > 0.8 ? 1 : 0)
      })));
      
      if (Math.random() > 0.9) {
        const newNotif = {
          id: Date.now(),
          type: ['appointment', 'patient', 'system'][Math.floor(Math.random() * 3)],
          message: [
            'New appointment scheduled for tomorrow',
            'Patient check-in completed',
            'System maintenance scheduled tonight',
            'New patient registered',
            'Prescription ready for review'
          ][Math.floor(Math.random() * 5)],
          time: 'Just now',
          read: false
        };
        setNotifications(prev => [newNotif, ...prev]);
        setUnreadNotifications(prev => prev + 1);
      }
    }, 30000);
    
    return () => {
      clearInterval(dateTimer);
      clearInterval(dataTimer);
    };
  }, []);

  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: 'appointment',
        message: 'Appointment with Sophia Adams starts in 15 minutes',
        time: '10 mins ago',
        read: false
      },
      {
        id: 2,
        type: 'patient',
        message: 'New patient registration: Michael Brown',
        time: '25 mins ago',
        read: false
      },
      {
        id: 3,
        type: 'system',
        message: 'System backup completed successfully',
        time: '1 hour ago',
        read: false
      }
    ]);
  }, []);

  const formatCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return currentDate.toLocaleDateString('en-US', options);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'active': 'status-success',
      'critical': 'status-danger',
      'recovering': 'status-warning',
      'confirmed': 'status-success',
      'in progress': 'status-primary',
      'rescheduled': 'status-warning',
      'waiting': 'status-info',
      'completed': 'status-gray'
    };
    
    return statusMap[status.toLowerCase()] || 'status-default';
  };

  const handleNotificationClick = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadNotifications(0);
  };

  const handleCheckIn = (appointmentId) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'In Progress' } : apt
      )
    );
    
    const appointment = appointments.find(apt => apt.id === appointmentId);
    const newNotif = {
      id: Date.now(),
      type: 'appointment',
      message: `Patient ${appointment.patient} checked in`,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    setUnreadNotifications(prev => prev + 1);
  };

  const handleCompleteAppointment = (appointmentId) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'Completed' } : apt
      )
    );
    
    setStats(prev => ({
      ...prev,
      todayAppointments: {
        ...prev.todayAppointments,
        completed: prev.todayAppointments.completed + 1
      },
      todayRevenue: prev.todayRevenue + 150 + Math.floor(Math.random() * 100)
    }));
  };

  const [showNotifications, setShowNotifications] = useState(false);

  const handleViewAllAppointments = () => {
    setActiveTab('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    alert('Logging out...');
    window.location.href = '/Home.js'; // Redirects to homepage
  };
  

  return (
    <div className="clinic-container">
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">C</div>
            {!sidebarCollapsed && <h1>ClinicEase</h1>}
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarCollapsed ? '≫' : '≪'}
          </button>
        </div>
        
        <div className="sidebar-menu">
          <div 
            className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="icon">📊</i> 
            {!sidebarCollapsed && <span>Dashboard</span>}
          </div>
          <div 
            className={`menu-item ${activeTab === 'patients' ? 'active' : ''}`}
            onClick={() => setActiveTab('patients')}
          >
            <i className="icon">🧑</i> 
            {!sidebarCollapsed && <span>Patients</span>}
          </div>
          <div 
            className={`menu-item ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            <i className="icon">📅</i> 
            {!sidebarCollapsed && <span>Appointments</span>}
          </div>
        </div>
      </div>
      
      <div className={`main-wrapper ${sidebarCollapsed ? 'expanded' : ''}`}>
        <header className="clinic-header">
          <div className="header-left">
            <div className="page-title">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </div>
          </div>
          
          <div className="header-right">
            <div className="search-container">
              <input type="text" placeholder="Search..." className="search-input" />
              <button className="search-btn">🔍</button>
            </div>
            
            <div 
              className="notification-bell" 
              onClick={() => {
                handleNotificationClick();
                setShowNotifications(!showNotifications);
              }}
            >
              <span className="notification-icon">🔔</span>
              {unreadNotifications > 0 && (
                <span className="notification-badge">{unreadNotifications}</span>
              )}
              
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h4>Notifications</h4>
                    <div className="notification-actions">
                      <button 
                        className="mark-all-read-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotificationClick();
                        }}
                      >
                        Mark all as read
                      </button>
                      <button 
                        className="clear-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotifications([]);
                          setUnreadNotifications(0);
                        }}
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                  <div className="notification-list">
                    {notifications.length > 0 ? (
                      notifications.map(notif => (
                        <div 
                          key={notif.id} 
                          className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                        >
                          <div className={`notification-type ${notif.type}`}>
                            {notif.type === 'appointment' ? '📅' : notif.type === 'patient' ? '🧑' : '⚙'}
                          </div>
                          <div className="notification-content">
                            <div className="notification-message">{notif.message}</div>
                            <div className="notification-time">{notif.time}</div>
                          </div>
                          <button 
                            className="notification-dismiss" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setNotifications(prev => 
                                prev.filter(n => n.id !== notif.id)
                              );
                              if (!notif.read) {
                                setUnreadNotifications(prev => prev - 1);
                              }
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="no-notifications">No new notifications</div>
                    )}
                  </div>
                  <div className="notification-footer">
                    <button 
                      className="view-all-notifications"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('View all notifications clicked');
                        setShowNotifications(false);
                      }}
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
              <div className="user-avatar">
                <span>R</span>
              </div>
              <div className="user-info">
                <span className="user-name">Receptionist</span>
                <span className="user-role">Clinic Staff</span>
              </div>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <div className="dropdown-avatar">
                      <span>R</span>
                    </div>
                    <div>
                      <div className="dropdown-name">Receptionist</div>
                      <div className="dropdown-email">receptionist@clinicease.com</div>
                    </div>
                  </div>
                  <div className="user-dropdown-menu">
                    <div className="dropdown-item">
                      <i className="dropdown-icon">👤</i>
                      <span>My Profile</span>
                    </div>
                    <div className="dropdown-item">
                      <i className="dropdown-icon">⚙</i>
                      <span>Account Settings</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item logout" onClick={handleLogout}>
                      <i className="dropdown-icon">🔒</i>
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <div className="content-wrapper">
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              <div className="welcome-banner">
                <div className="welcome-message">
                  <h2>Welcome to ClinicEase!</h2>
                  <p>Your one-stop solution for efficient clinic management.</p>
                </div>
                <div className="date-display">
                  <div className="current-date">{formatCurrentDate()}</div>
                  <div className="clinic-status">
                    Clinic Status: <span className={`status-${stats.clinicStatus.toLowerCase()}`}>
                      {stats.clinicStatus}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-icon patients-icon">🧑</div>
                  <div className="stat-content">
                    <h3>Total Patients</h3>
                    <div className="stat-value">{stats.totalPatients}</div>
                    <div className="stat-change positive">+2.1% from last month</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon visits-icon">🏥</div>
                  <div className="stat-content">
                    <h3>Today's Appointments</h3>
                    <div className="stat-value">
                      {stats.todayAppointments.completed} / {stats.todayAppointments.total}
                    </div>
                    <div className="stat-change normal">
                      {stats.todayAppointments.total - stats.todayAppointments.completed} slots available
                    </div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon revenue-icon">💰</div>
                  <div className="stat-content">
                    <h3>Today's Revenue</h3>
                    <div className="stat-value">${stats.todayRevenue.toLocaleString()}</div>
                    <div className="stat-change positive">+8.5% from yesterday</div>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-grid">
                <div className="dashboard-card doctor-info">
                  <div className="card-header">
                    <h3>Doctor Information</h3>
                    <div className={`doctor-status ${doctor.currentStatus.toLowerCase().replace(' ', '-')}`}>
                      {doctor.currentStatus}
                    </div>
                  </div>
                  <div className="doctor-profile">
                    <div className="doctor-avatar">
                      <span>Dr</span>
                    </div>
                    <div className="doctor-details">
                      <h4>{doctor.name}</h4>
                      <p className="doctor-specialization">{doctor.specialization}</p>
                      <p className="doctor-experience">{doctor.experience} Experience</p>
                      <div className="doctor-availability">
                        <span className="availability-label">Availability:</span>
                        <span className="availability-hours">{doctor.availability}</span>
                      </div>
                      <div className="doctor-contacts">
                        <div className="contact-item">
                          <span className="contact-icon">📞</span>
                          <span className="contact-value">{doctor.contact}</span>
                        </div>
                        <div className="contact-item">
                          <span className="contact-icon">✉️</span>
                          <span className="contact-value">{doctor.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="dashboard-card appointments-today">
                  <div className="card-header">
                    <h3>Today's Appointments</h3>
                    <button className="view-all-btn" onClick={handleViewAllAppointments}>View All</button>
                  </div>
                  <div className="appointment-list">
                    {appointments
                      .filter(apt => apt.date === '03/12/2025')
                      .slice(0, 3)
                      .map(appointment => (
                        <div key={appointment.id} className="appointment-item">
                          <div className="appointment-time">{appointment.time}</div>
                          <div className="appointment-info">
                            <div className="appointment-patient">{appointment.patient}</div>
                            <div className="appointment-department">{appointment.department} • {appointment.reason}</div>
                          </div>
                          <div className={`appointment-status ${getStatusClass(appointment.status)}`}>
                            {appointment.status}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="dashboard-card patient-chart">
                  <div className="card-header">
                    <h3>Visit Trends</h3>
                    <div className="chart-period-selector">
                      <button className="period-btn active">Month</button>
                      <button className="period-btn">Quarter</button>
                      <button className="period-btn">Year</button>
                    </div>
                  </div>
                  <div className="chart-container">
                    <div className="chart-placeholder">
                      <div className="chart-bars">
                        {patientVisitData.map((data, idx) => (
                          <div key={idx} className="chart-bar-group">
                            <div 
                              className="chart-bar visits" 
                              style={{ height: `${data.visits / 2}px` }}
                              title={`${data.month}: ${data.visits} Visits`}
                            ></div>
                            <div
                              className="chart-bar new-patients"
                              style={{ height: `${data.newPatients * 3}px` }}
                              title={`${data.month}: ${data.newPatients} New Patients`}
                            >
                            </div>
                            <div className="chart-label">{data.month}</div>
                          </div>
                        ))}
                      </div>
                      <div className="chart-legend">
                        <div className="legend-item">
                          <div className="legend-color visits"></div>
                          <div className="legend-label">Total Visits</div>
                        </div>
                        <div className="legend-item">
                          <div className="legend-color new-patients"></div>
                          <div className="legend-label">New Patients</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="dashboard-card department-distribution">
                  <div className="card-header">
                    <h3>Patient Distribution</h3>
                  </div>
                  <div className="distribution-chart">
                    {departmentDistributionData.map((dept, idx) => (
                      <div key={idx} className="distribution-item">
                        <div className="distribution-info">
                          <div className="department-name">{dept.name}</div>
                          <div className="distribution-value">{dept.value}%</div>
                        </div>
                        <div className="distribution-bar-container">
                          <div 
                            className="distribution-bar"
                            style={{ width: `${dept.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'patients' && (
            <div className="module-content">
              <div className="module-header">
                <h2>Patient Management</h2>
                <div className="action-buttons">
                  <button className="action-button secondary">Export</button>
                  <button className="action-button primary">+ Add Patient</button>
                </div>
              </div>
              
              <div className="filter-toolbar">
                <div className="filter-group">
                  <select className="filter-select">
                    <option>All Departments</option>
                    <option>General Medicine</option>
                    <option>Pediatrics</option>
                    <option>Dentistry</option>
                  </select>
                  
                  <select className="filter-select">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Critical</option>
                    <option>Recovering</option>
                  </select>
                </div>
                
                <div className="search-filter">
                  <input type="text" placeholder="Search patients..." className="search-input" />
                </div>
              </div>
              
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Patient ID</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Department</th>
                      <th>Last Visit</th>
                      <th>Next Appointment</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map(patient => (
                      <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td className="patient-name">{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.department}</td>
                        <td>{patient.lastVisit}</td>
                        <td>{patient.nextAppointment}</td>
                        <td>
                          <span className={`status-pill ${getStatusClass(patient.status)}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td>
                          <div className="row-actions">
                            <button className="icon-button view-btn" title="View Details">👁</button>
                            <button className="icon-button edit-btn" title="Edit">✏</button>
                            <button className="icon-button history-btn" title="Medical History">📋</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="pagination">
                <button className="pagination-btn">Previous</button>
                <div className="pagination-pages">
                  <button className="pagination-page active">1</button>
                  <button className="pagination-page">2</button>
                </div>
                <button className="pagination-btn">Next</button>
              </div>
            </div>
          )}
          
          {activeTab === 'appointments' && (
            <div className="module-content">
              <div className="module-header">
                <h2>Appointment Management</h2>
                <div className="action-buttons">
                  <button className="action-button secondary">Export</button>
                  <button className="action-button primary">+ New Appointment</button>
                </div>
              </div>
              
              <div className="filter-toolbar">
                <div className="filter-group">
                  <select className="filter-select">
                    <option>All Departments</option>
                    <option>General Medicine</option>
                    <option>Pediatrics</option>
                    <option>Dentistry</option>
                  </select>
                  
                  <select className="filter-select">
                    <option>All Status</option>
                    <option>Confirmed</option>
                    <option>Waiting</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Rescheduled</option>
                  </select>
                  
                  <input type="date" className="date-filter" />
                </div>
                
                <div className="search-filter">
                  <input type="text" placeholder="Search appointments..." className="search-input" />
                </div>
              </div>
              
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Appointment ID</th>
                      <th>Patient</th>
                      <th>Department</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td className="patient-name">{appointment.patient}</td>
                        <td>{appointment.department}</td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.reason}</td>
                        <td>
                          <span className={`status-pill ${getStatusClass(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          <div className="row-actions">
                            <button 
                              className="icon-button view-btn" 
                              title="View Details"
                              onClick={() => alert(`Viewing ${appointment.id}`)}
                            >
                              👁
                            </button>
                            {appointment.status === 'Waiting' && (
                              <button 
                                className="icon-button checkin-btn" 
                                title="Check In"
                                onClick={() => handleCheckIn(appointment.id)}
                              >
                                ✅
                              </button>
                            )}
                            {appointment.status === 'In Progress' && (
                              <button 
                                className="icon-button complete-btn" 
                                title="Complete"
                                onClick={() => handleCompleteAppointment(appointment.id)}
                              >
                                ✔
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="pagination">
                <button className="pagination-btn">Previous</button>
                <div className="pagination-pages">
                  <button className="pagination-page active">1</button>
                  <button className="pagination-page">2</button>
                </div>
                <button className="pagination-btn">Next</button>
              </div>
            </div>
          )}
        </div>
        
        <footer className="clinic-footer">
          <div className="footer-right">
            <span>©️ 2025 ClinicEase. All rights reserved.</span>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Help Center</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ClinicDashboard;