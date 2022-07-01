const container = document.createElement("div");
container.classList.add("container");
const button = document.createElement("button");
button.textContent = "Create New Grid";
button.addEventListener('click', createGrid);
document.body.appendChild(button);
for (let i = 0; i < 16; i++) {
   const row = document.createElement("div");
   row.classList.add("row");

   for (let j = 0; j < 16; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.addEventListener("mouseover", onHover);
      row.appendChild(box);
   }
   container.appendChild(row);
}
document.body.appendChild(container);

function onHover() {
   this.style.backgroundColor = "red";
}


function createGrid() {
   let size = prompt('Grid Size:', '16');
   console.log(size);
}


