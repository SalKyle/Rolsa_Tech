require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); 
require('./models/userModel');
require('./config/initDB');


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api/chargers", require("./routes/chargers"));
app.use("/api/energy", require("./routes/energy"));
app.use("/api/bookings", require("./routes/booking"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/cf", require("./routes/cf"));



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
