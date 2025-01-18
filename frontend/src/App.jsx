import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputUrl from "./components/Input_url";
import PreviewAndCustomize from "./components/Preview_customise";
import CodeDisplayComponent from "./components/CodeDisplayComponent"; // Make sure this is the correct path
import "./index.css";

const App = () => {
  const [scrapedData, setScrapedData] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <InputUrl onPreview={setScrapedData} />
              {scrapedData && <PreviewAndCustomize scrapedData={scrapedData} />}
            </div>
          }
        />
        <Route path="/code/:sessionId" element={<CodeDisplayComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
