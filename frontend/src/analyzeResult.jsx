import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

async function analyzeImage(base64Image) {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          image: base64Image, // Your Base64-encoded image
        }),
      });
  
      if (response.ok) {
        const analysis = await response.json();
        return analysis;
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

function AnalysisResult({ data }) {
  if (!data) return <p>No data available.</p>;
    console.log("data", data);
  const { accessibility_score, analysis, recommendations } = data;

  const scores = Object.entries(analysis).map(([key, value]) => ({
    aspect: key.replace('_', ' ').toUpperCase(),
    score: value.score,
    details: value.details,
  }));

  const chartData = {
    labels: scores.map((s) => s.aspect),
    datasets: [
      {
        label: 'Scores',
        data: scores.map((s) => s.score),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div>
      <h2>Accessibility Analysis</h2>
      <p><strong>Overall Accessibility Score:</strong> {accessibility_score}</p>
      <Bar data={chartData} options={chartOptions} />
      <h3>Details</h3>
      <ul>
        {scores.map((s) => (
          <li key={s.aspect}>
            <strong>{s.aspect}:</strong> {s.details} (Score: {s.score})
          </li>
        ))}
      </ul>
      <h3>Recommendations</h3>
      <ol>
        {recommendations.map((rec, idx) => (
          <li key={idx}>{rec}</li>
        ))}
      </ol>
    </div>
  );
}

export default function Analyze() {
  const [analysisData, setAnalysisData] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];
      const data = await analyzeImage(base64Image);
      console.log("data", data);
      setAnalysisData(data);
    };

    if (file) reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>Website Accessibility Analyzer</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <AnalysisResult data={analysisData} />
    </div>
  );
}
