let grid = [];
let start = null;
let end = null;
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let clickCount = 0;

document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const img = new Image();
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        grid = processImageToGrid(imageData, img.width, img.height);
        clickCount = 0;
        start = null;
        end = null;
    };
    img.src = URL.createObjectURL(file);
});

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) * grid[0].length / canvas.width);
    const y = Math.floor((event.clientY - rect.top) * grid.length / canvas.height);
    
    if (grid[y][x] === 1) return;
    
    if (clickCount === 0) {
        start = [y, x];
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, 3, 3);
        clickCount++;
    } else if (clickCount === 1) {
        end = [y, x];
        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, 3, 3);
        clickCount++;
    }
});

function processImageToGrid(imageData, width, height) {
    let grid = [];
    let data = imageData.data;
    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
            let i = (y * width + x) * 4;
            let grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
            row.push(grayscale < 128 ? 1 : 0);
        }
        grid.push(row);
    }
    return grid;
}

function solveMaze() {
    if (!grid.length || !start || !end) {
        document.getElementById('result').innerText = 'Please select start and end points first!';
        return;
    }
    let path = aStar(grid, start, end);
    if (path) {
        drawSolution(path);
        document.getElementById('result').innerText = 'Maze solved!';
    } else {
        document.getElementById('result').innerText = 'No solution found!';
    }
}

function aStar(grid, start, end) {
    let rows = grid.length;
    let cols = grid[0].length;
    let openSet = [start];
    let cameFrom = {};
    let gScore = Array(rows).fill().map(() => Array(cols).fill(Infinity));
    let fScore = Array(rows).fill().map(() => Array(cols).fill(Infinity));
    
    gScore[start[0]][start[1]] = 0;
    fScore[start[0]][start[1]] = heuristic(start, end);
    
    while (openSet.length > 0) {
        openSet.sort((a, b) => fScore[a[0]][a[1]] - fScore[b[0]][b[1]]);
        let current = openSet.shift();
        
        if (current[0] === end[0] && current[1] === end[1]) return reconstructPath(cameFrom, current);
        
        for (let [dx, dy] of [[0,1], [1,0], [0,-1], [-1,0]]) {
            let neighbor = [current[0] + dx, current[1] + dy];
            if (neighbor[0] < 0 || neighbor[0] >= rows || neighbor[1] < 0 || neighbor[1] >= cols || grid[neighbor[0]][neighbor[1]] === 1) continue;
            let tentative_gScore = gScore[current[0]][current[1]] + 1;
            
            if (tentative_gScore < gScore[neighbor[0]][neighbor[1]]) {
                cameFrom[`${neighbor[0]},${neighbor[1]}`] = current;
                gScore[neighbor[0]][neighbor[1]] = tentative_gScore;
                fScore[neighbor[0]][neighbor[1]] = tentative_gScore + heuristic(neighbor, end);
                if (!openSet.some(n => n[0] === neighbor[0] && n[1] === neighbor[1])) openSet.push(neighbor);
            }
        }
    }
    return null;
}

function heuristic(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function reconstructPath(cameFrom, current) {
    let path = [];
    let key = `${current[0]},${current[1]}`;
    while (key in cameFrom) {
        path.push(current);
        current = cameFrom[key];
        key = `${current[0]},${current[1]}`;
    }
    path.push(current);
    path.reverse();
    return path;
}

function drawSolution(path) {
    ctx.fillStyle = 'red';
    for (let [y, x] of path) {
        ctx.fillRect(x, y, 2, 2);
    }
}