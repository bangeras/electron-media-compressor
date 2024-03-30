## Create folder electron-media-compressor using terminal and launch VSCode
    $ npm init
    
    Dependencies:
    $ npm i react-toastify react react-dom imagemin imagemin-pngquant imagemin-jpegtran imagemin-gifsicle imagemin-svgo fluent-ffmpeg @ffmpeg-installer/ffmpeg react-loading-icons electron-log

    Dev dependencies:
    $ npm i --save-dev electron @electron-forge/cli @electron-forge/plugin-fuses webpack webpack-cli @babel/core babel-loader @babel/preset-env @babel/preset-react style-loader css-loader html-webpack-plugin electron-hot-reload url-loader 

    Setup ElectronForge:
    $ npm exec --package=@electron-forge/cli -c "electron-forge import"

## Run the app
    App              : npm start                # electron-forge start
    main process     : npm run start:main       # "start:main": "electron ."
    renderer process : npm run start:renderer   # "start:renderer": "webpack --config ./renderer/webpack.config.js --watch"
    Package          : npm run make             # electron-forge make
    (In Dev, Start the renderer process too for supplementing hot reloads of any renderer codebase changes)
    
## Project structure   
    Two high-level folders: main(main process) and renderer(renderer process)	
    main:   Node JS implementation using ESM module system	
        main.mjs     : Entry point to the main process of the Electron app
        ipc         : ipcMain implementations
        modules     : library functions used by the main process api handlers
        preload     : module preloaded into the renderer by the main process. 
                      Used to securely expose privileged APIs into the renderer process
        channels.mjs: IPC channel name constants
    renderer:   React App (Can use any Frontend framework)
        index.html  : SPA
        index.mjs    : Entry js
        App.mjs      : application js for all components
        components  : Contains all sub-components
        webpack.config.js: module bundler primarily used in React apps to bundle JavaScript, CSS,       
                      and other assets into optimized bundles for deployment 
        dist        : output of webpack (main.bundle.js)


## Flow
    Main process spawns the Render process (via main.mjs)
    SPA actions trigger the electronApis (sandboxed in the renderer process via the preload.mjs)
        await window.electronApis.notificationApi.sendNotification("Notification from renderer(react app)") 
    Using the IPC protocol (via ipcRenderer) the native function API  available on the main process is invoked 
        ipcRenderer.send(channels.NOTIFY, message);
    The main process API handlers (via the ipcMain) are triggered to execute the desired functions