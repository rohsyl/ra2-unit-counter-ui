import {Request, Response} from "express";
import Ra2ValuesPlayerDataProvider from "../../providers/Ra2ValuesPlayerDataProvider.ts";
import {App} from "../../app.ts";

export default async(req: Request, res: Response) => {
    const provider = new Ra2ValuesPlayerDataProvider(App.instance().config());
    return res.json({
        'data': provider.getPlayerData(req.params.color)
    });
}