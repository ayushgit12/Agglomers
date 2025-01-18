// src/App.jsx
import React, { useState } from "react";
import InputUrl from "./components/Input_url";
import PreviewAndCustomize from "./components/Preview_customise";

const App = () => {
  const [sessionId, setSessionId] = useState(null);

  return (
    <div>
      {sessionId ? (
        <PreviewAndCustomize sessionId={sessionId} />
      ) : (
        <InputUrl onPreview={(id) => setSessionId(id)} />
      )}
    </div>
  );
};

export default App;
