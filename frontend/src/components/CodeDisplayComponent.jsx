import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CodeDisplayComponent = () => {
  const { sessionId } = useParams(); // Get sessionId from route params
  const navigate = useNavigate();
  const [originalCode, setOriginalCode] = useState("");
  const [updatedCode, setUpdatedCode] = useState("");
  const [highlightedDiff, setHighlightedDiff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHtmlCodes = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/get_html_code", {
          session_id: sessionId,
        });
        setUpdatedCode(response.data.updated_html);
        localStorage.setItem("updatedCode", response.data.updated_html);
      } catch (error) {
        console.error("Error fetching updated HTML code:", error);
      } finally {
        setLoading(false);
      }

      const fetchOriginal = async () => {
        try {
          const response = await axios.post("http://127.0.0.1:8000/return_soup", {
            url: localStorage.getItem("url"),
          });
          setOriginalCode(response.data.soup);
          localStorage.setItem("originalCode", response.data.soup);
        } catch (error) {
          console.error("Error fetching original HTML code:", error);
        }
      };

      await fetchOriginal();
    };

    fetchHtmlCodes();
  }, [sessionId]);

  useEffect(() => {
    if (originalCode) {
      // Highlight <img> and <label> tags
      const imgRegex = /<img([^>]*?)\s*(?<!alt\s*=\s*"[^"]*")\s*\/?>/gi;
      const labelRegex = /<label([^>]*?)\s*(?<!for\s*=\s*"[^"]*")\s*>/gi;

      let highlightedParts = [];
      let lastIndex = 0;

      // Process each match and store text chunks
      originalCode.replace(imgRegex, (match, _, offset) => {
        highlightedParts.push(originalCode.slice(lastIndex, offset));
        highlightedParts.push(
          <span key={offset} style={{ color: "red", fontWeight: "bold" }}>
            {match}
          </span>
        );
        lastIndex = offset + match.length;
      });

      originalCode.replace(labelRegex, (match, _, offset) => {
        highlightedParts.push(originalCode.slice(lastIndex, offset));
        highlightedParts.push(
          <span key={offset} style={{ color: "red", fontWeight: "bold" }}>
            {match}
          </span>
        );
        lastIndex = offset + match.length;
      });

      // Add the remaining part of the text
      if (lastIndex < originalCode.length) {
        highlightedParts.push(originalCode.slice(lastIndex));
      }

      setHighlightedDiff(highlightedParts);
    }
  }, [originalCode]);

  return (
    <div style={containerStyle}>
      <h1>HTML Code Comparison</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={codeComparisonContainer}>
          <div style={codeBlockContainer}>
            <h2>Original HTML Code</h2>
            <pre style={codeStyle}>{highlightedDiff}</pre>
          </div>

          <div style={codeBlockContainer}>
            <h2>Updated HTML Code</h2>
            <pre style={codeStyle}>
              {updatedCode || "No updated code available"}
            </pre>
          </div>
        </div>
      )}

      {/* <div>
        <Render1 originalCode={originalCode} />
        <Render2 updatedCode={updatedCode} />

      </div> */}
      <div className="mx-auto mt-8 w-full text-center">
      <button onClick={()=>{
        navigate("/renders")
      }} className="bg-blue-400 px-2 py-1 rounded-xl text-white">Show Renders</button>
      </div>
    </div>
  );
};

// Container style for the whole page
const containerStyle = {
  padding: "20px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#333",
};

// Style for the code comparison container (side by side)
const codeComparisonContainer = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  alignItems: "start",
};

// Style for individual code blocks
const codeBlockContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

// Style for the <pre> tag to format code
const codeStyle = {
  backgroundColor: "#f8f9fa",
  padding: "15px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  whiteSpace: "pre-wrap",
  overflowX: "auto",
  maxHeight: "500px",
  overflowY: "auto",
  fontFamily: "'Courier New', Courier, monospace",
};

export default CodeDisplayComponent;
