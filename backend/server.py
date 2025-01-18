
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from bs4 import BeautifulSoup
import uuid
import os
from main import scrapedata, clear_previews, return_soup, difference_report  # Make sure to import the scraping function

app = Flask(__name__)
CORS(app)

@app.route("/")
def read_root():
    return jsonify({"Hello": "World"})


@app.route("/return_soup", methods=["POST"])
def read_soup():

    data = request.get_json()
    url = data.get('url')
    
    
    if not url:
        return jsonify({"error": "URL is required in the JSON body"}), 400
    
    soup = return_soup(url)
    return jsonify({"soup": soup.prettify()})


@app.route("/scrapedata", methods=["POST"])
def read_scrape_data():
    data = request.get_json()
    url = data.get('url')
    
    if not url:
        return jsonify({"error": "URL is required in the JSON body"}), 400

    # Generate a unique session ID
    session_id = str(uuid.uuid4())
    
    # Scrape and save the data
    g  = scrapedata(url, session_id)
    
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

@app.route("/apply_change", methods=["POST"])
def apply_change():
    data = request.get_json()
    url = data.get("url")
    action = data.get("action")
    value = data.get("value")

    if not url or not action or not value:
        return jsonify({"error": "URL, action, and value are required."}), 400

    # Find the preview file
    session_id = url.split("/")[-1]
    preview_dir = os.path.abspath("previews")
    file_path = os.path.join(preview_dir, f"{session_id}.html")

    if not os.path.exists(file_path):
        return jsonify({"error": "Preview file not found."}), 404

    # Apply the change
    with open(file_path, "r", encoding="utf-8") as file:
        soup = BeautifulSoup(file, "html.parser")

    if action == "font-size":
        for tag in soup.find_all(["p", "h1", "h2", "h3", "h4", "h5", "h6"]):
             tag["style"] = f"{tag.get('style', '')}; font-size: {value};"
    elif action == "background-color":
        for tag in soup.find_all(["body", "div"]):
            tag["style"] = f"background-color: {value};"
    elif action == "text-color":
        for tag in soup.find_all(["p", "span", "a", "li", "h1", "h2", "h3"]):
            tag["style"] = f"color: {value};"
    elif action == "contrast":
        for tag in soup.find_all(["body", "div"]):
            tag["style"] = f"filter: contrast({value});"

    # Save the modified HTML
    with open(file_path, "w", encoding="utf-8") as file:
        print('saved youuuuuuuu')
        file.write(soup.prettify())

    updated_url = f"http://127.0.0.1:8000/preview/{session_id}"
    return jsonify({"updated_url": updated_url})


@app.route("/difference_report", methods=["POST"])
def get_difference_report():
    data = request.get_json()
    session_id = data.get('session_id')
    
    if not session_id:
        return jsonify({"error": "Session ID is required in the JSON body"}), 400
    
    original_soup = data.get('original_soup')
    if not original_soup:
        return jsonify({"error": "Original soup is required in the JSON body"}), 400
    new_soup = data.get('new_soup')
    
    report = difference_report(original_soup, new_soup)
    return jsonify(report)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)