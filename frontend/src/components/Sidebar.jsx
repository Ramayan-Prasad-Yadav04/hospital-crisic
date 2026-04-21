import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, LayoutDashboard, PlusCircle, Settings, Users } from 'lucide-react';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <ShieldAlert className="logo-icon" size={32} color="#ef4444" />
        <h1 className="logo-text">Crisis<span>Connect</span></h1>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Command Center</span>
        </NavLink>
        
        <NavLink to="/report" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <PlusCircle size={20} />
          <span>Report Incident</span>
        </NavLink>
        
        <div className="nav-divider"></div>
        
        <a href="#" className="nav-item disabled">
          <Users size={20} />
          <span>Staff Directory</span>
        </a>
        
        <a href="#" className="nav-item disabled">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">SO</div>
          <div className="user-info">
            <span className="user-name">Security Officer</span>
            <span className="user-role">On Duty</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
