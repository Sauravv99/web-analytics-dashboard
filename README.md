# Web Analytics Dashboard

A full-stack web application to track and analyze user interactions across pages of a website. This dashboard helps visualize key metrics such as page visits, user activity, and engagement patterns using real-time and historical data.

## 🌐 Tech Stack

### Frontend
- React.js
- Recharts (for charts)
- Axios
- Tailwind CSS (optional)

### Backend
- Node.js
- Express.js
- MongoDB (Atlas or local via Compass)
- Mongoose

## 📁 Folder Structure

```
web-analytics-dashboard/
│
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/    # Axios API services
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/              # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── index.js         # Entry point
│   └── package.json
│
└── README.md
```

## ✨ Features

- Track page visits per user
- Store visit data to MongoDB
- Display analytics in bar charts
- Visualize per-page activity and trends
- Modular and clean folder structure

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sauravv99/web-analytics-dashboard.git
cd web-analytics-dashboard
```

### 2. Set Up Backend

```bash
cd server
npm install
# Create a `.env` file
```

`.env` file example:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend:
```bash
npm run dev
```

### 3. Set Up Frontend

```bash
cd ../client
npm install
npm start
```

## 📊 Sample Use Cases

- Monitor how many users visited specific pages
- Understand user behavior for feature engagement
- Extendable for role-based analytics or A/B testing

## 🤝 Contributing

Feel free to open issues or submit pull requests!

## 📄 License

This project is licensed under the MIT License.
