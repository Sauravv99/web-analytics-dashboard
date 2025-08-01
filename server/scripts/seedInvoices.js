const mongoose = require('mongoose');
const Invoice = require('../models/Invoice');
const dotenv = require("dotenv");

dotenv.config();

const DataInvoices = [
  { id: 1, name: "Jon Snow", email: "jonsnow@gmail.com", cost: "21.24", phone: "(665)121-5454", date: "03/12/2022" },
  { id: 2, name: "Cersei Lannister", email: "cerseilannister@gmail.com", cost: "1.24", phone: "(421)314-2288", date: "06/15/2021" },
  { id: 3, name: "Jaime Lannister", email: "jaimelannister@gmail.com", cost: "11.24", phone: "(422)982-6739", date: "05/02/2022" },
  { id: 4, name: "Anya Stark", email: "anyastark@gmail.com", cost: "80.55", phone: "(921)425-6742", date: "03/21/2022" },
  { id: 5, name: "Daenerys Targaryen", email: "daenerystargaryen@gmail.com", cost: "1.24", phone: "(421)445-1189", date: "01/12/2021" },
  { id: 6, name: "Ever Melisandre", email: "evermelisandre@gmail.com", cost: "63.12", phone: "(232)545-6483", date: "11/02/2022" },
  { id: 7, name: "Ferrara Clifford", email: "ferraraclifford@gmail.com", cost: "52.42", phone: "(543)124-0123", date: "02/11/2022" },
  { id: 8, name: "Rossini Frances", email: "rossinifrances@gmail.com", cost: "21.24", phone: "(222)444-5555", date: "05/02/2021" }
];

async function seedInvoices() {
  try {
  
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Invoice.deleteMany({});
    await Invoice.insertMany(DataInvoices);

    console.log("invoices seeded.");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seedInvoices();
