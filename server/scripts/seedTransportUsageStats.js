const mongoose = require("mongoose");
require("dotenv").config();

const TransportUsageStat = require("../models/TransportUsageStat");

const data = [
  { id: "plane", mode: "Plane", japan: 123, france: 137, us: 111 },
  { id: "helicopter", mode: "Helicopter", japan: 50, france: 80, us: 95 },
  { id: "boat", mode: "Boat", japan: 30, france: 70, us: 60 },
  { id: "train", mode: "Train", japan: 190, france: 120, us: 150 },
  { id: "subway", mode: "Subway", japan: 85, france: 100, us: 70 },
  { id: "bus", mode: "Bus", japan: 90, france: 110, us: 80 },
  { id: "car", mode: "Car", japan: 200, france: 180, us: 220 },
  { id: "moto", mode: "Moto", japan: 40, france: 60, us: 50 },
  { id: "bicycle", mode: "Bicycle", japan: 95, france: 85, us: 75 },
  { id: "horse", mode: "Horse", japan: 10, france: 15, us: 20 },
  { id: "skateboard", mode: "Skateboard", japan: 25, france: 35, us: 45 },
  { id: "others", mode: "Others", japan: 5, france: 10, us: 15 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await TransportUsageStat.deleteMany();
    await TransportUsageStat.insertMany(data);

    console.log("Transport usage stats seeded!");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();
