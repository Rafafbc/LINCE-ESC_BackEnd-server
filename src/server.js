const mysql = require('mysql2');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3306;

// Environment variables (from Railway settings)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    process.exit(1); // Encerra o processo se a conexão falhar
  } else {
    console.log('Conectado ao MySQL.');
  }
});

app.use(express.json());

app.post('/dados', (req, res) => {
  const { temperatura, umidade, pressao, lux, timestamp } = req.body;

  const query = 'INSERT INTO sensor_data (temperatura, umidade, pressao, lux, timestamp) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [temperatura, umidade, pressao, lux, timestamp], (err, results) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados.');
    } else {
      res.send('Dados recebidos e salvos com sucesso!');
    }
  });
});

app.get('/dados', (req, res) => {
  const query = 'SELECT * FROM sensor_data';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      return res.status(500).send('Erro ao buscar dados.');
    }
    res.json(results);
  });
});