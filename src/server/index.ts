import express, {Request,Response,Express} from 'express';
import path from 'path';
import Ra2ValuesPlayerDataProvider from './providers/Ra2ValuesPlayerDataProvider';
import dotenv from 'dotenv';
import cors from 'cors';
import websockets from './websockets';
import {PlayerData} from "./providers/DataProvider";
import fs from "fs";
import ejs from "ejs";
import config from './config';

interface Process extends NodeJS.Process {
    pkg: any;
}
declare const process: Process;

let dotEnvPath: string;
if(process.pkg) {
   dotEnvPath = path.join(process.cwd(), '/../.env');
}
else {
    dotEnvPath = path.join(process.cwd(), '/.env');
}
console.log(dotEnvPath)

dotenv.config({
    path: dotEnvPath
});

const clientBasePath: string = config.client.base_path

const app: Express = express();
app.use(cors())
//app.use(express.static(path.join(__dirname, '../playerdata')));

app.get(clientBasePath, function(req, res) {

    const filePath = path.join(process.cwd(), '/dist/client/index.html');
    const fileContent = fs.readFileSync(filePath).toString()
    const html= ejs.render(fileContent, {
        hostname: config.server.hostname,
        port: config.server.port,
        base_path: clientBasePath,
    });

    res.send(
        html
    )
    //res.sendFile(path.join(process.cwd(), '/dist/client/index.html'));

});
app.get(clientBasePath + '/*', function(req, res) {
    if(!req.url.startsWith(clientBasePath)) {
        return res.status(404).send('Not found');
    }
    const filepath = req.url.slice(clientBasePath.length);
    if(!fs.existsSync(path.join(process.cwd(), '/dist/client' + filepath))) {
        return res.status(404).send('Not found');
    }
    res.sendFile(path.join(process.cwd(), '/dist/client' + filepath));
});

app.get('/playerdata/:color', async(req: Request, res: Response) => {
    const provider = new Ra2ValuesPlayerDataProvider();
    return res.json({
        'data': provider.getPlayerData(req.params.color)
    });
});

app.get('/metadata', async(req: Request, res: Response) => {
    const provider = new Ra2ValuesPlayerDataProvider();
    return res.json({
        'data': provider.getMetadata()
    });
});

app.get('/active-players', async(req: Request, res: Response) => {
    const provider = new Ra2ValuesPlayerDataProvider();

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

const server = app.listen(8080, () => {
    console.log("Server successfully running on port 8080");
  });


websockets(server)
