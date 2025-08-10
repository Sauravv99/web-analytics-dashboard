import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import fetchTransport from "../services";
import "./transportlinechart.css";

function TransportLineChart() {
  const [transportData, setTransportData] = useState();
  async function fetchingData() {
    const fetchedData = await fetchTransport();
    console.log("fetchedData", fetchedData);
    setTransportData(fetchedData);
  }

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <>
      <div className="transport-cont">
        <h6 className="ms-4">Revenue generated</h6>
        {transportData ? (
          <>
            <h6 className="fst-italic ms-4 mb-4 highlight">~59,342</h6>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={transportData}>
                <XAxis dataKey="mode" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="japan" stroke="#8884d8" />
                <Line type="monotone" dataKey="france" stroke="#82ca9d" />
                <Line type="monotone" dataKey="us" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </>
        ):(
           <div className="loader-container">
              <div className="loader"></div>
              <p>Loading data...</p>
            </div>
        )}
      </div>
    </>
  );
}

export default TransportLineChart;
