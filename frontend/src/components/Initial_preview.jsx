import React, { useEffect, useState } from "react";

const InitialPreview = ({ scrapedData }) => {
  const [iframeContent, setIframeContent] = useState("");

  useEffect(() => {
    if (scrapedData) {
      setIframeContent(scrapedData); // Directly use the URL
    }
  }, [scrapedData]);

  return (
    <div className="w-full " style={{ padding: "20px" }}>
      <h1 className="text-5xl">Initial Website</h1>
      {iframeContent ? (
        <iframe
          src={iframeContent}
          title="Website Preview"
          width="100%"
          height="600px"
          className="mt-4"
          style={{ border: "1px solid black" }}
        />
      ) : (
        <p>No preview available.</p>
      )}
    </div>
  );
};

export default InitialPreview;