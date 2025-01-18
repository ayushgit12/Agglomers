import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import "./App.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AccessibilityScore from "./accessibilityScore";
//import "./AccessibilityScore.css"; // Custom styles for this component

const Chart = () => {
  const [data, setData] = useState(null);

  // Simulating fetching JSON data
  useEffect(() => {
    const fetchData = async () => {
      const jsonData = {
        original: {
          accessibilityScore: 50,
          colorContrast: 30,
          altTags: 40,
          keyboardNavigation: 20,
        },
        modified: {
          accessibilityScore: 90,
          colorContrast: 80,
          altTags: 95,
          keyboardNavigation: 85,
        },
      };
      setData(jsonData);
    };
    fetchData();
  }, []);

  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="app-container">
      <div className = "align">
        <header className="app-header">
          <h1>Website Accessibility Analysis</h1>
          <p>
            Compare the accessibility scores of the original website with the
            improved version, displayed in intuitive charts.
          </p>
        </header>
        <main className="charts-container">
          <div className="chart-wrapper">
            <AccessibilityScore score={data.original.accessibilityScore} />
          </div>
          
          <div className="chart-wrapper">
            <BarChart data={data} />
          </div>
          <div className="chart-wrapper">
            <PieChart data={data} />
          </div>
        </main>
      </div>
      <footer className="app-footer">
        <p>
          Accessibility Matters! | Designed with 💙 by [Your Name or Team Name]
        </p>
      </footer>
    </div>
  );
};

export default Chart;
