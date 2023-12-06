import express, {Request,Response,Express} from 'express';
import path from 'path';
import Ra2ValuesPlayerDataProvider from './providers/Ra2ValuesPlayerDataProvider';
import dotenv from 'dotenv';
import cors from 'cors';
import websockets from './websockets';
import {PlayerData} from "./providers/DataProvider";
import fs from "fs";
import ejs from "ejs";
import ConfigProvider from "./config";

interface Process extends NodeJS.Process {
    pkg: any;
}
declare const process: Process;

const appDir: string = __dirname;
let clientDir: string;
let dotEnvPath: string;
if(process.pkg) {
    dotEnvPath = path.join(process.cwd(), '/.env');
    clientDir = path.join(appDir, '/../client');
}
else {
    dotEnvPath = path.join(__dirname, '../../.env');
    clientDir = path.join(__dirname, '../../dist/client');
}

dotenv.config({
    path: dotEnvPath
});

const configProvider: ConfigProvider = new ConfigProvider();
const config = configProvider.get();

const clientBasePath: string = config.client.base_path
const assetsBasePath: string = clientBasePath + '/assets'
const assetsDir: string = path.join(clientDir, '/assets');

console.log("RA2 - UI by wushaolin " + config.version);

const app: Express = express();
app.use(cors())

app.get(assetsBasePath + '/*', function(req, res) {
    if(!req.url.startsWith(assetsBasePath)) {
        return res.status(404).send('Not found');
    }
    const filepath = req.url.slice(assetsBasePath.length);
    if(!fs.existsSync(path.join(assetsDir, filepath))) {
        return res.status(404).send('Not found');
    }
    res.sendFile(path.join(assetsDir, filepath));
});

app.get([clientBasePath, clientBasePath + '/*'], function(req, res) {
    const filePath = path.join(clientDir, '/index.html');
    const fileContent = fs.readFileSync(filePath).toString()
    const html= ejs.render(fileContent, {
        hostname: config.server.hostname,
        port: config.server.port,
        base_path: clientBasePath,
    });

    res.send(
        html
    )
});

app.get('/playerdata/:color', async(req: Request, res: Response) => {
    const provider = new Ra2ValuesPlayerDataProvider(config);
    return res.json({
        'data': provider.getPlayerData(req.params.color)
    });
});

app.get('/metadata', async(req: Request, res: Response) => {
    const provider = new Ra2ValuesPlayerDataProvider(config);
    return res.json({
        'data': provider.getMetadata()
    });
});

app.get('/active-players', async(req: Request, res: Response) => {
    const provider = new Ra2ValuesPlayerDataProvider(config);

    const sourceReadyResult = provider.checkSourceReady();
    if(!sourceReadyResult.isReady) {
        return res
            .status(500)
            .json({
                'data': {
                    'message': sourceReadyResult.message
                }
            })
    }


    const activePlayers: PlayerData[] = provider.getActivePlayers();

    return res.json({
        'data': {
            'players': provider.getActivePlayers(),
            'is_game_running': activePlayers.length > 0,
        }
    });
});

const server = app.listen(config.server.port, () => {
    console.log("Server successfully running on port " + config.server.port);
    console.log("Open : http://" + config.server.hostname + ":" + config.server.port + clientBasePath + " in your browser");
});

websockets(server)
