let COLORING_MODE = "color";
let CURRENT_COLOR = "#000000";
init();

function init() {
	const options = document.createElement("div");
	options.classList.add("options");
	options.appendChild(createButton("Create New Grid", "new-grid", promptGrid));
	options.appendChild(createButton("Clear Grid", "clear-grid", clearGrid));
	options.appendChild(
		createButton("Toggle Border", "toggle-border", toggleBorder)
	);
	options.appendChild(
		createButton("Change Color", "change-color", changeColor)
	);
	options.appendChild(
		createModeButton("Color", "color", "toggleable", "toggled")
	);
	options.appendChild(createModeButton("Shade", "shade", "toggleable"));
	options.appendChild(createModeButton("Random", "random", "toggleable"));

	document.body.appendChild(options);
	const container = document.createElement("div");
	container.classList.add("container");
	document.body.appendChild(container);
	createGrid(16);
}

function createButton(content, id, func) {
	const button = document.createElement("button");
	button.textContent = content;
	button.id = id;
	button.addEventListener("click", func);
	return button;
}

function createModeButton(content, id, ...classes) {
	const button = document.createElement("button");
	button.textContent = content;
	for (let i = 0; i < classes.length; i++) {
		button.classList.add(classes[i]);
	}
	button.id = id;
	button.addEventListener("click", toggleMode);
	return button;
}

function changeColor() {
	CURRENT_COLOR = prompt("New Color: ", CURRENT_COLOR);
	const colorButton = document.getElementById("change-color");
	colorButton.style.color = CURRENT_COLOR;
	colorButton.style.backgroundColor = CURRENT_COLOR;
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

function onHover() {
	if (COLORING_MODE === "shade") {
		shade(this);
	} else if (COLORING_MODE === "random") {
		randomColor(this);
	} else if (COLORING_MODE === "color") {
		color(this);
	}
}

function color(box) {
	box.style.backgroundColor = CURRENT_COLOR;
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
	let size = Number(prompt("Grid Size:", currentSize));
	// Don't create a grid unless size was declared
	if (Number.isNaN(size) || size < 1) return;

	createGrid(size);
}

function toggleBorder() {
	const boxes = document.querySelectorAll(".box");
	if (boxes[0].classList.contains("no-border")) {
		boxes.forEach((box) => box.classList.remove("no-border"));
	} else {
		boxes.forEach((box) => box.classList.add("no-border"));
	}
}

function toggleMode(event) {
	COLORING_MODE = event.target.id;

	const modeButtons = document.querySelectorAll(".toggleable");

	modeButtons.forEach((btn) => {
		btn.classList.remove("toggled");
	});

	document.getElementById(event.target.id).classList.add("toggled");
}

function clearGrid() {
	const boxes = document.querySelectorAll(".box");
	boxes.forEach((box) => {
		box.style.backgroundColor = "white";
		box.style.filter = "brightness(100%)";
	});
}
