createPage();
let shouldShade = true;

function onHover() {
   if (shouldShade) {
   	shade(this);
   } else {
   	randomColor(this);
   }
}

function shadeRandomColorToggle() {
	shouldShade = !shouldShade;
}

function shade(box) {
	const shadeDiff = 10;
   let num = box.style.filter.match(/\d+/);
   if (num === null) {
   	num = 100;
   } 
   box.style.filter = `brightness(${num - shadeDiff}%)`;
   
}

function randomColor(box) {
	const red = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	box.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function promptGrid() {
   const currentSize = document.querySelector(".row").childElementCount;
   let size = Number(prompt('Grid Size:', currentSize));
   console.log(size);
   // Don't create a grid unless size was declared
   if (Number.isNaN(size) || size < 1) 
   	return;

	createGrid(size);
}


function createPage() {
	const options = document.createElement("div");
	options.classList.add("options");
	options.appendChild(createGridSizeButton());
	options.appendChild(createClearGridButton());
	options.appendChild(createToggleShadeRandomColorButton());
	document.body.appendChild(options);
	const container = document.createElement("div");
	container.classList.add("container");
	document.body.appendChild(container);
	createGrid(16);
}

function createGridSizeButton() {
	const button = document.createElement("button");
	button.textContent = "Create New Grid";
	button.addEventListener('click', promptGrid);
	return button;
}

function createClearGridButton() {
	const button = document.createElement("button");
	button.textContent = "Clear Grid";
	button.addEventListener('click', clearGrid);
	return button;
}

function createToggleShadeRandomColorButton() {
	const button = document.createElement("button");
	button.textContent = "Toggle Shade/Random Color";
	button.addEventListener('click', shadeRandomColorToggle);
	return button;
}

function createGrid(size) {
	const container = document.querySelector(".container");

	// Remove old grid
	while (container.firstChild) {
		container.firstChild.remove();
	}

	if (size > 100) size = 100; // Cap size to 100x100

	// Create new grid
	for (let i = 0; i < size; i++) {
   	const row = document.createElement("div");
   	row.classList.add("row");
   	for (let j = 0; j < size; j++) {
      	const box = document.createElement("div");
      	box.classList.add("box");
      	box.addEventListener("mouseover", onHover);
      	row.appendChild(box);
   	}
		container.appendChild(row);
	}
}

function clearGrid() {
	const boxes = document.querySelectorAll('.box');
	boxes.forEach(box => {
		box.style.backgroundColor = "white";
		box.style.filter = "brightness(100%)";
	});
}
