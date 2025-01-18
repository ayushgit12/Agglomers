import React, { useState } from "react";
import axios from "axios";
import InitialPreview from "./Initial_preview";

const InputUrl = ({ onPreview }) => {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      console.log("response.data.preview_url");
      const response = await axios.post("http://127.0.0.1:8000/scrapedata", {
        url,
      });

      // Pass only the preview URL
      onPreview(response.data.preview_url);
      // let gg = response.data.preview_url;
      // try {
      //   // First request to get the preview URL
      //   const previewResponse = await axios.post("http://127.0.0.1:8000/return_soup", {
      //     url,
      //   });
      //   console.log(previewResponse.data,"\n1");
      //   const a = previewResponse.data.soup;
    
      //   // Second request using the preview URL
      //   console.log(gg);
      //   const secondResponse = await axios.post("http://127.0.0.1:8000/return_soup", {
      //     gg,
      //   });
      //   console.log(secondResponse.data);
      //   const g = secondResponse.data.soup;
      //   console.log(g);
    
      //   // Third request using the preview URL 'a'
      //   const thirdResponse = await axios.post("http://127.0.0.1:8000/return_soup", {
      //     a,
      //   });
      //   console.log(thirdResponse.data);
      //   const h = thirdResponse.data;
    
      //   // Final request to get the difference report
      //   const differenceResponse = await axios.post("http://127.0.0.1:8000/difference_report", {
      //     g,
      //     h
      //   });
      //   console.log(differenceResponse.data);
    
      } catch (error) {
        // Handle any errors
        console.error("An error occurred:", error);
      } finally {
        // This block will always run
        console.log("Request sequence completed.");
      }
    
    
      
      // new_soup = axios.post("http://127.0.0.1:8000/return_soup", {
      //   a,
      // })['soup'];

      // resp = axios.post("http://127.0.0.1:8000/difference_report"),{
      //   original_soup,
      //   new_soup
      // }

      // console.log(resp.data);


    // } catch (error) {
    //   console.error("Error processing URL:", error);
    //   alert("Failed to process the URL. Please try again.");
    // } finally {
    //   setIsProcessing(false);
    // }
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
      <InitialPreview scrapedData={url} />
    </div>
  );
};

export default InputUrl;
