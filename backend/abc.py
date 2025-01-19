```
# # from flask import Flask, jsonify, request
# # from flask_cors import CORS
# # from main import scrapedata

# # app = Flask(__name__)
# # CORS(app)  # Enable CORS for all routes

# # @app.route("/")
# # def read_root():
# #     return jsonify({"Hello": "World"})

# # @app.route("/scrapedata", methods=["POST"])  # Changed to POST
# # def read_scrape_data():
# #     data = request.get_json()  # Get JSON payload

# #     url = data.get('url')  # Extract 'url' from the JSON
# #     if not url:
# #         return jsonify({"error": "URL is required in the JSON body"}), 400

# #     return jsonify(scrapedata(url))

# # if __name__ == "__main__":
# #     app.run(host="0.0.0.0", port=8000, debug=True)

# from bs4 import BeautifulSoup
# import requests
# import os

# HEADERS = {
#     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
#     "Accept-Language": "en-US,en;q=0.9",
# }

# def scrapedata(url, session_id):
#     response = requests.get(url, headers=HEADERS)
#     soup = BeautifulSoup(response.content, "html.parser")
    
#     # Save the scraped HTML
#     preview_dir = "previews"
#     os.makedirs(preview_dir, exist_ok=True)
#     file_path = os.path.join(preview_dir, f"{session_id}.html")
    
#     with open(file_path, "w", encoding="utf-8") as file:
#         file.write(soup.prettify())
    
#     return file_path
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import uuid
import os
from main import scrapedata, clear_previews  # Make sure to import the scraping function

app = Flask(__name__)
CORS(app)

@app.route("/")
def read_root():
    return jsonify({"Hello": "World"})

@app.route("/scrapedata", methods=["POST"])
def read_scrape_data():
    data = request.get_json()
    url = data.get('url')
    
    if not url:
        return jsonify({"error": "URL is required in the JSON body"}), 400

    # Generate a unique session ID
    session_id = str(uuid.uuid4())
    
    # Scrape and save the data
    scrapedata(url, session_id)
    
    preview_url = f"http://127.0.0.1:8000/preview/{session_id}"
    return jsonify({"preview_url": preview_url, "session_id": session_id})

# Serve the HTML preview
@app.route("/preview/<session_id>")
def serve_preview(session_id):
    preview_dir = os.path.abspath("previews")
    file_name = f"{session_id}.html"

    if os.path.exists(os.path.join(preview_dir, file_name)):
        return send_from_directory(preview_dir, file_name)
    else:
        return jsonify({"error": "Preview not found."}), 404

# Serve static resources like CSS, JS, and images
@app.route("/preview/<session_id>/<path:filename>")
def serve_static(session_id, filename):
    preview_dir = os.path.abspath("previews")
    file_path = os.path.join(preview_dir, session_id, filename)
    if os.path.exists(file_path):
        return send_from_directory(os.path.join(preview_dir, session_id), filename)
    else:
        return jsonify({"error": "File not found."}), 404
    

@app.route("/clear_previews", methods=["POST"])
def clear_previews_route():
    clear_previews()
    return jsonify({"message": "Previews cleared."})


# from flask import Flask, request, jsonify
import base64
from io import BytesIO
from PIL import Image
import numpy as np



import google.generativeai as genai
import PIL.Image
# import os
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

 {
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
        base64_image,base64_image2 = request.form.get('image')
        # print(base64_image)

        # if not base64_image:
        #     return jsonify({'error': 'No image provided'}), 400

        # Decode the Base64 image string
        if "," in base64_image:
            base64_image = base64_image.split(",")[1]
        if "," in base64_image2:
            base64_image2 = base64_image2.split(",")[1]

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

        #****

        # Get the Base64-encoded image from the form data
      

        # Step 2: Decode the base64 string
        image_data2 = base64.b64decode(base64_image2)

        # Step 3: Convert to a BytesIO object
        image_file2 = BytesIO(image_data2)

        # Step 4: Open with PIL
        image2 = Image.open(image_file2)

        # local_image_path2 = "/kaggle/input/sample-img-new/WhatsApp Image 2025-01-19 at 01.18.25.jpeg"
        result2 = analyzer.analyze_image(image2, system_prompt)
        pattern2 = r"(?<=```json\s).*?(?=\s```)"
        match2 = re.search(pattern2, result2, re.DOTALL)
        final_result2 = match2.group(0) if match2 else None
        # Pass the image array to your ML model for prediction
        # prediction2 = predict(image_array2)
        data2 = json.loads(final_result2)
        scores2 = [aspect2["score"] for aspect2 in data2["analysis"].values()]

        # Calculate the average score
        average_score2 = sum(scores2) / len(scores2)

        # Update the overall accessibility score in the JSON
        data2["accessibility_score"] = round(average_score2, 2)

        # Output the updated JSON
        updated_json2 = json.dumps(data2, indent=4)
        jsonData=dict()
        jsonData['original']=updated_json
        jsonData['modified']=updated_json2
        # Return the prediction as JSON
        jsonData = json.loads(json.dumps(jsonData))
        return jsonData, 200
    except Exception as e:
        return jsonify({'error': f'Error processing image: {str(e)}'}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
```