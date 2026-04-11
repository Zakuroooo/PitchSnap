from rembg import remove, new_session
from PIL import Image
import os

input_dir = 'public/anime_states'

# Using a much more accurate model to prevent cutting off the holograms/table
# 'isnet-general-use' is excellent for complex edges. 
# We also enable alpha_matting to preserve transparency around glowing elements.
session = new_session('isnet-general-use')

for i in range(1, 5):
    img_path = f"{input_dir}/state_{i}.png"
    out_path = f"{input_dir}/state_{i}.png"
    print(f"Processing {img_path} with high-precision model...")
    
    try:
        with open(img_path, 'rb') as i_file:
            input_data = i_file.read()
        
        output_data = remove(
            input_data,
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10
        )
        
        temp_path = f"{input_dir}/temp.png"
        with open(temp_path, 'wb') as o_file:
            o_file.write(output_data)
            
        img = Image.open(temp_path)
        img.save(out_path)
        os.remove(temp_path)
        print(f"Successfully processed state {i}")
        
    except Exception as e:
        print(f"Error processing state {i}: {e}")

print("Done processing all images.")
