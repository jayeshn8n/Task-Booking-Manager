require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');

// Initialize Express
const app = express();

// 1. Connect to MongoDB
connectDB();

// 2. Global Middleware
app.use(cors()); 
app.use(express.json()); 

// 3. Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// 4. Root Route (Optional check)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// 5. Error Handling Middleware (Must be defined LAST)
app.use(errorMiddleware);

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});