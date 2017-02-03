const electron = require('electron')

// Module to control application life.
const app = electron.app
const  remote = electron.remote
var globalShortcut = electron.globalShortcut;
// Module to create native browser window.

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const ipc = electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.on('did-finish-load', function(){
        mainWindow.webContents.send('ping', 'whooooooooooo');
        });


  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
 var presWindow = new BrowserWindow({
        width: 300,
        height: 300,
        show: false
    })
   presWindow.loadURL('file://' + __dirname + '/presWindow.html') //新窗口

    ipc.on('zqz-show',function() {
        try{
        presWindow.show()  
      }catch(e){
        alert(e)
         presWindow.loadURL('file://' + __dirname + '/presWindow.html') //新窗口
      }
        
    })

    ipc.on('hide-pres',function() {
        presWindow.hide()
    })

ipc.on('flash', function(event, arg) {
  console.log("1111111111")
 let win = BrowserWindow.getFocusedWindow();
        if(!win) return;
        win.reload();
});

ipc.on('asynchronous-message', function(event, arg) {
  console.log("send"+arg);  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong');
});

ipc.on('synchronous-message', function(event, arg) {
  console.log("re"+arg);  // prints "ping"
  event.returnValue = 'pong';
});
registerShortcut();
/*globalShortcut.register('ctrl+alt+j', function() {
        console.log('You fired ctrl+alt+j !!!');
    });*/
/* globalShortcut.register('ctrl+shift+1',function(){
        mainWindow.webContents.send('global-shortcut',0);
   });
   globalShortcut.register('ctrl+shift+2',function(){
        mainWindow.webContents.send('global-shortcut',1);
   });*/
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

function registerShortcut() {
    function doRegister(cmd, callback) {
        globalShortcut.register(cmd, callback);
    }

    let registed = globalShortcut.isRegistered('F12');
    if(registed) return;

    doRegister('F12', function() {
        let win = BrowserWindow.getFocusedWindow();
        if(!win) return;
        win.webContents.toggleDevTools();
        console.log("toggleDevTools F12");
    });

    doRegister('F6', function() {
        /*let win = BrowserWindow.getFocusedWindow();
        if(!win) return;
        win.webContents.toggleDevTools();
        console.log("toggleDevTools F6");*/
        let win = BrowserWindow.getFocusedWindow();
win.webContents.session.clearCache(function(){
 console.log("clearCache");
});
    });

    doRegister('F5', function() {
        let win = BrowserWindow.getFocusedWindow();
        if(!win) return;
        win.reload();
        console.log("refresh");
    });

    return;
}
//http://blog.csdn.net/qq_31411389/article/details/52067839

//http://blog.csdn.net/haoyuxingchen/article/details/51220814
 
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
/* mainWindow.on('blur', function() {
        let win = BrowserWindow.getFocusedWindow();
        if(win) return;
        globalShortcut.unregisterAll();
        console.log('blur');
    });

    mainWindow.on('focus', function() {
        registerShortcut();
        console.log('focus');
    });*/