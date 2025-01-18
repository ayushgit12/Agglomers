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
    

def manage_img_alt_tags(soup):
    # Find all images without alt attributes
    images = soup.find_all("img", alt=False)
    for img in images:
        img['alt'] = "No description provided"
    print(soup)
    return soup

def manage_label_tags(soup):
    # Find all label tags
    labels = soup.find_all("label")
    for label in labels:
        # Find the nearest input element
        input_elem = label.find_next("input")
        if input_elem and input_elem.get("id"):
            # Set the 'for' attribute of the label to the ID of the input element
            label['for'] = input_elem.get("id")
    return soup

def change_font_size_for_each_element(soup):
    default_sizes = {
        "h1": 32,
        "h2": 24,
        "h3": 20,
        "h4": 16,
        "h5": 14,
        "h6": 12,
        "p": 16,
    }
    
    # Find all text elements with matching tags
    for tag, default_size in default_sizes.items():
        elements = soup.find_all(tag)
        for elem in elements:
            # Reset font size to the default value
            elem["style"] = f"font-size: {default_size}px;"
    
    return soup


# def change_font_family_for_each_element(soup):
#     # Find all text elements
#     text_elements = soup.find_all(["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "a", "li", "td", "th", "caption", "label"])
#     for elem in text_elements:
#         # Change the font family of the element
#         elem["font_family"] = "Arial, sans-serif"
#     return soup



# def get_contrast_ratio(color1, color2):
#     # Convert hex colors to RGB
#     def hex_to_rgb(hex_color):
#         hex_color = hex_color.lstrip("#")
#         return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    
#     def rgb_to_luminance(r, g, b):
#         r = r / 255
#         g = g / 255
#         b = b / 255
#         r = r if r <= 0.03928 else ((r + 0.055) / 1.055) ** 2.4
#         g = g if g <= 0.03928 else ((g + 0.055) / 1.055) ** 2.4
#         b = b if b <= 0.03928 else ((b + 0.055) / 1.055) ** 2.4
#         return 0.2126 * r + 0.7152 * g + 0.0722 * b
    
#     color1 = hex_to_rgb(color1)
#     color2 = hex_to_rgb(color2)
    
#     # Calculate the relative luminance of the colors
#     luminance1 = rgb_to_luminance(*color1)
#     luminance2 = rgb_to_luminance(*color2)
    
#     # Calculate the contrast ratio
#     if luminance1 > luminance2:
#         contrast_ratio = (luminance1 + 0.05) / (luminance2 + 0.05)
#     else:
#         contrast_ratio = (luminance2 + 0.05) / (luminance1 + 0.05)
    
#     return contrast_ratio


# def manage_contrast_between_text_and_background(soup):


#     # Find all text elements
#     text_elements = soup.find_all(["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "a", "li", "td", "th", "caption", "label"])
#     for elem in text_elements:
#         # Get the computed background color of the element
#         bg_color = elem.get("bg_color")
#         if bg_color:
#             # Check the contrast ratio between the text color and the background color
#             contrast_ratio = get_contrast_ratio(elem.get("color"), bg_color)
#             if contrast_ratio < 4.5:
#                 # Change the text color to white if the contrast ratio is too low
#                 elem["color"] = "#FFFFFF"
#     print(soup)


def scrapedata(url, session_id):
    # Get the HTML content
    webpage = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(webpage.content, "html.parser")
    # images = soup.find_all("img")
    # for img in images:
    #     # Update the 'alt' attribute to "hi"
    #     img['alt'] = "hi"
    # print(soup , "\n\n")

    
    


    soup = manage_img_alt_tags(soup)
    soup = manage_label_tags(soup)
    soup = change_font_size_for_each_element(soup)
    
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

def clear_previews():
    
    # Delete the previews folder and its contents
    try:
        preview_dir = "previews"
        for root, dirs, files in os.walk(preview_dir, topdown=False):
            for file in files:
                os.remove(os.path.join(root, file))
            for dir in dirs:
                os.rmdir(os.path.join(root, dir))
        os.rmdir(preview_dir)
    
    except FileNotFoundError:
        pass

    return "Previews cleared"




