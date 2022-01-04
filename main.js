
const { app, BrowserWindow, ipcMain, Menu } = require("electron")
const url = require('url')
const path = require("path")

  
let mainWindow;



let menuAplicacionPlantilla = [
    {
        label: 'Info',
        submenu: [
            {
                label: 'Acerca de',
                accelerator: process.platform == 'darwin' ? 'Comand+J' : 'Ctrl+J',
                click: () => {
                  mainWindow.loadFile("acerca-de.html");
                }
            }
        ]
    },
    {
        label: 'Show/Hide Dev Tools',
        accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        label: 'Main',
        accelerator: process.platform == 'darwin' ? 'Comand+K' : 'Ctrl+K',
        click: () => {
          mainWindow.loadFile("index.html");
        }
      },
      {
        label: 'Registros',
        accelerator: process.platform == 'darwin' ? 'Comand+L ' : 'Ctrl+L',
        click: () => {
          mainWindow.loadFile("registros.html");
        }
      }
];

  
// Function to create independent window or main window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 650,
    minWidth: 825,
    icon: __dirname + 'oneselect.ico',
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be'
        },
    // Make sure to add webPreferences with
    // nodeIntegration and contextIsolation
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
  });
  
  // Main window loads index.html file
  mainWindow.loadFile("index.html");
  let menu = Menu.buildFromTemplate(menuAplicacionPlantilla);
  mainWindow.setMenu(menu);
  
  // To maximize the window
  mainWindow.maximize();
  mainWindow.show();
}




app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
  
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


