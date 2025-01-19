import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// import "./chart.css";

const AccessibilityScore = ({ score }) => {
  const isRisk = score < 95; // Define threshold for the risk message

  return (
    <div>
      <h3>Accessibility Score:</h3>
      <div className="circular-progress-container">
        <CircularProgressbar
          value={score}
          text={`${score}`}
          styles={buildStyles({
            textSize: "20px",
            textColor: "#333",
            pathColor: score >= 95 ? "#4caf50" : "#f44336", // Green if good, red if risky
            trailColor: "#d6d6d6",
          })}
        />
      </div>
      {isRisk && (
        <p className="risk-message">
          Websites with a score lower than 95 are at risk of accessibility
          lawsuits
        </p>
      )}
    </div>
  );
};

export default AccessibilityScore;
