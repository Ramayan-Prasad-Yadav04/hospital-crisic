import React from 'react';
import { AlertTriangle, Flame, HeartPulse, ShieldAlert, Clock, MapPin } from 'lucide-react';
import './IncidentCard.css';

const getIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'fire': return <Flame className="icon fire-icon" />;
    case 'medical': return <HeartPulse className="icon medical-icon" />;
    case 'security': return <ShieldAlert className="icon security-icon" />;
    default: return <AlertTriangle className="icon default-icon" />;
  }
};

const getPriorityClass = (priority) => {
  return priority.toLowerCase() === 'high' ? 'priority-high' : 'priority-normal';
};

function IncidentCard({ incident, onUpdateStatus }) {
  const { id, type, location, description, status, priority, reportedAt } = incident;
  
  const timeStr = new Date(reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`glass-panel incident-card ${getPriorityClass(priority)}`}>
      <div className="card-header">
        <div className="card-title-group">
          <div className="icon-wrapper">
            {getIcon(type)}
          </div>
          <div>
            <h3 className="incident-type">{type} Emergency</h3>
            <div className="incident-meta">
              <span className="meta-item"><MapPin size={14}/> {location}</span>
              <span className="meta-item"><Clock size={14}/> {timeStr}</span>
            </div>
          </div>
        </div>
        <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>
      </div>
      
      <div className="card-body">
        <p className="incident-desc">{description}</p>
      </div>
      
      <div className="card-footer">
        {status === 'Active' ? (
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onUpdateStatus(id, 'Resolved')}
          >
            Mark Resolved
          </button>
        ) : (
          <span className="text-muted">Resolution Recorded</span>
        )}
      </div>
    </div>
  );
}

export default IncidentCard;
