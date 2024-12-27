const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const clearBtn = document.getElementById('clear');
const eraserBtn = document.getElementById('eraser');
const colorInput = document.getElementById('color');
const sizeDisplay = document.getElementById('size');

let size = 8;
let color = 'black';
let isDrawing = false;
let x, y;
let isErasing = false;

// Set the initial background color to white
canvas.width = 800; // Set the canvas width
canvas.height = 600; // Set the canvas height
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with white

// Draw circle
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = isErasing ? 'white' : color;
  ctx.fill();
}

// Draw line
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = isErasing ? 'white' : color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

// Event listeners
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

increaseBtn.addEventListener('click', () => {
  size = Math.min(size + 4, 64);
  updateSizeDisplay();
});

decreaseBtn.addEventListener('click', () => {
  size = Math.max(size - 4, 4);
  updateSizeDisplay();
});

colorInput.addEventListener('change', (e) => {
  color = e.target.value;
  isErasing = false; // Exit eraser mode
});

eraserBtn.addEventListener('click', () => {
  isErasing = true;
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white'; // Ensure the canvas background stays white after clearing
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function updateSizeDisplay() {
  sizeDisplay.textContent = size;
}
