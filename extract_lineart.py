from PIL import Image
import os

input_dir = 'public/anime_states'

print("Using Mathematical Line-Art Extraction (Zero quality loss, zero AI cutoffs)")

for i in range(1, 5):
    img_path = f"{input_dir}/state_{i}.png"
    
    if not os.path.exists(img_path):
        print(f"Skipping {img_path} - not found.")
        continue
        
    print(f"Processing {img_path}...")
    
    # Open the image and convert to grayscale
    img = Image.open(img_path).convert("L")
    
    # Invert the grayscale image (White becomes Black, Black becomes White)
    # This inverted image will serve directly as our Alpha (opacity) channel
    from PIL import ImageOps
    alpha_channel = ImageOps.invert(img)
    
    # Create a pure black canvas of the exact same size
    black_canvas = Image.new("RGBA", img.size, (0, 0, 0, 255))
    
    # Replace the alpha channel of the black canvas with our inverted image
    black_canvas.putalpha(alpha_channel)
    
    # Save the result, overwriting the original
    black_canvas.save(img_path, "PNG")
    print(f"Successfully extracted {img_path}")

print("Done! Transparency is now pixel-perfect.")
