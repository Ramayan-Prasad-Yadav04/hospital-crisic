import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Send } from 'lucide-react';
import './ReportIncident.css';

function ReportIncident() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'Medical',
    location: '',
    description: '',
    priority: 'High'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to submit incident');
      }
    } catch (error) {
      console.error('Error submitting incident:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="report-container animate-fade-in">
      <header className="report-header">
        <h1 className="page-title">Report New Incident</h1>
        <p className="page-subtitle">Instantly alert the command center to a new crisis.</p>
      </header>

      <div className="glass-panel form-panel">
        <div className="form-warning">
          <AlertTriangle color="var(--warning)" size={24} />
          <p>Submitting this form will immediately notify the active security officer and may trigger automated protocols.</p>
        </div>

        <form onSubmit={handleSubmit} className="incident-form">
          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="type" className="form-label">Incident Type</label>
              <select 
                id="type" 
                name="type" 
                className="form-input custom-select" 
                value={formData.type} 
                onChange={handleChange}
                required
              >
                <option value="Medical">Medical Emergency</option>
                <option value="Fire">Fire / Smoke</option>
                <option value="Security">Security Breach / Violence</option>
                <option value="Natural Disaster">Natural Disaster</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group flex-1">
              <label htmlFor="priority" className="form-label">Priority Level</label>
              <select 
                id="priority" 
                name="priority" 
                className="form-input custom-select" 
                value={formData.priority} 
                onChange={handleChange}
                required
              >
                <option value="Critical">Critical (Immediate Life Threat)</option>
                <option value="High">High (Urgent Response Needed)</option>
                <option value="Medium">Medium (Situation Contained)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">Exact Location</label>
            <input 
              type="text" 
              id="location" 
              name="location" 
              className="form-input" 
              placeholder="e.g., Lobby, Room 402, North Pool" 
              value={formData.location} 
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description of Situation</label>
            <textarea 
              id="description" 
              name="description" 
              className="form-input textarea" 
              rows="5"
              placeholder="Provide clear, concise details about what is happening..." 
              value={formData.description} 
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-danger" disabled={isSubmitting}>
              {isSubmitting ? 'Transmitting...' : (
                <>
                  <Send size={18} /> Broadcast Alert
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportIncident;
