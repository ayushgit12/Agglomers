import React, { useEffect, useState } from "react";
import axios from "axios";

const InitialPreview = ({ scrapedData }) => {
  const [iframeContent, setIframeContent] = useState("");

  useEffect(() => {
    if (scrapedData) {
      setIframeContent(scrapedData); // Directly use the URL
    }
  }, [scrapedData]);

  // const handleShowCode = (e) => {
  //   e.preventDefault();
  //   axios.post("http://127.0.0.1:8000/return_soup",{
  //     url: scrapedData

  //   })
  //   .then((response) => {
  //     console.log(response.data);
  //     window.open(response.data, "_blank");
  //   })
  //   .catch((error) => {
  //     console.error("Error processing URL:", error);
  //   })
  // }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Initial Website</h1>
      {iframeContent ? (
        <div>
          {/* <button onClick={handleShowCode} className="bg-green-500 mb-2">Show Code</button> */}
        <iframe
          src={iframeContent}
          title="Website Preview"
          width="100%"
          height="600px"
          style={{ border: "1px solid #ccc" }}
        />
        
        </div>
      ) : (
        <p>No preview available.</p>
      )}


      
    </div>
  );
};

export default InitialPreview;
