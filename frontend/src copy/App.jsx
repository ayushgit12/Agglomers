import React, { useState } from "react";
import InputUrl from "./components/Input_url";
import PreviewAndCustomize from "./components/Preview_customise";
import "./index.css"

const App = () => {
  const [scrapedData, setScrapedData] = useState("");

  return (
    <div>
      <InputUrl onPreview={setScrapedData} />
      {scrapedData && <PreviewAndCustomize scrapedData={scrapedData} />}
    </div>
  );
};

export default App;
