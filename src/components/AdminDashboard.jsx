// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const ClinicDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
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

  const [patientVisitData] = useState([
    { month: 'Jan', visits: 125, newPatients: 18 },
    { month: 'Feb', visits: 148, newPatients: 22 },
    { month: 'Mar', visits: 138, newPatients: 15 }
  ]);
  
  const [departmentDistributionData] = useState([
    { name: 'General Medicine', value: 68 },
    { name: 'Pediatrics', value: 21 },
    { name: 'Dentistry', value: 11 }
  ]);

  // Filter data based on search query
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAppointments = appointments.filter(appointment => 
    appointment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update data periodically
  useEffect(() => {
    const dateTimer = setInterval(() => setCurrentDate(new Date()), 60000);
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

  // Initialize notifications
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
      'active': 'status-active',
      'critical': 'status-critical',
      'recovering': 'status-recovering',
      'confirmed': 'status-confirmed',
      'in progress': 'status-in-progress',
      'rescheduled': 'status-rescheduled',
      'waiting': 'status-waiting',
      'completed': 'status-completed'
    };
    
    return statusMap[status.toLowerCase()] || 'status-default';
  };

  const handleNotificationClick = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
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
  };

  const handleLogout = () => {
    // In a real app, this would clear session/token
    window.location.href = '/login';
  };

  const Footer = () => {
    return (
      <footer>
        <div className={"footer"} id={"footer"}>
          <span className={"footer-left"}>
            &copy; 2025 HOSPITAL All Rights Reserved
          </span>
          <ul className={"footer-right"}>
            <li>
              <a
                href="https://twitter.com/who?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter">
                <i className={"fab fa-twitter foot-icon"}></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/WHO/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook">
                <i className={"fab fa-facebook-f foot-icon"}></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/who/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram">
                <i className={"fab fa-instagram foot-icon"}></i>
              </a>
            </li>
          </ul>
        </div>
        <div className={"footer-bottom"}>
          <span className={"footer-bottom-text"}>
            Designed by Group 3
          </span>
        </div>
      </footer>
    );
  };

  return (
    <div className={`clinic-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <i className="fas fa-clinic-medical"></i>
            </div>
            {!sidebarCollapsed && <h1>ClinicEase</h1>}
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <i className={`fas fa-chevron-${sidebarCollapsed ? 'right' : 'left'}`}></i>
          </button>
        </div>
        
        <nav className="sidebar-menu">
          <div 
            className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="fas fa-tachometer-alt"></i>
            {!sidebarCollapsed && <span>Dashboard</span>}
            {activeTab === 'dashboard' && <div className="active-indicator"></div>}
          </div>
          
          <div 
            className={`menu-item ${activeTab === 'patients' ? 'active' : ''}`}
            onClick={() => setActiveTab('patients')}
          >
            <i className="fas fa-user-injured"></i>
            {!sidebarCollapsed && <span>Patients</span>}
            {activeTab === 'patients' && <div className="active-indicator"></div>}
          </div>
          
          <div 
            className={`menu-item ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            <i className="fas fa-calendar-check"></i>
            {!sidebarCollapsed && <span>Appointments</span>}
            {activeTab === 'appointments' && <div className="active-indicator"></div>}
          </div>
          
          <div 
            className={`menu-item ${activeTab === 'departments' ? 'active' : ''}`}
            onClick={() => setActiveTab('departments')}
          >
            <i className="fas fa-hospital"></i>
            {!sidebarCollapsed && <span>Departments</span>}
            {activeTab === 'departments' && <div className="active-indicator"></div>}
          </div>
        </nav>
        
        <div className="sidebar-footer">
          {!sidebarCollapsed && (
            <div className="clinic-status">
              <div className={`status-indicator ${stats.clinicStatus.toLowerCase()}`}></div>
              <span>Clinic is {stats.clinicStatus}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="clinic-header">
          <div className="header-left">
            <h1 className="page-title">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
          </div>
          
          <div className="header-right">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search patients, appointments..." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn">
                <i className="fas fa-search"></i>
              </button>
            </div>
            
            <div className="header-actions">
              <div 
                className="notification-bell" 
                onClick={() => {
                  handleNotificationClick();
                  setShowNotifications(!showNotifications);
                }}
              >
                <i className="fas fa-bell"></i>
                {unreadNotifications > 0 && (
                  <span className="notification-badge">{unreadNotifications}</span>
                )}
                
                {showNotifications && (
                  <div className="notification-dropdown">
                    <div className="notification-header">
                      <h4>Notifications</h4>
                      <div className="notification-actions">
                        <button 
                          className="btn-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNotificationClick();
                          }}
                        >
                          Mark all as read
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
                              {notif.type === 'appointment' ? 
                                <i className="fas fa-calendar-alt"></i> : 
                                notif.type === 'patient' ? 
                                <i className="fas fa-user-injured"></i> : 
                                <i className="fas fa-cog"></i>}
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
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="no-notifications">
                          <i className="fas fa-bell-slash"></i>
                          <span>No new notifications</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
                <div className="user-avatar">
                  <span>R</span>
                </div>
                {!sidebarCollapsed && (
                  <div className="user-info">
                    <span className="user-name">Receptionist</span>
                    <span className="user-role">Clinic Staff</span>
                  </div>
                )}
                <i className={`fas fa-chevron-${showUserMenu ? 'up' : 'down'}`}></i>
                
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
                      <a href="#" className="dropdown-item">
                        <i className="fas fa-user"></i>
                        <span>My Profile</span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <i className="fas fa-cog"></i>
                        <span>Account Settings</span>
                      </a>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item logout" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <div className="content-area">
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              {/* Welcome Banner */}
              <div className="welcome-banner">
                <div className="welcome-message">
                  <h2>Welcome back, <span>Receptionist</span>!</h2>
                  <p>Here's what's happening with your clinic today.</p>
                </div>
                <div className="date-display">
                  <div className="current-date">
                    <i className="fas fa-calendar-day"></i>
                    <span>{formatCurrentDate()}</span>
                  </div>
                  <div className="clinic-status">
                    <span className={`status-badge ${stats.clinicStatus.toLowerCase()}`}>
                      <i className="fas fa-circle"></i>
                      {stats.clinicStatus}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon patients">
                    <i className="fas fa-user-injured"></i>
                  </div>
                  <div className="stat-content">
                    <h3>Total Patients</h3>
                    <div className="stat-value">{stats.totalPatients}</div>
                    <div className="stat-trend positive">
                      <i className="fas fa-arrow-up"></i>
                      <span>2.1% from last month</span>
                    </div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon appointments">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <div className="stat-content">
                    <h3>Today's Appointments</h3>
                    <div className="stat-value">
                      <span className="completed">{stats.todayAppointments.completed}</span>
                      <span className="divider">/</span>
                      <span className="total">{stats.todayAppointments.total}</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{ width: `${(stats.todayAppointments.completed / stats.todayAppointments.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon revenue">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="stat-content">
                    <h3>Today's Revenue</h3>
                    <div className="stat-value">${stats.todayRevenue.toLocaleString()}</div>
                    <div className="stat-trend positive">
                      <i className="fas fa-arrow-up"></i>
                      <span>8.5% from yesterday</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Grid */}
              <div className="dashboard-grid">
                {/* Today's Appointments */}
                <div className="dashboard-card appointments-today">
                  <div className="card-header">
                    <h3>
                      <i className="fas fa-calendar-day"></i>
                      Today's Appointments
                    </h3>
                    <button 
                      className="btn-link view-all" 
                      onClick={handleViewAllAppointments}
                    >
                      View All <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  <div className="appointment-list">
                    {filteredAppointments
                      .filter(apt => apt.date === '03/12/2025')
                      .slice(0, 3)
                      .map(appointment => (
                        <div key={appointment.id} className="appointment-item">
                          <div className="appointment-time">
                            <i className="far fa-clock"></i>
                            {appointment.time}
                          </div>
                          <div className="appointment-info">
                            <div className="appointment-patient">
                              {appointment.patient}
                            </div>
                            <div className="appointment-meta">
                              <span className="department">
                                <i className="fas fa-hospital"></i>
                                {appointment.department}
                              </span>
                              <span className="reason">
                                <i className="fas fa-stethoscope"></i>
                                {appointment.reason}
                              </span>
                            </div>
                          </div>
                          <div className={`appointment-status ${getStatusClass(appointment.status)}`}>
                            {appointment.status}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* Patient Visit Chart */}
                <div className="dashboard-card patient-chart">
                  <div className="card-header">
                    <h3>
                      <i className="fas fa-chart-line"></i>
                      Visit Trends
                    </h3>
                    <div className="chart-period-selector">
                      <button className="period-btn active">Month</button>
                      <button className="period-btn">Quarter</button>
                      <button className="period-btn">Year</button>
                    </div>
                  </div>
                  <div className="chart-container">
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
                          ></div>
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
                
                {/* Department Distribution */}
                <div className="dashboard-card department-distribution">
                  <div className="card-header">
                    <h3>
                      <i className="fas fa-procedures"></i>
                      Patient Distribution
                    </h3>
                  </div>
                  <div className="distribution-chart">
                    {departmentDistributionData.map((dept, idx) => (
                      <div key={idx} className="distribution-item">
                        <div className="distribution-info">
                          <div className="department-name">
                            {dept.name === 'General Medicine' ? 
                              <i className="fas fa-stethoscope"></i> :
                              dept.name === 'Pediatrics' ?
                              <i className="fas fa-baby"></i> :
                              <i className="fas fa-tooth"></i>}
                            {dept.name}
                          </div>
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
          
          {/* Patients Tab */}
          {activeTab === 'patients' && (
            <div className="module-content">
              <div className="module-header">
                <h2>
                  <i className="fas fa-user-injured"></i>
                  Patient Management
                </h2>
                <div className="action-buttons">
                  <button className="btn btn-secondary">
                    <i className="fas fa-file-export"></i> Export
                  </button>
                  <button className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add Patient
                  </button>
                </div>
              </div>
              
              <div className="filter-toolbar">
                <div className="filter-group">
                  <div className="filter-item">
                    <label>Department</label>
                    <select className="form-select">
                      <option>All Departments</option>
                      <option>General Medicine</option>
                      <option>Pediatrics</option>
                      <option>Dentistry</option>
                    </select>
                  </div>
                  
                  <div className="filter-item">
                    <label>Status</label>
                    <select className="form-select">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Critical</option>
                      <option>Recovering</option>
                    </select>
                  </div>
                </div>
                
                <div className="search-filter">
                  <div className="input-with-icon">
                    <i className="fas fa-search"></i>
                    <input 
                      type="text" 
                      placeholder="Search patients..." 
                      className="form-input" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="table-container">
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
                    {filteredPatients.map(patient => (
                      <tr key={patient.id}>
                        <td className="patient-id">{patient.id}</td>
                        <td className="patient-name">
                          <div className="avatar-small">
                            {patient.name.charAt(0)}
                          </div>
                          {patient.name}
                        </td>
                        <td>{patient.age}</td>
                        <td>
                          <span className="department-badge">
                            {patient.department === 'General Medicine' ? 
                              <i className="fas fa-stethoscope"></i> :
                              patient.department === 'Pediatrics' ?
                              <i className="fas fa-baby"></i> :
                              <i className="fas fa-tooth"></i>}
                            {patient.department}
                          </span>
                        </td>
                        <td>{patient.lastVisit}</td>
                        <td>{patient.nextAppointment}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(patient.status)}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button className="btn-icon view" title="View Details">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn-icon edit" title="Edit">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn-icon history" title="Medical History">
                              <i className="fas fa-file-medical"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="table-footer">
                <div className="table-info">
                  Showing 1 to {filteredPatients.length} of {stats.totalPatients} entries
                </div>
                <div className="pagination">
                  <button className="pagination-btn disabled">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="pagination-page active">1</button>
                  <button className="pagination-page">2</button>
                  <button className="pagination-btn">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="module-content">
              <div className="module-header">
                <h2>
                  <i className="fas fa-calendar-check"></i>
                  Appointment Management
                </h2>
                <div className="action-buttons">
                  <button className="btn btn-secondary">
                    <i className="fas fa-file-export"></i> Export
                  </button>
                  <button className="btn btn-primary">
                    <i className="fas fa-plus"></i> New Appointment
                  </button>
                </div>
              </div>
              
              <div className="filter-toolbar">
                <div className="filter-group">
                  <div className="filter-item">
                    <label>Department</label>
                    <select className="form-select">
                      <option>All Departments</option>
                      <option>General Medicine</option>
                      <option>Pediatrics</option>
                      <option>Dentistry</option>
                    </select>
                  </div>
                  
                  <div className="filter-item">
                    <label>Status</label>
                    <select className="form-select">
                      <option>All Status</option>
                      <option>Confirmed</option>
                      <option>Waiting</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Rescheduled</option>
                    </select>
                  </div>
                  
                  <div className="filter-item">
                    <label>Date</label>
                    <input type="date" className="form-input" />
                  </div>
                </div>
                
                <div className="search-filter">
                  <div className="input-with-icon">
                    <i className="fas fa-search"></i>
                    <input 
                      type="text" 
                      placeholder="Search appointments..." 
                      className="form-input" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="table-container">
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
                    {filteredAppointments.map(appointment => (
                      <tr key={appointment.id}>
                        <td>{appointment.id}</td>
                        <td className="patient-name">
                          <div className="avatar-small">
                            {appointment.patient.charAt(0)}
                          </div>
                          {appointment.patient}
                        </td>
                        <td>
                          <span className="department-badge">
                            {appointment.department === 'General Medicine' ? 
                              <i className="fas fa-stethoscope"></i> :
                              appointment.department === 'Pediatrics' ?
                              <i className="fas fa-baby"></i> :
                              <i className="fas fa-tooth"></i>}
                            {appointment.department}
                          </span>
                        </td>
                        <td>{appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td>{appointment.reason}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button 
                              className="btn-icon view" 
                              title="View Details"
                              onClick={() => alert(`Viewing ${appointment.id}`)}
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            {appointment.status === 'Waiting' && (
                              <button 
                                className="btn-icon checkin" 
                                title="Check In"
                                onClick={() => handleCheckIn(appointment.id)}
                              >
                                <i className="fas fa-check-circle"></i>
                              </button>
                            )}
                            {appointment.status === 'In Progress' && (
                              <button 
                                className="btn-icon complete" 
                                title="Complete"
                                onClick={() => handleCompleteAppointment(appointment.id)}
                              >
                                <i className="fas fa-check-double"></i>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="table-footer">
                <div className="table-info">
                  Showing 1 to {filteredAppointments.length} of {filteredAppointments.length} entries
                </div>
                <div className="pagination">
                  <button className="pagination-btn disabled">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="pagination-page active">1</button>
                  <button className="pagination-page">2</button>
                  <button className="pagination-btn">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Departments Tab */}
          {activeTab === 'departments' && (
            <div className="module-content">
              <div className="module-header">
                <h2>
                  <i className="fas fa-hospital"></i>
                  Department Management
                </h2>
                <div className="action-buttons">
                  <button className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add Department
                  </button>
                </div>
              </div>
              
              <div className="department-grid">
                {departmentDistributionData.map((dept, index) => (
                  <div key={index} className="department-card">
                    <div className="department-icon">
                      {dept.name === 'General Medicine' ? 
                        <i className="fas fa-stethoscope"></i> : 
                        dept.name === 'Pediatrics' ? 
                        <i className="fas fa-baby"></i> : 
                        <i className="fas fa-tooth"></i>}
                    </div>
                    <h3>{dept.name}</h3>
                    <div className="department-stats">
                      <div className="stat-item">
                        <div className="stat-value">12</div>
                        <div className="stat-label">Doctors</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">{dept.value}%</div>
                        <div className="stat-label">Patients</div>
                      </div>
                    </div>
                    <button className="btn btn-outline">
                      <i className="fas fa-info-circle"></i> View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ClinicDashboard;