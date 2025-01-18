// src/components/PreviewAndCustomize.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PreviewAndCustomize = ({ sessionId }) => {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    const fetchImprovedCode = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/preview/${sessionId}`
        );
        setIframeSrc(response.data.preview_url); // Backend returns the preview URL
      } catch (error) {
        console.error("Error fetching improved code:", error);
        alert("Failed to fetch the preview.");
      }
    };
    fetchImprovedCode();
  }, [sessionId]);

  const handleCustomization = () => {
    const iframe = document.getElementById("preview-iframe");
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    if (iframeDoc) {
      iframeDoc.body.style.backgroundColor = bgColor;
      iframeDoc.body.style.color = textColor;
    }
  };

  const saveCustomizations = async () => {
    try {
      await axios.post(`http://127.0.0.1:5000/save-customizations`, {
        session_id: sessionId,
        bg_color: bgColor,
        text_color: textColor,
      });
      alert("Customizations saved successfully!");
    } catch (error) {
      console.error("Error saving customizations:", error);
      alert("Failed to save customizations.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Preview and Customize</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <label>
          Text Color:
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <br />
        <button
          onClick={handleCustomization}
          style={{ marginTop: "10px", padding: "10px 20px" }}
        >
          Apply Customizations
        </button>
        <button
          onClick={saveCustomizations}
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save Customizations
        </button>
      </div>
      <iframe
        id="preview-iframe"
        src={iframeSrc}
        title="Improved Website Preview"
        width="100%"
        height="600px"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default PreviewAndCustomize;
