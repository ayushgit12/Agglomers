import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const chartData = {
    labels: [
      "Color Contrast",
      "Text Legibility",
      "Alt Tags",
      "Interactive Elements",
      "Visual Hierarchy",
      "Focus Indicators",
    ],
    datasets: [
      {
        label: "Original Website",
        data: [
          data.original.analysis.color_contrast.score,
          data.original.analysis.text_legibility.score,
          data.original.analysis.alt_text.score,
          data.original.analysis.interactive_elements.score,
          data.original.analysis.visual_hierarchy.score,
          data.original.analysis.focus_indicators.score,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Modified Website",
        data: [
          data.modified.analysis.color_contrast.score,
          data.modified.analysis.text_legibility.score,
          data.modified.analysis.alt_text.score,
          data.modified.analysis.interactive_elements.score,
          data.modified.analysis.visual_hierarchy.score,
          data.modified.analysis.focus_indicators.score,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Accessibility Analysis Comparison",
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
