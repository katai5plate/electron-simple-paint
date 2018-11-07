const clsButton = document.getElementById("cls");
const canvas = document.getElementById("draw");
const context = canvas.getContext("2d");

let mousex, mousey, pmousex, pmousey, mousel;

canvas.addEventListener("mousemove", function (e) {
    const rect = e.target.getBoundingClientRect();
    pmousex = mousex, pmousey = mousey;
    mousex = e.clientX - rect.left, mousey = e.clientY - rect.top;
    if (mousel) {
        // context.fillRect(mousex,mousey,1,1);
        context.beginPath();
        context.moveTo(pmousex, pmousey);
        context.lineTo(mousex, mousey);
        context.stroke();
    }
});
canvas.addEventListener("mousedown", e => {
    mousel = true;
});
canvas.addEventListener("mouseup", e => {
    mousel = false;
});
clsButton.addEventListener("click", e => {
    context.clearRect(0, 0, canvas.width, canvas.height)
})
