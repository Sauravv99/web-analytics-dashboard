// src/components/countrymap/WorldMap.js
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";
import iso from "iso-3166-1";
import { useSelector } from "react-redux";

const WorldMap = ({ data }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [tooltip, setTooltip] = useState(null);
  const theme = useSelector((state) => state.theme.theme);

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

  useEffect(() => {
    if (!data) return;

    const countries = feature(worldData, worldData.objects.countries).features;

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

    const maxValue = d3.max(data, (d) => d.value) || 1;
    const colorScale = d3
      .scaleSequential(d3.interpolateGreys)
      .domain([0, maxValue]);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // clear old renders

    const projection = d3
      .geoMercator()
      .fitSize([dimensions.width, dimensions.height], {
        type: "FeatureCollection",
        features: enriched,
      });

    const path = d3.geoPath().projection(projection);

    svg
      .append("g")
      .selectAll("path")
      .data(enriched)
      .join("path")
      .attr("d", path)
      .attr("fill", (d) =>
        d.properties.value ? colorScale(d.properties.value) : "#ccc"
      )
      .attr("stroke", theme === "dark" ? "#444" : "#999")
      .style("cursor", "pointer") // 👈 cursor pointer on hover
      .on("mouseover", function () {
        d3.select(this)
          .attr("fill",theme == "dark" ? "#2ce9e9" : "#3889ed") // 👈 light blue
          .attr("stroke-width", 1.5);
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .attr("fill", (d) =>
            d.properties.value ? colorScale(d.properties.value) : "#ccc"
          )
          .attr("stroke-width", 1);
      })
      .on("click", function (event, d) {
        setTooltip({
          country: d.properties.name,
          value: d.properties.value,
          x: event.clientX,
          y: event.clientY,
        });
        setTimeout(()=>{
            setTooltip(null);
        },1000)
      });
  }, [data, dimensions, theme]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "60vh",
        borderRadius: "12px",
        background: theme === "dark" ? "#212529" : "#f8f9fa",
        position: "relative",
      }}
    >
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />

      {tooltip && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y + 10,
            left: tooltip.x + 10,
            background: "rgba(0, 0, 0, 0.75)",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "13px",
            pointerEvents: "none",
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

export default WorldMap;
