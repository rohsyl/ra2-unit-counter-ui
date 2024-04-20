import {Request, Response} from "express";
import Ra2ValuesPlayerDataProvider from "../../providers/Ra2ValuesPlayerDataProvider";
import {App} from "../../app";

export default async(req: Request, res: Response) => {
    const provider = new Ra2ValuesPlayerDataProvider(App.instance().config());
    return res.json({
        'data': provider.getPlayerData(req.params.color)
    });
}