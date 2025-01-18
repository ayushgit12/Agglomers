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

def scrapedata(url, session_id):
    webpage = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(webpage.content, "html.parser")
    
    # Ensure the previews folder exists
    preview_dir = "previews"
    os.makedirs(preview_dir, exist_ok=True)
    
    # Save the HTML file
    file_path = os.path.join(preview_dir, f"{session_id}.html")
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(soup.prettify())
    
    return file_path