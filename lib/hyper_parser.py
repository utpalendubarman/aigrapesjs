import re
import webcolors


def extract_colors_from_css(css):
    pattern = r'(rgb[a]?\([^)]+\)|#[0-9a-fA-F]{3,6}\b|\b(?:white|black|red|green|blue|gray|grey|yellow|orange|purple|pink|brown|cyan|magenta)\b)'
    matches = re.findall(pattern, css)
    unique_colors = list(set(matches)) 
    return unique_colors

def extract_images_from_hypertext(hypertext):
    css_images = re.findall(r'url\(["\']?(.*?)["\']?\)', hypertext)
    html_images = re.findall(r'<img[^>]+src=["\'](.*?)["\']', hypertext)
    all_images = list(set(css_images + html_images))
    return all_images

def extract_images_from_html(html):
    html_images = re.findall(r'<img[^>]+src=["\'](.*?)["\']', html)
    all_images = list(set(html_images))
    return all_images

def extract_images_from_css(css):
    css_images = re.findall(r'url\(["\']?(.*?)["\']?\)', css)
    all_images = list(set(css_images))
    return all_images

def rgb_string_to_tuple(rgb_str):
    match = re.match(r'rgb\((\d+),\s*(\d+),\s*(\d+)\)', rgb_str)
    if match:
        return tuple(map(int, match.groups()))
    return None

def closest_color_name(requested_rgb):
    try:
        return webcolors.rgb_to_name(requested_rgb)
    except ValueError:
        # Manually calculate closest match
        min_dist = float('inf')
        closest_name = ''
        for name, hex_val in webcolors.CSS3_NAMES_TO_HEX.items():
            r, g, b = webcolors.hex_to_rgb(hex_val)
            dist = ((r - requested_rgb[0]) ** 2 +
                    (g - requested_rgb[1]) ** 2 +
                    (b - requested_rgb[2]) ** 2) ** 0.5
            if dist < min_dist:
                min_dist = dist
                closest_name = name
        return closest_name
