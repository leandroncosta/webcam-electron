const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 360,
    height: 400,
    frame: false,
    transparent: true,
    center: true,
    resizable: false,
    alwaysOnTop: true,
  })
  win.loadFile('index.html')


}

app.whenReady()
  .then(() => createWindow())

app.on('window-all-closed', () => {
  if (process.platform !== "darwin") app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

