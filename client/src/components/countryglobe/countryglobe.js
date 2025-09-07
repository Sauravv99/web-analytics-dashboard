import GlobeChart from "./globechart";
import "./countryglobe.css";
import WorldMap from "./worldmap";
import { useEffect, useState } from "react";
import { fetchCountries } from "../services";

function CountryGlobe() {
  
  const [showGlobe, setShowGlobe] = useState(true);
  const [countryData, setCountryData] = useState();

  async function fetchingData() {
    const fetchedData = await fetchCountries();
    console.log("countryData", fetchedData);
    setCountryData(fetchedData);
  }

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="geo-head">Geography based traffic</h6>
        <div className="form-check form-switch custom-switch">
          <label className="form-check-label" htmlFor="chartToggle">
            {showGlobe ? "Switch to 2D map" : "Switch to 3D globe"}
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="chartToggle"
            checked={showGlobe}
            onChange={() => setShowGlobe(!showGlobe)}
          />
        </div>
      </div>

      <span className="fst-italic country-details">
        ~Click the country to view details
      </span>
        {
          countryData ? (
            <>
              {showGlobe ? (
                <GlobeChart data={countryData} />
              ) : (
                <WorldMap data={countryData} />
              )}
            </>
          ) : (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Loading data...</p>
            </div>
          )
        }
    </>
  );
}

export default CountryGlobe;

