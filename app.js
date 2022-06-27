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
let gridSize = parseInt(getComputedStyle(grid).width);
