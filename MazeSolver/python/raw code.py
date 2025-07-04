import heapq
import time
import cv2
import numpy as np

def heuristic(a, b):
    """Calculate the Manhattan distance as a heuristic."""
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def get_neighbors(maze, node):
    """Return valid neighbors of a given node (row, col)."""
    rows, cols = len(maze), len(maze[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # Up, Down, Left, Right
    neighbors = []

    for dr, dc in directions:
        r, c = node[0] + dr, node[1] + dc
        if 0 <= r < rows and 0 <= c < cols and maze[r][c] == 0:  # Check bounds & walkable
            neighbors.append((r, c))

    return neighbors

def visualize(maze, path, open_set, closed_set,start,goal):
    """Display the current state of the maze search process."""
    display_maze = [row[:] for row in maze]  # Copy maze to avoid modifying the original

    for r, c in open_set:
        display_maze[r][c] = 'O'  # Open set nodes
    for r, c in closed_set:
        display_maze[r][c] = '.'  # Explored nodes
    for r, c in path:
        display_maze[r][c] = '*'  # Final shortest path

    display_maze[start[0]][start[1]] = 'S'
    display_maze[goal[0]][goal[1]] = 'G'

    for row in display_maze:
        print(" ".join(str(cell) for cell in row))
    print("\n")
    time.sleep(0.3)

def a_star(maze, start, goal):
    """A* algorithm to find the shortest path in a maze."""
    open_set = []
    heapq.heappush(open_set, (0, start))  # (priority, node)

    came_from = {}  # Track path
    g_score = {start: 0}  # Cost from start to this node
    f_score = {start: heuristic(start, goal)}  # Estimated total cost

    open_nodes = set([start])
    closed_set = set()

    while open_set:
        _, current = heapq.heappop(open_set)
        open_nodes.remove(current)

        if current == goal:
            # Reconstruct shortest path
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            path.reverse()

            #visualize(maze, path, open_nodes, closed_set)  # Final visualization
            return path

        closed_set.add(current)

        for neighbor in get_neighbors(maze, current):
            if neighbor in closed_set:
                continue

            tentative_g_score = g_score[current] + 1  # Assume uniform cost

            if neighbor not in open_nodes or tentative_g_score < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = tentative_g_score + heuristic(neighbor, goal)

                if neighbor not in open_nodes:
                    heapq.heappush(open_set, (f_score[neighbor], neighbor))
                    open_nodes.add(neighbor)

        visualize(maze, [], open_nodes, closed_set,start,goal)  # Visualize the searching process

    return None  # No path found

# Example Maze (0 = Open Path, 1 = Wall)
'''maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0]
]

start = (0, 0)
goal = (4, 4)

path = a_star(maze, start, goal)

if path:
    print("Shortest Path:", path)
else:
    print("No path found!")'''



def process_maze(image_path):
    # Load the image in grayscale
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Convert to binary (0 for path, 1 for walls)
    _, binary_maze = cv2.threshold(img, 127, 1, cv2.THRESH_BINARY_INV)

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

    return binary_maze.tolist(), entry, exit

# Example usage
image_path = "maze.png"  # Change to the correct file path
binary_maze, entry, exit = process_maze(image_path)

print("Binary Maze Array:", binary_maze)
print("Entry Point:", entry)
print("Exit Point:", exit)
a_star(binary_maze, entry, exit)
'''
if path:
    print("Shortest Path:", path)
else:
    print("No path found!")'''