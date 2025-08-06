// server/index.js
const express = require('express');
const path = require('path');
const pool = require('./db/index'); 
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Database connected:', res.rows[0]);
    process.exit();
  } catch (err) {
    console.error('❌ Error connecting to DB:', err);
    process.exit(1);
  }
})();


app.use(express.static(path.join(__dirname, '../client/build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
