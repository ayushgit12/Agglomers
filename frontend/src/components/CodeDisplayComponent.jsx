import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CodeDisplayComponent = () => {
  const { sessionId } = useParams(); // Get sessionId from route params
  const [originalCode, setOriginalCode] = useState("");
  const [updatedCode, setUpdatedCode] = useState("");
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
        setOriginalCode(response.data.original_html);
        setUpdatedCode(response.data.updated_html);
      } catch (error) {
        console.error("Error fetching HTML codes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHtmlCodes();
  }, [sessionId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>HTML Code Comparison</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <h2>Original HTML Code</h2>
            <pre style={codeStyle}>
              {originalCode || "No original code available"}
            </pre>
          </div>

          <div>
            <h2>Updated HTML Code</h2>
            <pre style={codeStyle}>
              {updatedCode || "No updated code available"}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
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
};

export default CodeDisplayComponent;
