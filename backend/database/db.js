const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create tables
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS incidents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                location TEXT NOT NULL,
                description TEXT,
                status TEXT DEFAULT 'Active',
                reportedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                priority TEXT DEFAULT 'High'
            )`);
            
            db.run(`CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                incidentId INTEGER,
                assignee TEXT,
                task TEXT,
                status TEXT DEFAULT 'Pending',
                FOREIGN KEY (incidentId) REFERENCES incidents (id)
            )`);
        });
    }
});

module.exports = db;
