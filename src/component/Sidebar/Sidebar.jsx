import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ menuName, menuItems }) => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2>{menuName}</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.icon && <span className="icon">{item.icon}</span>}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
