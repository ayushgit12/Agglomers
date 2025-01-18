import React, { useState } from "react";
import InputUrl from "./components/Input_url";
import PreviewAndCustomize from "./components/Preview_customise";
import "./index.css"
import Chart from "./chart";
import Analyze from "./analyzeResult";

const App = () => {
  const [scrapedData, setScrapedData] = useState("");

  return (
    <>
    <div>
      <InputUrl onPreview={setScrapedData} />
      {scrapedData && <PreviewAndCustomize scrapedData={scrapedData} />}
    </div>
   
    <Chart/>
    <Analyze/>
    </>
  );
};

export default App;
