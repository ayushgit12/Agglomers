import React, { useState } from "react";
import axios from "axios";

const InputUrl = ({ onPreview }) => {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/scrapedata", {
        url,
      });

      // Pass only the preview URL
      onPreview(response.data.preview_url);
      console.log(response.data.preview_url);
    } catch (error) {
      console.error("Error processing URL:", error);
      alert("Failed to process the URL. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset  = () => {
    

    axios.post("http://127.0.0.1:8000/clear_previews")
    .then((response) => {
      console.log(response.data);
      alert("Previews cleared successfully");
    })

    .catch((error) => {
      console.error("Error processing URL:", error);
      alert("Failed to process the URL. Please try again.");
    })
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Enter Website URL</h1>
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: isProcessing ? "not-allowed" : "pointer",
        }}
      >
        {isProcessing ? "Processing..." : "Submit"}
      </button>
      <button
      onClick={handleReset}
       className="bg-red-700">
        Reset
      </button>
    </div>
  );
};

export default InputUrl;
