const remote = require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

//渲染进程
const ipc = require('electron').ipcRenderer;

var menu = new Menu.buildFromTemplate([
    {
        label: '菜单',
        submenu: [
            {
                label: '打开新窗口',
                click: function(){
                    ipc.send('zqz-show') //注册的指令。send到主进程index.js中。
                }
            }
        ]
    }
])

  ipc.on('ping', function(event, message){
                    alert(message)
        });

console.log(ipc.sendSync('synchronous-message', 'ping')); // prints "pong"

ipc.on('asynchronous-reply', function(event, arg) {
  console.log("xx"+arg); // prints "pong"
});
ipc.send('asynchronous-message', 'ping');

Menu.setApplicationMenu(menu);


var soundButtons = document.querySelector('#button-sound');
soundButtons.addEventListener('click',function(){
   //ipcRenderer.send('open-settings-window');//向主进程main.js发送请求
   console.log("xxxxxxxxxxxxxxxxxxxx");


var win = remote.getCurrentWindow();
win.webContents.session.clearCache(function(){
 ipc.send('flash');
});
});//