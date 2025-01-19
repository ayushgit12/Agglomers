import React from 'react'
import Render1 from './Render1'
import Render2 from './Render2'

const handlesend = async () => {
  const render1 = localStorage.getItem("render1");
  const render2 = localStorage.getItem("render2");

  // Check if render1 and render2 are available
  if (!render1 || !render2) {
    console.error('Render1 or Render2 data is missing from localStorage');
    return;
  }

  const data = {
    render1: render1,
    render2: render2
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Handle response from the server
    if (response.ok) {
      const result = await response.json();
      console.log('Response:', result);
      // You can process the result here (e.g., show a success message)
    } else {
      console.error('Failed to send data:', response.statusText);
    }
  } catch (error) {
    console.error('Error during fetch request:', error);
  }
};

const Renders = () => {
  return (
    <div>
      <div className="mt-3">
        <div className="px-4">
          <Render1 originalCode={localStorage.getItem("originalCode")} />
        </div>
        <div className="px-4 mt-2">
          <Render2 updatedCode={localStorage.getItem("updatedCode")} />
        </div>
        <button
          className="bg-green-300 px-2 py-1 rounded-xl"
          onClick={handlesend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Renders;
