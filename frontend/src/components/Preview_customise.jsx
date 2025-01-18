import React, { useEffect, useState } from "react";

const PreviewAndCustomize = ({ scrapedData }) => {
  const [iframeContent, setIframeContent] = useState("");

  useEffect(() => {
    if (scrapedData) {
      setIframeContent(scrapedData); // Directly use the URL
    }
  }, [scrapedData]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Preview Website</h1>
      {iframeContent ? (
        <iframe
          src={iframeContent}
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

export default PreviewAndCustomize;
