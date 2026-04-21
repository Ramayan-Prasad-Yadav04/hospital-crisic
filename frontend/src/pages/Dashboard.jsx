import React, { useState, useEffect } from 'react';
import IncidentCard from '../components/IncidentCard';
import './Dashboard.css';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncidents = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/incidents');
      const data = await response.json();
      setIncidents(data.data || []);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
    // In a real app, we'd use WebSockets here for live updates.
    // For MVP, simple polling every 10 seconds.
    const interval = setInterval(fetchIncidents, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:3001/api/incidents/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchIncidents();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const activeCount = incidents.filter(i => i.status === 'Active').length;
  const resolvedCount = incidents.filter(i => i.status === 'Resolved').length;

  return (
    <div className="dashboard animate-fade-in">
      <header className="dashboard-header">
        <div>
          <h1 className="page-title">Command Center</h1>
          <p className="page-subtitle">Real-time crisis coordination and monitoring</p>
        </div>
      </header>

      <div className="metrics-grid">
        <div className="glass-panel metric-card">
          <div className="metric-icon-wrapper active-bg">
            <Activity className="metric-icon active-icon" />
          </div>
          <div className="metric-info">
            <h3>Active Crises</h3>
            <span className="metric-value">{activeCount}</span>
          </div>
        </div>
        
        <div className="glass-panel metric-card">
          <div className="metric-icon-wrapper resolved-bg">
            <ShieldCheck className="metric-icon resolved-icon" />
          </div>
          <div className="metric-info">
            <h3>Resolved Today</h3>
            <span className="metric-value">{resolvedCount}</span>
          </div>
        </div>
        
        <div className="glass-panel metric-card">
          <div className="metric-icon-wrapper total-bg">
            <AlertTriangle className="metric-icon total-icon" />
          </div>
          <div className="metric-info">
            <h3>System Status</h3>
            <span className="metric-value status-ok">Operational</span>
          </div>
        </div>
      </div>

      <div className="incidents-section">
        <h2>Active Incidents</h2>
        {loading ? (
          <p className="loading-text">Loading command center data...</p>
        ) : incidents.length === 0 ? (
          <div className="glass-panel empty-state">
            <ShieldCheck size={48} className="success-color mb-4" />
            <p>No active incidents reported. All clear.</p>
          </div>
        ) : (
          <div className="incidents-grid">
            {incidents.map(incident => (
              <IncidentCard 
                key={incident.id} 
                incident={incident} 
                onUpdateStatus={handleUpdateStatus} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
