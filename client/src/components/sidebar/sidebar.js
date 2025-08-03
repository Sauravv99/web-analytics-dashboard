import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleTheme } from '../../redux/slices/themeslice';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  // const dispatch = useDispatch();
  // const theme = useSelector((state) => state.theme.theme);
  // const handleThemeToggle = () => {
  //   dispatch(toggleTheme());
  // };

  return (
    <div>
      {/* Toggle Button */}
      {/* {!isOpen &&  */}
       <button className="btn btn-dark mt-3 mt-sm-2 sidebar-toggle d-lg-none" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>
      {/* } */}

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

         {/* <div className="text-center py-3">
          <button onClick={handleThemeToggle} className="btn btn-sm btn-outline-secondary">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div> */}

        <div className="text-center text-secondary small py-3">&copy; 2025 all rights reserved</div>
      </div>
    </div>
  );
}

export default SideBar;
