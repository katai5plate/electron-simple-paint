const developMode = process.env.NODE_ENV === "dev";
const electron = require('electron');
const {
    app,
    BrowserWindow
} = electron;

if (developMode) require('electron-reload')(__dirname);

app.on('ready', async () => {
    let win = new BrowserWindow({
        width: 816,
        height: 624
    })
    win.loadURL(`file://${__dirname}/index.html`)
    if (developMode) win.openDevTools();
})
app.on('window-all-closed', function () {
    app.quit();
});
