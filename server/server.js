const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const teamRoutes = require('./routes/teamRoutes.js');
const countryRoutes = require('./routes/countryRoutes');
const transportUsageStatsRoutes = require('./routes/transportUsageStatsRoutes');

const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

const allowedOrigins = [
    'http://localhost:3000', 
    'https://analyticsdashboard-rho.vercel.app/',    // your actual Vercel URL
];

app.use(cors({
  origin: allowedOrigins,
//   credentials: true,           // set to true only if you’ll use cookies
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/contacts', contactRoutes);
app.use("/api/team", teamRoutes);
app.use('/api/countries', countryRoutes); // ✅ This is now valid
app.use('/api/transport', transportUsageStatsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

