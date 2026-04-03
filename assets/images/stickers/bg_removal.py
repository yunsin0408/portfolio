# pip install rembg pillow
from rembg import remove
from PIL import Image
import io

input_path = 'assets/images/stickers/plane.png'
output_path = 'assets/images/stickers/clean_plane.png'

with open(input_path, 'rb') as i:
    input_image = i.read()
    output_image = remove(input_image)
    with open(output_path, 'wb') as o:
        o.write(output_image)

print("Background removed! sticker is now a transparent PNG.")