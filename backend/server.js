const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); 


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

console.log('Database connected:', db !== null); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
