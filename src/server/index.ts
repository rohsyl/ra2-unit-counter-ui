import express, {Request,Response,Express} from 'express';
import path from 'path';
import Ra2ValuesPlayerDataProvider from './providers/Ra2ValuesPlayerDataProvider';
import dotenv from 'dotenv';
import cors from 'cors';
import websockets from './websockets';
import {IncomingMessage, Server, ServerResponse} from "http";
import {PlayerData} from "./providers/DataProvider";

dotenv.config();
const app: Express = express();


app.use(cors())
app.use(express.static(path.join(__dirname, '../playerdata')));

/*
app.get('/red', async(req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname, '../playerdata', 'red.html'));
});


app.get('/yellow', async(req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname, '../playerdata', 'yellow.html'));
});


app.get('/dashboard', async(req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname, '../playerdata', 'dashboard.html'));
});
*/

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