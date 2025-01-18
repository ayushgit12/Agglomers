from flask import Flask, request, jsonify
import base64
from io import BytesIO
from PIL import Image
import numpy as np



import google.generativeai as genai
import PIL.Image
import os
from typing import Optional
import requests
from pathlib import Path
import re
import json

class GeminiImageAnalyzer:
    def __init__(self, api_key: str):
        """
        Initialize the Gemini image analyzer with your API key.
        
        Args:
            api_key (str): Your Gemini API key
        """
        self.api_key = api_key
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
    
    def load_image(self, image_path: str) -> PIL.Image.Image:
        """
        Load an image from a local path or URL.
        
        Args:
            image_path (str): Local file path or URL to the image
            
        Returns:
            PIL.Image.Image: Loaded image object
        """
        if image_path.startswith(('http://', 'https://')):
            response = requests.get(image_path)
            response.raise_for_status()
            return PIL.Image.open(requests.get(image_path).raw)
        else:
            return PIL.Image.open(image_path)
    
    def analyze_image(self, 
                     image, 
                     system_prompt: str,
                     temperature: Optional[float] = 0.7,
                     max_tokens: Optional[int] = 2048) -> str:
        """
        Analyze an image using the specified system prompt.
        
        Args:
            image_path (str): Path or URL to the image
            system_prompt (str): The prompt that guides the model's analysis
            temperature (float, optional): Controls randomness in the output. Defaults to 0.7
            max_tokens (int, optional): Maximum tokens in the response. Defaults to 2048
            
        Returns:
            str: The model's analysis of the image
        """
        try:
            # Load the image
            # image = self.load_image(image_path)
            
            # Generate the response
            response = self.model.generate_content(
                [system_prompt, image],
                generation_config=genai.types.GenerationConfig(
                    temperature=temperature,
                    max_output_tokens=max_tokens,
                )
            )
            
            return response.text
            
        except Exception as e:
            return f"Error analyzing image: {str(e)}"
        
# Replace with your actual API key
api_key = "AIzaSyDCeHubkfUtBg8GmCKelf9f4FmO0SkoKs4"

# Initialize the analyzer
analyzer = GeminiImageAnalyzer(api_key)

# Example system prompt
system_prompt = """
I am providing a screenshot of my website. Based on this visual input, analyze the website’s accessibility features following WCAG (Web Content Accessibility Guidelines). Evaluate the following aspects that can be assessed visually:

Aspects to Analyze:
	1.	Color Contrast
	•	Evaluate the contrast ratio for text, buttons, and other key elements against their background.
	•	Scoring Criteria:
	•	0–49: Poor (fails WCAG minimum contrast requirements)
	•	50–79: Needs Improvement (meets some requirements but could be better)
	•	80–100: Good (meets or exceeds WCAG 2.1 AA standards)
	2.	Text Legibility
	•	Assess font size, type, and spacing for readability, especially for users with visual impairments.
	•	Scoring Criteria:
	•	0–49: Poor (text is too small, hard to read, or uses overly decorative fonts)
	•	50–79: Needs Improvement (readable but not optimal for accessibility)
	•	80–100: Good (text is clear, adequately sized, and legible)
	3.	Alt Text Indicators
	•	Check for visual placeholders or signs of missing alt text, such as broken icons or empty image boxes.
	•	Scoring Criteria:
	•	0–49: Poor (missing alt text indicators and placeholders)
	•	50–79: Needs Improvement (some issues with alt text placeholders)
	•	80–100: Good (clear visual placeholders or no visible issues)
	4.	Interactive Element Visibility
	•	Verify if buttons, links, and form elements are visually distinct, easy to identify, and feature hover effects or focus outlines.
	•	Scoring Criteria:
	•	0–49: Poor (elements are hard to identify or lack hover/focus effects)
	•	50–79: Needs Improvement (some visual states are missing or unclear)
	•	80–100: Good (interactive elements are distinct and responsive)
	5.	Visual Hierarchy
	•	Analyze the clarity of the layout, including headings, sections, and alignment for smooth navigation.
	•	Scoring Criteria:
	•	0–49: Poor (cluttered or inconsistent layout disrupts usability)
	•	50–79: Needs Improvement (some sections lack structure or alignment)
	•	80–100: Good (clear, consistent layout with defined sections)
	6.	Keyboard Focus Indicators
	•	Check for visible focus indicators (e.g., highlighted borders) for interactive elements to assist keyboard navigation.
	•	Scoring Criteria:
	•	0–49: Poor (no visible focus indicators)
	•	50–79: Needs Improvement (inconsistent or unclear focus states)
	•	80–100: Good (visible and clear focus states for all elements)

Output Requirements:

Provide the results in a structured JSON format with individual scores for each aspect and an overall accessibility score (average of all aspect scores).

Output Structure:

{{
  "accessibility_score": 82, // Overall average score
  "analysis": {
    "color_contrast": {
      "score": 70,
      "details": "Main navigation bar text has a low contrast ratio of 3.2:1, and button text could benefit from higher contrast."
    },
    "text_legibility": {
      "score": 65,
      "details": "Body text uses a font size of 12px, which may cause readability issues. Spacing between lines is adequate but could be improved."
    },
    "alt_text": {
      "score": 50,
      "details": "Some images have missing alt text indicators, and a few placeholders appear as empty boxes."
    },
    "interactive_elements": {
      "score": 80,
      "details": "Buttons and links are visually distinct but lack consistent hover effects or focus states."
    },
    "visual_hierarchy": {
      "score": 85,
      "details": "Sections and headings are well-structured, but spacing inconsistencies slightly disrupt the flow."
    },
    "focus_indicators": {
      "score": 40,
      "details": "No visible focus indicators for keyboard navigation, making it difficult for users who rely on keyboards."
    }
  },
  "recommendations": [
    "Increase text contrast on navigation bars and buttons to meet a minimum 4.5:1 contrast ratio.",
    "Use a larger font size (14px or above) for body text and improve line spacing for better readability.",
    "Add descriptive alt text for all images and ensure placeholders are meaningful.",
    "Ensure buttons and links have clear hover effects and focus outlines.",
    "Maintain consistent spacing between sections to enhance the visual hierarchy.",
    "Add visible focus indicators for keyboard navigation to improve usability for all users."
  ]
}}

Instructions for Analysis:
	•	Use quantitative scoring for each aspect based on visual evaluation, following the scoring criteria provided above.
	•	The overall score should be the average of all individual aspect scores.
	•	Provide actionable recommendations specific to the website elements identified in the screenshot.
you give just a json object as the structure is provided
"""
    
# Example with a local image
# local_image_path = "/kaggle/input/sample-img-new/WhatsApp Image 2025-01-19 at 01.18.25.jpeg"
# result = analyzer.analyze_image(local_image_path, system_prompt)
# print("Analysis result:", result)

# Example with an image URL
# image_url = "https://example.com/image.jpg"
# result = analyzer.analyze_image(image_url, system_prompt)
# print("Analysis result:", result)

# Example usage
# Initialize Flask app
app = Flask(__name__)

# Dummy ML model predict function
# Replace this with your actual ML model's prediction logic
def predict(image_array):
    # Example: Return a dummy prediction
    return {"class": "dog", "confidence": 0.89}

# Route to handle Base64 image prediction
@app.route('/predict', methods=['POST'])
def handle_predict():
    try:
        # Get the Base64-encoded image from the form data
        base64_image = request.form.get('image')

        if not base64_image:
            return jsonify({'error': 'No image provided'}), 400

        # Decode the Base64 image string
        if "," in base64_image:
            base64_image = base64_image.split(",")[1]

        # Step 2: Decode the base64 string
        image_data = base64.b64decode(base64_image)

        # Step 3: Convert to a BytesIO object
        image_file = BytesIO(image_data)

        # Step 4: Open with PIL
        image = Image.open(image_file)

        # local_image_path = "/kaggle/input/sample-img-new/WhatsApp Image 2025-01-19 at 01.18.25.jpeg"
        result = analyzer.analyze_image(image, system_prompt)
        pattern = r"(?<=```json\s).*?(?=\s```)"
        match = re.search(pattern, result, re.DOTALL)
        final_result = match.group(0) if match else None
        # Pass the image array to your ML model for prediction
        # prediction = predict(image_array)
        data = json.loads(final_result)
        scores = [aspect["score"] for aspect in data["analysis"].values()]

        # Calculate the average score
        average_score = sum(scores) / len(scores)

        # Update the overall accessibility score in the JSON
        data["accessibility_score"] = round(average_score, 2)

        # Output the updated JSON
        updated_json = json.dumps(data, indent=4)

        return updated_json, 200
    except Exception as e:
        return jsonify({'error': f'Error processing image: {str(e)}'}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)