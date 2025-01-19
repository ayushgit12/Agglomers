// import React, { useState } from "react";
// import axios from "axios";
// import InitialPreview from "./Initial_preview";
// import Navbar from "./Navbar";

// const InputUrl = ({ onPreview }) => {
//   const [url, setUrl] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleSubmit = async () => {
//     setIsProcessing(true);
//     try {
//       localStorage.setItem("url", url);
//       const response = await axios.post("http://127.0.0.1:8000/scrapedata", {
//         url,
//       });

//       // Pass only the preview URL
//       onPreview(response.data.preview_url);
//       // console.log(response.data.preview_url.split().pop());
//       localStorage.setItem("preview_url", response.data.preview_url.split('/').pop());
//     } catch (error) {
//       console.error("Error processing URL:", error);
//       alert("Failed to process the URL. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleReset = () => {
//     axios
//       .post("http://127.0.0.1:8000/clear_previews")
//       .then((response) => {
//         console.log(response.data);
//         alert("Previews cleared successfully");
//       })

//       .catch((error) => {
//         console.error("Error processing URL:", error);
//         alert("Failed to process the URL. Please try again.");
//       });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <Navbar />
//       <h1 className="mt-28">Enter Website URL</h1>
//       <input
//         type="text"
//         placeholder="Enter website URL"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//         style={{
//           width: "100%",
//           padding: "10px",
//           marginBottom: "10px",
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//         }}
//       />
//       <button
//         onClick={handleSubmit}
//         disabled={isProcessing}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           cursor: isProcessing ? "not-allowed" : "pointer",
//         }}
//       >
//         {isProcessing ? "Processing..." : "Submit"}
//       </button>
//       <button
//       onClick={handleReset}
//        className="bg-red-700">
//         Reset
//       </button>
//       <InitialPreview scrapedData={url} />
//     </div>
//   );
// };

// export default InputUrl;
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
      localStorage.setItem("url", url);
      const response = await axios.post("http://127.0.0.1:8000/scrapedata", {
        url,
      });
      onPreview(response.data.preview_url);
      localStorage.setItem(
        "preview_url",
        response.data.preview_url.split("/").pop()
      );

      // Add smooth scrolling after successful submission
      setTimeout(() => {
        const previewElement = document.getElementById("preview-section");
        if (previewElement) {
          previewElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100); // Small delay to ensure the preview component has rendered
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Enter Website URL
          </h1>

          <div className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform 
                  ${
                    isProcessing
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-98 shadow-lg hover:shadow-xl"
                  }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>

              <button
                onClick={handleReset}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-98 shadow-lg hover:shadow-xl"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <InitialPreview scrapedData={url} />
        </div>
      </div>
    </div>
  );
};

export default InputUrl;
