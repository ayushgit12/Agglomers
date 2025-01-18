import React, { useState } from "react";
import InputUrl from "./components/Input_url";
import PreviewAndCustomize from "./components/Preview_customise";
import "./index.css"
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";

const App = () => {
  const [scrapedData, setScrapedData] = useState("");

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/preview" element={<div>
          <InputUrl onPreview={setScrapedData} />
          
          {scrapedData && <PreviewAndCustomize scrapedData={scrapedData} />}
        </div>} />
      </Routes>
      
    </div>
  );
};

export default App;