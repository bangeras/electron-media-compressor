import { mainReloader, rendererReloader } from 'electron-hot-reload';
import { app } from 'electron';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const registerHotReload = () => {
    console.log("hot reload enabled.!",  path.join(__dirname));
    // console.log("app.getPath()=", app.getPath().then(console.log("here")))

    const mainFiles = path.join(__dirname); // watch changes on main/
    const rendererFiles =  path.join(__dirname, '../', 'renderer', 'dist'); // watch changes on renderer/dist/
    
    mainReloader(mainFiles, undefined, (error, path) => {
        console.log("Live reload initiated for main process! Error=", error);
    });
    
    rendererReloader(rendererFiles, undefined, (error, path) => {
        console.log("Live reload initiated for renderer process! Error=", error);
    });
}

