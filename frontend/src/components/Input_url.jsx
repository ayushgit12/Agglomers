import React, { useState } from "react";
import axios from "axios";
import InitialPreview from "./Initial_preview";
import Navbar from "./Navbar";

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

  const handleReset = () => {
    axios
      .post("http://127.0.0.1:8000/clear_previews")
      .then((response) => {
        console.log(response.data);
        alert("Previews cleared successfully");
      })
      .catch((error) => {
        console.error("Error processing URL:", error);
        alert("Failed to process the URL. Please try again.");
      });
  };

  return (
    <div
      className="min-h-screen top-0 bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col items-center"
    >
      <Navbar />
      <div
        className="mt-32 bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl"
        style={{ padding: "20px" }}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-700">
          Enter Website URL
        </h1>
        <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className={`px-6 py-3 text-white font-semibold rounded-lg transition ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isProcessing ? "Processing..." : "Submit"}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Reset
          </button>
        </div>
      </div>
      <InitialPreview scrapedData={url} />
    </div>
  );
};

export default InputUrl;
