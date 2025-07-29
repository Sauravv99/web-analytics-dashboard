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

// const allowedOrigins = [
//     'http://localhost:3000', 
//     'https://analyticsdashboard-rho.vercel.app/',    // your actual Vercel URL
// ];

// app.use(cors({
//   origin: allowedOrigins,
// //   credentials: true,           // set to true only if you’ll use cookies
//   methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type','Authorization']
// }));

// --- CORS (put this BEFORE express.json() and BEFORE routes) ---
const whitelist = [
  'http://localhost:3000',
  'https://analyticsdashboard-rho.vercel.app'
];

// If you also want to allow preview URLs like https://<hash>-analyticsdashboard-rho.vercel.app
function isAllowedOrigin(origin) {
  if (!origin) return true; // allow curl/Postman/health
  if (whitelist.includes(origin)) return true;
  try {
    const url = new URL(origin);
    return url.hostname.endsWith('.vercel.app'); // optional: allow all vercel.app previews
  } catch {
    return false;
  }
}

const corsOptions = {
  origin: (origin, cb) => (isAllowedOrigin(origin) ? cb(null, true) : cb(new Error('Not allowed by CORS'))),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: false // keep false since you’re not using cookies
};

app.use(cors(corsOptions));
// Explicitly handle preflight for all routes
app.options('*', cors(corsOptions));


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

