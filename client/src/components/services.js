import axiosInstance from "../utils/axiosInstance";


export default async function fetchTransport() {
  try {
    const res = await axiosInstance.get("/api/transport");
    return res.data; // axios automatically parses JSON
  } catch (err) {
    throw err;
  }
}

export async function fetchTransaction() {
  try {
    const res = await axiosInstance.get("/api/transactions");
    console.log("res",res);
    return res.data; // axios automatically parses JSON
  } catch (err) {
    throw err;
  }
}

export async function fetchCountries() {
  try {
    const res = await axiosInstance.get("/api/countries");
    return res.data; // axios automatically parses JSON
  } catch (err) {
    throw err;
  }
}