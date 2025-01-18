import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DiffMatchPatch from "diff-match-patch";

const CodeDisplayComponent = () => {
  const { sessionId } = useParams(); // Get sessionId from route params
  const [originalCode, setOriginalCode] = useState("");
  const [updatedCode, setUpdatedCode] = useState("");
  const [highlightedDiff, setHighlightedDiff] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHtmlCodes = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/get_html_code",
          {
            session_id: sessionId,
          }
        );
        setUpdatedCode(response.data.updated_html);
      } catch (error) {
        console.error("Error fetching updated HTML code:", error);
      } finally {
        setLoading(false);
      }

      const fetchOriginal = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/return_soup",
            {
              url: localStorage.getItem("url"),
            }
          );
          setOriginalCode(response.data.soup);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching original HTML code:", error);
        }
      };

      await fetchOriginal();
    };

    fetchHtmlCodes();
  }, [sessionId]);

  useEffect(() => {
    if (originalCode && updatedCode) {
      const diffMatchPatch = new DiffMatchPatch();

      // Compute the differences
      const diffs = diffMatchPatch.diff_main(originalCode, updatedCode);

      // Optional: Cleanup the diffs for better readability
      diffMatchPatch.diff_cleanupSemantic(diffs);

      // Generate highlighted HTML
      const diffHtml = diffs
        .map(([type, text]) => {
          if (type === DiffMatchPatch.DIFF_INSERT) {
            return `<span style="background-color: #d4f4dd; color: green; padding: 0 5px; border-radius: 3px;">${text}</span>`; // Added text
          } else if (type === DiffMatchPatch.DIFF_DELETE) {
            return `<span style="background-color: #f0f0f0; color: red; text-decoration: line-through; padding: 0 5px; border-radius: 3px;">${text}</span>`; // Deleted text with gray background
          }
           else {
            return text; // Unchanged text
          }
        })
        .join("");

      setHighlightedDiff(diffHtml);
    }
  }, [originalCode, updatedCode]);

  return (
    <div style={containerStyle}>
      <h1>HTML Code Comparison</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div style={sectionStyle}>
            <h2>Original HTML Code</h2>
            <pre style={codeStyle}>
              {originalCode || "No original code available"}
            </pre>
          </div>

          <div style={sectionStyle}>
            <h2>Updated HTML Code</h2>
            <pre style={codeStyle}>
              {updatedCode || "No updated code available"}
            </pre>
          </div>

          <div>
            <h2>Highlighted Differences</h2>
            <div
              style={diffStyle}
              dangerouslySetInnerHTML={{ __html: highlightedDiff }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Container style for the whole page
const containerStyle = {
  padding: "20px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#333",
};

// Section style for each block (Original Code, Updated Code)
const sectionStyle = {
  marginBottom: "20px",
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

// Style for the diff container
const diffStyle = {
  whiteSpace: "pre-wrap",
  border: "1px solid #ddd",
  padding: "15px",
  backgroundColor: "#f9f9f9",
  borderRadius: "5px",
  overflowX: "auto",
};

export default CodeDisplayComponent;
