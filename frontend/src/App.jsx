import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputUrl from "./components/Input_url";
import PreviewAndCustomize from "./components/Preview_customise";
import "./index.css";
import Landing from "./components/Landing";
import CodeDisplayComponent from "./components/CodeDisplayComponent"; // Make sure this is the correct path
import "./index.css";
import Renders from "./components/Renders";
import { Chart } from "react-chartjs-2";
import Ch from "./components/Chart";
const App = () => {
  const [scrapedData, setScrapedData] = useState("");

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chart" element={<Ch />} />
        <Route
          path="/preview"
          element={
            <div>
              <InputUrl onPreview={setScrapedData} />

              {scrapedData && <PreviewAndCustomize scrapedData={scrapedData} />}
            </div>
          }
        />
        <Route path="/code/:sessionId" element={<CodeDisplayComponent />} />
        <Route path="/renders" element={<Renders />} />
      </Routes>
    </div>
  );
};

export default App;
