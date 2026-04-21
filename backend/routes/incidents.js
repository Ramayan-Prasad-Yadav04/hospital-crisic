const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all active incidents
router.get('/', (req, res) => {
    db.all('SELECT * FROM incidents ORDER BY reportedAt DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

// Create a new incident
router.post('/', (req, res) => {
    const { type, location, description, priority } = req.body;
    
    // basic validation
    if (!type || !location) {
        return res.status(400).json({ error: 'Type and location are required' });
    }

    const sql = `INSERT INTO incidents (type, location, description, priority) VALUES (?, ?, ?, ?)`;
    const params = [type, location, description, priority || 'High'];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'Incident reported successfully',
            data: { id: this.lastID, type, location, description, priority }
        });
    });
});

// Update incident status
router.put('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    db.run('UPDATE incidents SET status = ? WHERE id = ?', [status, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Status updated', changes: this.changes });
    });
});

module.exports = router;
