const mysql = require('mysql2');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Environment variables (from Railway settings)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

app.use(express.json());

app.post('/dados', (req, res) => {
    const { temperatura, umidade, pressao, lux, timestamp } = req.body;
  
    const query = 'INSERT INTO sensor_data (temperatura, umidade, pressao, lux, timestamp) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [temperatura, umidade, pressao, lux, timestamp], (err, results) => {
      if (err) {
        console.error('Failed to insert data:', err);
        res.status(500).send('Error saving data');
      } else {
        res.send('Data saved successfully');
      }
    });
  });
  