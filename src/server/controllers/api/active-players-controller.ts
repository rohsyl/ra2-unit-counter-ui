import {Request, Response} from "express";
import Ra2ValuesPlayerDataProvider from "../../providers/Ra2ValuesPlayerDataProvider.ts";
import {PlayerData} from "../../providers/DataProvider.ts";
import {App} from "../../app.ts";

export default async(req: Request, res: Response) => {
    const provider = new Ra2ValuesPlayerDataProvider(App.instance().config());

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
}