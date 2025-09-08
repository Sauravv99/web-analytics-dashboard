import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  

  return (
    <div>
       <button className="btn mt-3 mt-sm-2 sidebar-toggle d-lg-none" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'd-block' : 'd-none d-lg-block'}`}>
        <div className="sidebar-header d-flex align-items-center justify-content-between px-3 py-3">
          <span className="fs-5 fw-bold">My Dashboard</span>
          <button className="btn btn-sm btn-outline-light d-lg-none" onClick={toggleSidebar}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <ul className="nav flex-column px-2">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link" activeclassname="active">
              <i className="bi bi-house me-2"></i> Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/teams" className="nav-link " activeclassname="active">
              <i className="bi bi-person me-2"></i> Teams
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/settings" className="nav-link " activeclassname="active">
              <i className="bi bi-gear me-2"></i> Settings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/reports" className="nav-link " activeclassname="active">
              <i className="bi bi-bar-chart me-2"></i> Reports
            </NavLink>
          </li>
        </ul>
        <div className="text-center text-secondary small py-3">&copy; 2025 all rights reserved</div>
      </div>
    </div>
  );
}

export default SideBar;
