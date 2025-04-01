import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated.default);

const PieChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chartRef.current = chart;

    chart.responsive.enabled = true;

    chart.data = [
      { country: "Kanyakumari", value: 20, color: am4core.color("#2B29CA") },
      { country: "Chennai", value: 20, color: am4core.color("#EAD430") },
      { country: "Tiruvarur", value: 20, color: am4core.color("#E49A2D") },
      { country: "Tirunelveli", value: 40, color: am4core.color("#C70039") },
      { country: "Erode", value: 20, color: am4core.color("#28DD72") },
    ];

    let pieSeries = chart.series.push(new am4charts.PieSeries3D());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "country";

    // 🔹 Fix Hidden Labels
    pieSeries.labels.template.wrap = true;
    pieSeries.labels.template.maxWidth = 120;
    pieSeries.labels.template.fontSize = 10;
    pieSeries.labels.template.fill = am4core.color("#000"); // Ensure it's visible
    pieSeries.labels.template.text = "{category}: {value}"; // Show category & value together
    pieSeries.labels.template.horizontalCenter = "middle"; // Center align text
    pieSeries.labels.template.verticalCenter = "middle";

    // 🔹 Adjust arrow (tick) width, height, and color
    pieSeries.ticks.template.strokeWidth = 1.5; // Reduce arrow thickness
    pieSeries.ticks.template.length = 10; // Shorten line height
    pieSeries.ticks.template.stroke = am4core.color("#000"); // Change line color

    // 🔹 Adjust slice colors
    pieSeries.slices.template.adapter.add("fill", (fill, target) => {
      return target.dataItem ? target.dataItem.dataContext.color : fill;
    });

    // 🔹 Reduce 3D angle to avoid labels getting cut off
    chart.depth = 20;
    chart.angle = 40;

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div
      id="chartdiv"
      style={{
        width: "100%",
        height: "500px",
        maxWidth: "600px",
        margin: "auto",
      }}
    ></div>
  );
};

export default PieChart;
