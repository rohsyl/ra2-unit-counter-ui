import fs from "fs";
import path from "path";
import {App} from "../../app";
import {Request, Response} from "express"

export default function(req: Request, res: Response) {

    const clientBasePath: string = App.instance().config().client.base_path
    const assetsBasePath: string = clientBasePath + '/assets'
    const assetsDir: string = path.join(App.instance().getClientDir(), '/assets');

    if(!req.url.startsWith(assetsBasePath)) {
        return res.status(404).send('Not found');
    }
    const filepath = req.url.slice(assetsBasePath.length);
    if(!fs.existsSync(path.join(assetsDir, filepath))) {
        return res.status(404).send('Not found');
    }
    res.sendFile(path.join(assetsDir, filepath));
};