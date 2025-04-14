from template import template
from lib.thumbnail import html_to_thumbnail,html_to_thumbnail_base64

image=html_to_thumbnail(template, output_path='thumbnail.png', thumbnail_size=(300, 200))
base=html_to_thumbnail_base64(template, thumbnail_size=(300, 200))
print(base)