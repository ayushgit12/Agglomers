from bs4 import BeautifulSoup
import pymongo
import requests
from html.parser import HTMLParser
from datetime import datetime
import asyncio
import certifi


HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}


# def scrapedata(url,session_id):
#      webpage = requests.get(url, headers=HEADERS)

#      soup = BeautifulSoup(webpage.content, "html.parser")



#      return (soup.prettify())
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

def download_resource(url, folder):
    # Get the resource name (filename) from the URL
    parsed_url = urlparse(url)
    filename = os.path.join(folder, os.path.basename(parsed_url.path))
    
    # Download and save the resource
    try:
        response = requests.get(url, headers=HEADERS)
        if response.status_code == 200:
            with open(filename, 'wb') as f:
                f.write(response.content)
        return filename
    except requests.RequestException as e:
        print(f"Failed to download {url}: {e}")
        return None

def scrapedata(url, session_id):
    # Get the HTML content
    webpage = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(webpage.content, "html.parser")
    
    # Ensure the previews folder exists
    preview_dir = "previews"
    os.makedirs(preview_dir, exist_ok=True)
    
    # Create subfolders for CSS, JS, and images
    css_dir = os.path.join(preview_dir, "css")
    js_dir = os.path.join(preview_dir, "js")
    img_dir = os.path.join(preview_dir, "images")
    os.makedirs(css_dir, exist_ok=True)
    os.makedirs(js_dir, exist_ok=True)
    os.makedirs(img_dir, exist_ok=True)
    
    # Save CSS files
    for link in soup.find_all("link", {"rel": "stylesheet"}):
        css_url = urljoin(url, link.get("href"))
        local_css_path = download_resource(css_url, css_dir)
        if local_css_path:
            link['href'] = os.path.relpath(local_css_path, preview_dir)
    
    # Save JavaScript files
    for script in soup.find_all("script", {"src": True}):
        js_url = urljoin(url, script.get("src"))
        local_js_path = download_resource(js_url, js_dir)
        if local_js_path:
            script['src'] = os.path.relpath(local_js_path, preview_dir)
    
    # Save images
    for img in soup.find_all("img", {"src": True}):
        img_url = urljoin(url, img.get("src"))
        local_img_path = download_resource(img_url, img_dir)
        if local_img_path:
            img['src'] = os.path.relpath(local_img_path, preview_dir)
    
    # Save the modified HTML file
    html_file_path = os.path.join(preview_dir, f"{session_id}.html")
    with open(html_file_path, "w", encoding="utf-8") as file:
        file.write(soup.prettify())
    
    return html_file_path