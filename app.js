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
    // Get the new range slider value
    let value = rangeSlider.value;
    // Change the slider label text content
    sliderLabel.textContent = `${value} x ${value}`;
}
// Add event listeners to the range slider
rangeSlider.addEventListener('change', updateGridSize);
rangeSlider.addEventListener('change', updateSliderLabel);
rangeSlider.addEventListener('mousemove', updateSliderLabel);

function clearGrid() {
    // Select all the squares inside the grid
    const squares = document.querySelectorAll('.square');
    // Loop over them and change each one's background to the default color
    squares.forEach(square => {
        if (square.style.background === gridBgColor)
            return
        square.style.background = gridBgColor;
    })
}
// Add event listener to the clear button
clearBtn.addEventListener('click', clearGrid);

function eraser() {
    // Remove the rainbow mode event listener from the grid
    grid.removeEventListener('mousemove', setRandomColor);
    // Set the pen color to the grid bg color
    penColor = gridBgColor;
}
// Add event listener to the eraser button
eraserBtn.addEventListener('click', eraser);

function colorMode() {
    // Remove the rainbow mode event listener from the grid
    grid.removeEventListener('mousemove', setRandomColor);
    // Call the setPenToColorPicker()
    setPenToColorPicker();
}
// Add event listener to the color mode button
colorModeBtn.addEventListener('click', colorMode);

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
}
// Add event listener to the rainbow mode button
rainbowModeBtn.addEventListener('click', rainbowMode);

function setPenToColorPicker() {
    // Set the pen color to the color picker color
    penColor = document.querySelector("input#color-picker").value;
    penMode = 'color';
}
// Add event listener to the color picker
colorPicker.addEventListener('change', setPenToColorPicker);
