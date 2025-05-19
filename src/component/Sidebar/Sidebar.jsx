import React from 'react';
import { Link, useLocation } from 'react-router-dom'; import './Sidebar.css';

const Sidebar = ({ menuName, menuItems }) => {
  const location = useLocation();

  return (
    <div className="ad-sidebar">
      <h2>{menuName}</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            > <div className="ad-sidebar-component">
                <div className='ad-sidebar-icon'>{item.icon}</div>
                <div className="ad-sidebar-label">{item.label}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
