
createPage();

function onHover() {
   this.style.backgroundColor = randomColor();
}

function randomColor() {
	const red = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	return `rgb(${red}, ${green}, ${blue})`;
}

function promptGrid() {
   let size = prompt('Grid Size:', '16');
	createGrid(size);
}


function createPage() {
	const options = document.createElement("div");
	options.classList.add("options");
	const button = createGridSizeButton();
	options.appendChild(button);
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

function createGrid(size) {
	const container = document.querySelector(".container");

	// Remove old grid
	while (container.firstChild) {
		container.firstChild.remove();
	}

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
