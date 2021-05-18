const electron = require("electron");
const url = require("url");
const path = require("path");
const template  =  require("./menu")

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Listen for the app to be ready

app.on("ready", function () {
  mainWindow = new BrowserWindow({});
  mainWindow.maximize();
  // Load html into window
  mainWindow.loadURL(
      url.format({
        pathname: "dojo.galileoxp.com",
        protocol: "https:",
        slashes: true,
      })
  ) .then();
  const mainMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(mainMenu);
});