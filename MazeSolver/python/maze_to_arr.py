'''import heapq
import time
import cv2
import numpy as np

def process_maze(image_path):
    # Load the image in grayscale
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Convert to binary (0 for path, 1 for walls)
    _, binary_maze = cv2.threshold(img, 127, 1, cv2.THRESH_BINARY_INV)
    # Define a small kernel
    kernel = np.ones((3, 3), np.uint8)

    # Erode to thin the walls
    binary_maze = cv2.erode(binary_maze, kernel, iterations=1)
    # Identify entry and exit points (openings on the boundary)
    height, width = binary_maze.shape
    entry, exit = None, None

    # Check the first and last row for an entry/exit point
    for x in range(width):
        if binary_maze[0, x] == 0:   # Entry at the top boundary
            entry = (0, x)
            break
    for x in range(width):
        if binary_maze[height-1, x] == 0:  # Exit at the bottom boundary
            exit = (height-1, x)
            break

    # Check the first and last column for an entry/exit point
    for y in range(height):
        if binary_maze[y, 0] == 0 and entry is None:  # Entry at left boundary
            entry = (y, 0)
            break
    for y in range(height):
        if binary_maze[y, width-1] == 0 and exit is None:  # Exit at right boundary
            exit = (y, width-1)
            break
    print(binary_maze[0])
    return binary_maze.tolist(), entry, exit

process_maze('maze1.jpg')'''
import cv2
import numpy as np
from pdf2image import convert_from_path
from skimage.morphology import skeletonize

def process_maze_from_pdf(pdf_path):
    # Step 1: Convert PDF to Image
    images = convert_from_path(pdf_path)
    if not images:
        raise ValueError("No images found in the PDF.")
    
    # Convert the first page to an OpenCV image
    img = np.array(images[0])  # Convert PIL image to NumPy array
    img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)  # Convert to grayscale

    # Step 2: Apply Binarization (Invert if needed)
    _, binary_img = cv2.threshold(img, 200, 255, cv2.THRESH_BINARY_INV)  # Walls = white, Paths = black

    # Step 3: Remove Text (Using Morphological Opening)
    kernel = np.ones((3, 3), np.uint8)
    binary_img = cv2.morphologyEx(binary_img, cv2.MORPH_OPEN, kernel, iterations=2)

    # Step 4: Find the Maze Area (Largest Contour)
    contours, _ = cv2.findContours(binary_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        raise ValueError("No maze detected in the PDF.")
    
    # Get the largest contour (assuming it is the maze boundary)
    maze_contour = max(contours, key=cv2.contourArea)
    x, y, w, h = cv2.boundingRect(maze_contour)
    
    # Crop to maze region
    cropped_maze = binary_img[y:y+h, x:x+w]

    # Step 5: Thin the Maze (Using Skeletonization)
    thinned_maze = skeletonize(cropped_maze > 0).astype(np.uint8)  # Convert to boolean and back to 0-1

    # Step 6: Convert to Binary Array (1 for walls, 0 for paths)
    maze_array = np.where(thinned_maze == 1, 1, 0)  # Ensure it is strictly 1 for walls and 0 for paths

    return maze_array

# Example Usage
pdf_path = "maze.pdf"
maze_array = process_maze_from_pdf(pdf_path)

# Print the resulting maze array
for row in maze_array:
    print("".join(str(cell) for cell in row))
