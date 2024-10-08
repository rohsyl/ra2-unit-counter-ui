import path from "path";
import fs from "fs";
import ejs from "ejs";
import {App} from "../../app";
import {Request, Response} from "express"

export default function(req: Request, res: Response) {
    const filePath = path.join(App.instance().getClientDir(), '/index.html');
    const fileContent = fs.readFileSync(filePath).toString()

    const html= ejs.render(fileContent, {
        hostname: App.instance().config().server.hostname,
        port: App.instance().config().server.port,
        base_path: App.instance().config().client.base_path,
    });

    res.send(
        html
    )
}