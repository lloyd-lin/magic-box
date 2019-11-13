// only add update server if it's not being run from cli
if (require.main !== module) {
  require('update-electron-app')({
    logger: require('electron-log')
  })
}

const path = require('path')
const glob = require('glob')
const {app, BrowserWindow} = require('electron')

const debug = /--debug/.test(process.argv[2])

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.commandLine.appendSwitch('-enable-touch-events');
if (process.mas) app.setName('Electron APIs')

let mainWindow = null;
function initialize () {
  makeSingleInstance()

  // loadDemos()

  function createWindow () {
    const windowOptions = {
      width: 800,
      minWidth: 375,
      height: 1120,
      title: app.getName(),
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true,
        webSecurity: false,
        allowRunningInsecureContent: true,
        preload: path.join(__dirname, 'preload.js'),
      }
    }
    if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    } 
    
    mainWindow = new BrowserWindow(windowOptions)
    global.magicWindow = mainWindow;
    // This is where the magic happens!
    try {
      mainWindow.webContents.debugger.attach('1.2')
    } catch (err) {
      console.log('Debugger attach failed: ', err)
    }

    // This is where the magic happens!
    mainWindow.webContents.debugger.sendCommand('Emulation.setTouchEmulationEnabled', {
      enabled: true,
      configuration: 'mobile',
    }).catch(err => {
      console.log(err)
    });
    mainWindow.webContents.debugger.sendCommand('Emulation.setEmitTouchEventsForMouse', {
      enabled: true,
    }).catch(err => {
      console.log(err)
    });
    mainWindow.loadURL(path.join('file://', __dirname, '/views/homepage.html'))

    // Launch fullscreen with DevTools open, usage: npm run dev
    if (debug) {
      mainWindow.webContents.openDevTools()
      mainWindow.maximize()
      require('devtron').install()
    }

    mainWindow.on('closed', () => {
      mainWindow = null
      console.log("closed11")
    })

    mainWindow.on('reload', () => {
      console.log("reload11")
    })
  }

  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Require each JS file in the main-process dir
function loadDemos () {
  const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
  files.forEach((file) => { require(file) })
}

initialize()
