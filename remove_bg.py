from rembg import remove
from PIL import Image, ImageEnhance
import os

input_dir = 'public/anime_states'

for i in range(1, 5):
    img_path = f"{input_dir}/state_{i}.png"
    out_path = f"{input_dir}/state_{i}.png"
    print(f"Processing {img_path}...")
    
    with open(img_path, 'rb') as i_file:
        input_data = i_file.read()
    
    output_data = remove(input_data)
    
    temp_path = f"{input_dir}/temp.png"
    with open(temp_path, 'wb') as o_file:
        o_file.write(output_data)
        
    img = Image.open(temp_path)
    
    # Fix lightness of image 2
    if i == 2:
        print("Applying brightness/contrast fix to state 2...")
        enhancer = ImageEnhance.Brightness(img)
        img = enhancer.enhance(0.70)  # Darken by 30% to match
        enhancer2 = ImageEnhance.Contrast(img)
        img = enhancer2.enhance(1.15)
        
    img.save(out_path)
    os.remove(temp_path)

print("Done processing all images.")
