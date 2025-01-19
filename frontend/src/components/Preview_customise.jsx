// import React, { useState } from "react";
// import axios from "axios";

// const PreviewAndCustomize = ({ scrapedData }) => {
//   const [fontSize, setFontSize] = useState("");
//   const [bgColor, setBgColor] = useState("");
//   const [textColor, setTextColor] = useState("");
//   const [contrast, setContrast] = useState("");
//   const [iframeContent, setIframeContent] = useState("");

//   const applyChange = async (action, value) => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/apply_change", {
//         url: scrapedData,
//         action,
//         value,
//       });
//       if (response.data.updated_url) {
//         setIframeContent(
//           `${response.data.updated_url}?t=${new Date().getTime()}`
//         );
//       } else {
//         alert("Failed to update the preview.");
//       }
//     } catch (error) {
//       console.error("Error applying change:", error);
//       alert("Error applying change. Please try again.");
//     }
//   };

//   const handleApplyChanges = () => {
//     if (fontSize) applyChange("font-size", `${fontSize}px`);
//     if (bgColor) applyChange("background-color", bgColor);
//     if (textColor) applyChange("text-color", textColor);
//     if (contrast) applyChange("contrast", contrast);
//   };

//   return (
//     <div className="min-h-screen top-0 bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col items-center" style={{ padding: "20px" }}>
//       <h1>Customize Website</h1>
//       <div style={{ marginBottom: "20px" }}>
//         <div style={{ marginBottom: "10px" }}>
//           <label>
//             Font Size (px):
//             <input
//               type="number"
//               value={fontSize}
//               onChange={(e) => setFontSize(e.target.value)}
//               placeholder="Enter font size"
//               style={inputStyle}
//             />
//           </label>
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>
//             Background Color:
//             <input
//               type="text"
//               value={bgColor}
//               onChange={(e) => setBgColor(e.target.value)}
//               placeholder="e.g., black or #000000"
//               style={inputStyle}
//             />
//           </label>
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>
//             Text Color:
//             <input
//               type="text"
//               value={textColor}
//               onChange={(e) => setTextColor(e.target.value)}
//               placeholder="e.g., white or #FFFFFF"
//               style={inputStyle}
//             />
//           </label>
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>
//             Contrast (e.g., 100%):
//             <input
//               type="text"
//               value={contrast}
//               onChange={(e) => setContrast(e.target.value)}
//               placeholder="Enter contrast value"
//               style={inputStyle}
//             />
//           </label>
//         </div>
//         <button onClick={handleApplyChanges} style={buttonStyle}>
//           Apply Changes
//         </button>
//       </div>
//       {scrapedData ? (
//         <iframe
//           src={iframeContent || scrapedData}
//           title="Website Preview"
//           width="100%"
//           height="600px"
//           style={{ border: "1px solid black" }}
//         />
//       ) : (
//         <p>No preview available.</p>
//       )}
//     </div>
//   );
// };

// // Reusable input style
// const inputStyle = {
//   padding: "8px",
//   margin: "5px 10px",
//   border: "1px solid #ccc",
//   borderRadius: "5px",
//   width: "200px",
// };

// // Reusable button style
// const buttonStyle = {
//   padding: "10px 15px",
//   backgroundColor: "#007bff",
//   color: "white",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// export default PreviewAndCustomize;

import React, { useState } from "react";
import axios from "axios";

const PreviewAndCustomize = ({ scrapedData }) => {
  const [fontSize, setFontSize] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [contrast, setContrast] = useState("");
  const [iframeContent, setIframeContent] = useState("");

  const applyChange = async (action, value) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/apply_change", {
        url: scrapedData,
        action,
        value,
      });
      if (response.data.updated_url) {
        setIframeContent(
          `${response.data.updated_url}?t=${new Date().getTime()}`
        );
      } else {
        alert("Failed to update the preview.");
      }
    } catch (error) {
      console.error("Error applying change:", error);
      alert("Error applying change. Please try again.");
    }
  };

  const handleApplyChanges = () => {
    if (fontSize) applyChange("font-size", `${fontSize}px`);
    if (bgColor) applyChange("background-color", bgColor);
    if (textColor) applyChange("text-color", textColor);
    if (contrast) applyChange("contrast", contrast);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 p-6 transition-all duration-300">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Customize Website
        </h1>

        <div className="space-y-6 mb-8">
          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600">
              Font Size (px):
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                placeholder="Enter font size"
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </label>
          </div>

          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600">
              Background Color:
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                placeholder="e.g., black or #000000"
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </label>
          </div>

          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600">
              Text Color:
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                placeholder="e.g., white or #FFFFFF"
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </label>
          </div>

          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600">
              Contrast (e.g., 100%):
              <input
                type="text"
                value={contrast}
                onChange={(e) => setContrast(e.target.value)}
                placeholder="Enter contrast value"
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </label>
          </div>

          <button
            onClick={handleApplyChanges}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
          >
            Apply Changes
          </button>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-2xl">
          {scrapedData ? (
            <iframe
              src={iframeContent || scrapedData}
              title="Website Preview"
              className="w-full h-[600px] border-0"
            />
          ) : (
            <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 text-gray-500">
              No preview available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Removed the separate style objects since we're using Tailwind classes now
export default PreviewAndCustomize;
