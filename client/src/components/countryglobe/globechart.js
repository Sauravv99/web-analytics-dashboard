// src/components/countryglobe/GlobeChart.js
import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";
import iso from "iso-3166-1";
import { useSelector } from "react-redux";

const GlobeChart = ({ data }) => {
  const globeEl = useRef();
  const containerRef = useRef();
  const [countries, setCountries] = useState([]);
  const [tooltip, setTooltip] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const world = worldData;
    const countries = feature(world, world.objects.countries).features;

    const enriched = countries.map((d) => {
      const isoAlpha3 = iso.whereNumeric(d.id)?.alpha3;
      const match = data.find((x) => x.id === isoAlpha3);
      return {
        ...d,
        properties: {
          ...d.properties,
          value: match ? match.value : 0,
        },
      };
    });

    setCountries(enriched);

    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, [data]);

  // Grey color scale (darker grey for higher value)
  const maxValue = d3.max(data, (d) => d.value) || 1;
  const colorScale = d3.scaleSequential(d3.interpolateGreys).domain([0, maxValue]);

  // Responsive handling
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);


  return (
    <div ref={containerRef}
    className="globe-outer"
    style={{
        width: "100%",
        height: "50vh",
        position: "relative",
        borderRadius: "12px",
        // boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg" 
        backgroundColor= {theme=="dark" ? "#212529" : "#f8f9fa" } 
        polygonsData={countries}
        polygonAltitude={(d) => (d.properties.value ? 0.04 : 0.005)}
        polygonCapColor={(d) =>
          d.properties.value ? colorScale(d.properties.value) : "#343232ff"
        }
        polygonSideColor={() => "rgba(120,120,120,0.3)"}
        polygonStrokeColor={() => "#888"}
        polygonsTransitionDuration={300}
        onPolygonClick={(d, evt) => {
          if (d) {
            setTooltip({
              country: d.properties.name,
              value: d.properties.value,
              x: evt?.clientX || 0,
              y: evt?.clientY || 0,
            });
            setTimeout(() => setTooltip(null), 1000);
          }
        }}
      />

      {tooltip && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y + 12,
            left: tooltip.x + 12,
            background: "rgba(0, 0, 0, 0.75)",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "6px",
            pointerEvents: "none",
            fontSize: "13px",
          }}
        >
          <b>{tooltip.country}</b>
          <br />
          Value: {tooltip.value}
        </div>
      )}
    </div>
  );
};

export default GlobeChart;
