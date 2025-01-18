import React, { useState } from "react";
import axios from "axios";

const PreviewAndCustomize = ({ scrapedData }) => {
  const [fontSize, setFontSize] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [contrast, setContrast] = useState("");
  const [iframeContent, setIframeContent] = useState("");

  const applyChange = async (action, value) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/apply_change", {
        url: scrapedData,
        action,
        value,
      });
      if (response.data.updated_url) {
        setIframeContent(
          `${response.data.updated_url}?t=${new Date().getTime()}`
        );
      } else {
        alert("Failed to update the preview.");
      }
    } catch (error) {
      console.error("Error applying change:", error);
      alert("Error applying change. Please try again.");
    }
  };

  const handleApplyChanges = () => {
    if (fontSize) applyChange("font-size", `${fontSize}px`);
    if (bgColor) applyChange("background-color", bgColor);
    if (textColor) applyChange("text-color", textColor);
    if (contrast) applyChange("contrast", contrast);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customize Website</h1>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Font Size (px):
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              placeholder="Enter font size"
              style={inputStyle}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Background Color:
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              placeholder="e.g., black or #000000"
              style={inputStyle}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Text Color:
            <input
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              placeholder="e.g., white or #FFFFFF"
              style={inputStyle}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Contrast (e.g., 100%):
            <input
              type="text"
              value={contrast}
              onChange={(e) => setContrast(e.target.value)}
              placeholder="Enter contrast value"
              style={inputStyle}
            />
          </label>
        </div>
        <button onClick={handleApplyChanges} style={buttonStyle}>
          Apply Changes
        </button>
      </div>
      {scrapedData ? (
        <iframe
          src={iframeContent || scrapedData}
          title="Website Preview"
          width="100%"
          height="600px"
          style={{ border: "1px solid #ccc" }}
        />
      ) : (
        <p>No preview available.</p>
      )}
    </div>
  );
};

// Reusable input style
const inputStyle = {
  padding: "8px",
  margin: "5px 10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "200px",
};

// Reusable button style
const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default PreviewAndCustomize;
