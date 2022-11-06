const canvas = document.getElementById("myCanvas");

// context is the area where we will draw,
const context = canvas.getContext("2d");


// stroke style, the outline of the shape
context.strokeStyle = "red";
context.fillStyle = "blue";


// fill the rectangle with coordinates (x1, y1, x2, y2)
context.fillRect(10, 10, 100, 100);
context.strokeRect(10, 10, 100, 100);

// another rectangle with image
const img = new Image();
img.src = "./randomImg.jpg";

// img with an event onload
img.onload = function() {
    // createPattern deals with img
    // first parameter: image source
    // second parameter: value like background-image-repeat
    const pattern = context.createPattern(img, "no-repeat");
    context.fillStyle = pattern;
    context.fillRect(150, 10, 250, 250);
    context.strokeRect(150, 10, 250, 250);
}


// another rectangle with gradient
// x0, y0: coordinate of the linear gradient, x1, y1 : end of the gradient
const gradient = context.createLinearGradient(10, 150, 100, 250);
gradient.addColorStop(0, "pink"); //offset 0 to the start of the gradient
gradient.addColorStop(1, "purple"); // offset 1 to the end of it
context.fillStyle = gradient;
context.fillRect(10, 150, 100, 250);
context.strokeRect(10, 150, 100, 250);

// drawing another shape
// first begin a path
// arc(x, y, radius, starting angle, end angle, then anticlockwise)
context.beginPath();
context.arc(200, 350, 50, 0, Math.PI*2, true);
context.closePath();
context.strokeStyle = "red";
context.fillStyle = "blue";
context.lineWidth = 3;
context.fill();
context.stroke();

//save the drawings
function saveDrawing() {
    const canvas5 = document.getElementById("myCanvas");
    const dataURL = canvas5.toDataURL();
    // not allowed to navigate top frame to Data URL;
    window.open(dataURL);
}

const button = document.getElementById("saveButton");
button.addEventListener("click", saveDrawing, false);
