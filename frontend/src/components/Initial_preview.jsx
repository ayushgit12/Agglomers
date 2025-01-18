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
      {localStorage.getItem("preview_url") && (
        <button>
          <a
          onClick={() => {
            localStorage.removeItem("preview_url");
          }
          }
            href={`/code/${localStorage.getItem("preview_url")}`}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >move</a>
        </button>
      )
        }
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