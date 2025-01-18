from bs4 import BeautifulSoup

def manage_img_alt_tags(html):
    # Parse the HTML content
    soup = BeautifulSoup(html, 'html.parser')
    
    # Find all images without alt attributes
    images = soup.find_all("img", alt=False)
    for img in images:
        img['alt'] = "No description provided"
    
    # Return the modified HTML as a string
    return str(soup)

# Example HTML string
html = '''
<html>
<head><title>Test Page</title></head>
<body>
    <img src="image1.jpg">
    <img src="image2.jpg" alt="Existing description">
    <img src="image3.jpg">
</body>
</html>
'''

# Use the function and print the updated HTML
updated_html = manage_img_alt_tags(html)
print(updated_html)
