// Select DOM Elements
const rangeSlider = document.querySelector("input#slider");
const sliderLabel = document.querySelector(".range-slider label");
const grid = document.querySelector('.grid');
const clearBtn = document.querySelector(".clear");
const eraserBtn = document.querySelector(".eraser");
const rainbowModeBtn = document.querySelector(".rainbow-mode");
const colorModeBtn = document.querySelector(".color-mode");
const colorPicker = document.querySelector("input#color-picker");

// Extract values from DOM elements
let gridDimension = parseInt(rangeSlider.value);
let penColor = colorPicker.value;
const gridSize = parseInt(getComputedStyle(grid).width);

// Colors
let gridBgColor = '#D8D8D8';

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
            square.style.background = gridBgColor;
            // Add mouse over event listener
            square.addEventListener('mouseover', e => e.target.style.background = penColor);
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
    let value = rangeSlider.value;
    sliderLabel.textContent = `${value} x ${value}`;
}
rangeSlider.addEventListener('change', updateGridSize);
rangeSlider.addEventListener('change', updateSliderLabel);
rangeSlider.addEventListener('mousemove', updateSliderLabel);

function clearGrid() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        if (square.style.background === gridBgColor)
            return
        square.style.background = gridBgColor;
    })
}
clearBtn.addEventListener('click', clearGrid);

function eraser() {
    removeGridEventListener();
    penColor = gridBgColor;
    deselectAllBtns();
    btnSelected(eraserBtn);
}
eraserBtn.addEventListener('click', eraser);

function colorMode() {
    removeGridEventListener();
    setPenToColorPicker();
    deselectAllBtns();
    btnSelected(colorModeBtn);
}
colorModeBtn.addEventListener('click', colorMode);

function setPenToColorPicker() {
    penColor = document.querySelector("input#color-picker").value;
    penMode = 'color';
    removeGridEventListener();
    deselectAllBtns();
    btnSelected(colorModeBtn);
}
colorPicker.addEventListener('change', setPenToColorPicker);

function getRandomColor() {
    // Define the max hex value
    const maxHex = 0xFFFFFF;
    // Generate a random hex number
    let randNum = Math.floor(Math.random() * maxHex).toString(16);
    // Pad zeroes to the start in case the color's length is less than 6
    let randColor = randNum.padStart(6, 0);
    // Return the random color
    return `#${randColor.toUpperCase()}`;
}

// Set the pen color to a random color when the mouse start moving over the grid
let setRandomColor = () => penColor = getRandomColor();
function rainbowMode() {
    grid.addEventListener('mousemove', setRandomColor);
    deselectAllBtns();
    btnSelected(rainbowModeBtn);
}
rainbowModeBtn.addEventListener('click', rainbowMode);

function deselectAllBtns() {
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => btn.classList.remove('btn-selected'));
}

const btnSelected = btn => btn.classList.add('btn-selected');

const removeGridEventListener = () => grid.removeEventListener('mousemove', setRandomColor);
