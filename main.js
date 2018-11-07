const electron = require('electron');
const {
    app,
    BrowserWindow
} = electron;

require('electron-reload')(__dirname);

app.on('ready', async () => {
    let win = new BrowserWindow({
        width: 816,
        height: 624
    })
    win.loadURL(`file://${__dirname}/index.html`)
    win.openDevTools();
})
