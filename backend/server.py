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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)