// Select DOM Elements
const rangeSlider = document.querySelector("input#slider");
const sliderLabel = document.querySelector(".range-slider label");
const grid = document.querySelector('.grid');
const clearBtn = document.querySelector(".clear");
const eraserBtn = document.querySelector(".eraser");
const ranModeBtn = document.querySelector(".rainbow-mode");
const colorModeBtn = document.querySelector(".color-mode");
const colorPicker = document.querySelector("input#color-picker");

// Extract values from DOM elements
let gridDimension = parseInt(rangeSlider.value);
let penColor = colorPicker.value;
const gridSize = parseInt(getComputedStyle(grid).width);

// Grid layout generator function
function generateGridLayout(gridDimension) {
    // Calculate the square size based on the grid size
    let squareSize = gridSize / gridDimension;
    // Create the rows div
    let rows = document.createElement('div');
    rows.classList.add('rows');
    // Style the rows
    rows.style.display = 'flex';
    rows.style.flexDirection = 'column';
    rows.style.gap = '1px';
    rows.style.height = '100%';
    // A for loop to generate the grid
    for (let i = 0; i < gridDimension; i++) {
        // Create the row div
        let row = document.createElement('div');
        row.classList.add(`row-${i+1}`);
        // Style the row
        row.style.display = 'flex';
        row.style.flexGrow = '1';
        row.style.gap = '1px';
        // A for loop to generate squares for each row
        for (let j = 0; j < gridDimension; j++) {
            // Create the square div
            let square = document.createElement('div');
            square.classList.add('square');
            // Style the square
            square.style.width = squareSize + 'px';
            square.style.height = '100%';
            square.style.background = '#D8D8D8';
            // Append the square to the row
            row.appendChild(square);
        }
        // Append the generated row to the list of rows
        rows.appendChild(row);
    }
    // Append the rows list to the grid
    grid.appendChild(rows);
}

generateGridLayout(rangeSlider.value);

function updateGridSize() {
    // Remove the old rows
    const gridRows = document.querySelector('.rows');
    gridRows.remove();
    // Get the range slider new value
    let value = rangeSlider.value;
    // Generate the grid's layout with the new value
    generateGridLayout(value);
}

function updateSliderLabel() {
    // Get the new range slider value
    let value = rangeSlider.value;
    // Change the slider label text content
    sliderLabel.textContent = `${value} x ${value}`;
}

// Add event listeners to the range slider
rangeSlider.addEventListener('change', updateGridSize);
rangeSlider.addEventListener('mousemove', updateSliderLabel);
