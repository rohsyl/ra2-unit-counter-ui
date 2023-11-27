import express, {Request,Response,Express} from 'express';
import path from 'path';
import Ra2ValuesPlayerDataProvider from './providers/Ra2ValuesPlayerDataProvider';
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();


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
    return res.json({
        'data': provider.getActiveColors()
    });
});

app.listen(8080, () => {
    console.log("Server successfully running on port 8080");
  });
