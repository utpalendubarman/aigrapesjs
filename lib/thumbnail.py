import os
import time
import base64
from PIL import Image
from io import BytesIO
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def html_to_thumbnail(html_content, output_path='thumbnail.png', thumbnail_size=(300, 200)):
    # Create a temporary HTML file
    with open("temp.html", "w", encoding="utf-8") as f:
        f.write(html_content)

    # Set up headless Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1280,1024")

    # Start WebDriver
    driver = webdriver.Chrome(options=chrome_options)
    driver.get("file://" + os.path.abspath("temp.html"))

    time.sleep(1)  # Wait for rendering
    driver.save_screenshot("screenshot.png")
    driver.quit()

    # Create thumbnail
    with Image.open("screenshot.png") as img:
        img.thumbnail(thumbnail_size)
        img.save(output_path)

    # Clean up
    os.remove("temp.html")
    os.remove("screenshot.png")

    return output_path

def html_to_thumbnail_base64(html_content, thumbnail_size=(300, 200)):
    # Create a temporary HTML file
    temp_html_path = "temp.html"
    with open(temp_html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    # Set up headless Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1280,1024")

    # Start WebDriver
    driver = webdriver.Chrome(options=chrome_options)
    driver.get("file://" + os.path.abspath(temp_html_path))

    time.sleep(1)  # Wait for rendering
    screenshot_path = "screenshot.png"
    driver.save_screenshot(screenshot_path)
    driver.quit()

    # Create thumbnail and convert to base64
    with Image.open(screenshot_path) as img:
        img.thumbnail(thumbnail_size)
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        base64_image = base64.b64encode(buffer.getvalue()).decode("utf-8")

    # Clean up
    os.remove(temp_html_path)
    os.remove(screenshot_path)

    return base64_image
