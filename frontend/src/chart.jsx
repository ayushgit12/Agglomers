import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import "./App.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AccessibilityScore from "./accessibilityScore";
//import "./AccessibilityScore.css"; // Custom styles for this component

const Chart = () => {
  const [data, setData] = useState(null);

  // Simulating fetching JSON data
  useEffect(() => {
    const fetchData = async () => {
      // const jsonData = {
      //   original: {
      //     accessibilityScore: 50,
      //     colorContrast: 30,
      //     altTags: 40,
      //     keyboardNavigation: 20,
      //   },
      //   modified: {
      //     accessibilityScore: 90,
      //     colorContrast: 80,
      //     altTags: 95,
      //     keyboardNavigation: 85,
      //   },
        
      // };
      const jsonData = {
        original: {"accessibility_score": 43.33,
        "analysis": {
            "color_contrast": {
                "score": 50,
                "details": "Text contrast against the background appears acceptable at first glance, but precise measurement is needed to confirm WCAG compliance.  A tool should be used to measure the contrast ratio."
            },
            "text_legibility": {
                "score": 60,
                "details": "Font size appears small.  While the font type is sans-serif (likely), it is hard to judge legibility without knowing the exact font and size.  Line spacing is minimal."
            },
            "alt_text": {
                "score": 0,
                "details": "Placeholder images 'Placeholder 1' and 'Placeholder 2' strongly suggest missing alt text.  Without alt text, these images are inaccessible to screen readers."
            },
            "interactive_elements": {
                "score": 70,
                "details": "Buttons and form fields are visible. However, the lack of visible hover and focus states makes interaction less clear, especially for users with motor impairments or those relying on keyboard navigation."
            },
            "visual_hierarchy": {
                "score": 80,
                "details": "The layout is relatively straightforward, with clear labeling of form fields.  However, there is no visual separation between sections, which could be improved."
            },
            "focus_indicators": {
                "score": 0,
                "details": "No visible focus indicators are present.  This is a critical accessibility failure, as keyboard-only users cannot determine which element has focus."
            }
        },
        "recommendations": [
            "Use a tool to measure and improve text contrast ratios to meet WCAG 2.1 AA success criteria (minimum 4.5:1 for text and 3:1 for large text).",
            "Increase the font size of the body text to at least 16px. Improve line spacing for better readability.",
            "Provide descriptive alt text for all images. If the images are purely decorative, use an empty alt attribute (alt=\"\").",
            "Add clear hover and focus styles to all interactive elements (buttons, links, form fields). Ensure focus styles are visually distinct and easily noticeable.",
            "Add visual separation between sections (e.g., using spacing, dividers, or background colors) to improve the visual hierarchy.",
            "Implement visible focus indicators (e.g., a highlighted border or outline) for all interactive elements to support keyboard navigation."
        ]
    },
        modified: {"accessibility_score": 43.33,
          "analysis": {
              "color_contrast": {
                  "score": 50,
                  "details": "Text contrast against the background appears acceptable at first glance, but precise measurement is needed to confirm WCAG compliance.  A tool should be used to measure the contrast ratio."
              },
              "text_legibility": {
                  "score": 60,
                  "details": "Font size appears small.  While the font type is sans-serif (likely), it is hard to judge legibility without knowing the exact font and size.  Line spacing is minimal."
              },
              "alt_text": {
                  "score": 0,
                  "details": "Placeholder images 'Placeholder 1' and 'Placeholder 2' strongly suggest missing alt text.  Without alt text, these images are inaccessible to screen readers."
              },
              "interactive_elements": {
                  "score": 70,
                  "details": "Buttons and form fields are visible. However, the lack of visible hover and focus states makes interaction less clear, especially for users with motor impairments or those relying on keyboard navigation."
              },
              "visual_hierarchy": {
                  "score": 80,
                  "details": "The layout is relatively straightforward, with clear labeling of form fields.  However, there is no visual separation between sections, which could be improved."
              },
              "focus_indicators": {
                  "score": 0,
                  "details": "No visible focus indicators are present.  This is a critical accessibility failure, as keyboard-only users cannot determine which element has focus."
              }
          },
          "recommendations": [
              "Use a tool to measure and improve text contrast ratios to meet WCAG 2.1 AA success criteria (minimum 4.5:1 for text and 3:1 for large text).",
              "Increase the font size of the body text to at least 16px. Improve line spacing for better readability.",
              "Provide descriptive alt text for all images. If the images are purely decorative, use an empty alt attribute (alt=\"\").",
              "Add clear hover and focus styles to all interactive elements (buttons, links, form fields). Ensure focus styles are visually distinct and easily noticeable.",
              "Add visual separation between sections (e.g., using spacing, dividers, or background colors) to improve the visual hierarchy.",
              "Implement visible focus indicators (e.g., a highlighted border or outline) for all interactive elements to support keyboard navigation."
          ]
      },
};
 setData(jsonData);
    };
    fetchData();
  }, []);

  if (!data) return <div className="loading">Loading...</div>;

  return (
    
    <div className="app-container">
      {console.log(data)}
      <div className = "align">
        <header className="app-header">
          <h1>Website Accessibility Analysis</h1>
          <p>
            Compare the accessibility scores of the original website with the
            improved version, displayed in intuitive charts.
          </p>
        </header>
        <main className="charts-container">
          <div className="chart-wrapper">
            {console.log(data.original.accessibility_score)}
            <AccessibilityScore score={data.original.accessibility_score} />
            <AccessibilityScore score={data.modified.accessibility_score} />
          </div>
          
          <div className="chart-wrapper">
            <BarChart data={data} />
          </div>
          <div className="chart-wrapper">
            <PieChart data={data} />
          </div>
        </main>
      </div>
      <footer className="app-footer">
        <p>
          Accessibility Matters! | Designed with 💙 by [Your Name or Team Name]
        </p>
      </footer>
    </div>
  );
};

export default Chart;
