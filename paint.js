// const developMode = process.env.NODE_ENV === "dev";
const clsButton = document.getElementById("cls");
const loadButton = document.getElementById("load");
const saveButton = document.getElementById("save");
const canvas = document.getElementById("draw");
const context = canvas.getContext("2d");
const {
    remote
} = require('electron');
const dataUriToBuffer = remote.require('data-uri-to-buffer');
const {
    showOpenDialog,
    showSaveDialog
} = remote.dialog;

let mousex, mousey, pmousex, pmousey, mousel, mousem, mouser;

[canvas.width, canvas.height] = [320, 240]

canvas.addEventListener("mousemove", e => {
    const rect = e.target.getBoundingClientRect();
    pmousex = mousex, pmousey = mousey;
    mousex = e.clientX - rect.left, mousey = e.clientY - rect.top;
    if (mousel) {
        context.globalCompositeOperation = "source-over";
    }else if (mouser) {
        context.globalCompositeOperation = "destination-out";
    }
    if (mousel || mouser) {
        // context.fillRect(mousex,mousey,1,1);
        context.beginPath();
        context.moveTo(pmousex, pmousey);
        context.lineTo(mousex, mousey);
        context.stroke();
    }
});
canvas.addEventListener("mousedown", e => {
    if (e.which === 1) mousel = true;
    if (e.which === 2) mousem = true;
    if (e.which === 3) mouser = true;
});
canvas.addEventListener("mouseup", e => {
    if (e.which === 1) mousel = false;
    if (e.which === 2) mousem = false;
    if (e.which === 3) mouser = false;
});
clsButton.addEventListener("click", e => {
    context.clearRect(0, 0, canvas.width, canvas.height)
})
loadButton.addEventListener("click", e => {
    const file = showOpenDialog(null, {
        properties: ["openFile"],
        filters: [{
            name: "images",
            extensions: ["png", "jpg", "bmp"]
        }]
    })
    if (!file) return;
    const image = new Image();
    image.src = file;
    image.onload = () => {
        const {
            naturalWidth,
            naturalHeight
        } = image;
        canvas.width = naturalWidth;
        canvas.height = naturalHeight;
        context.drawImage(image, 0, 0);
    }
})
saveButton.addEventListener("click", e => {
    const data = dataUriToBuffer(canvas.toDataURL());
    const file = showSaveDialog(null, {
        filters: [{
            name: "images",
            extensions: ["png"]
        }]
    });
    if (!file) return;
    require("fs").writeFile(file, data, e => {
        if (e) {
            alert(`FAILED: ${e}`);
        } else {
            alert("SUCCESS");
        }
    })
})
