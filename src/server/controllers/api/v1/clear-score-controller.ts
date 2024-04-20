import {Request, Response} from "express";
import {App} from "../../../app";

export default async(req: Request, res: Response) => {
    const data = App.instance().store().get('game');

    if(!data) {
        return res.status(425).json({
            message: 'no data - open the dashboard or reload it'
        })
    }

    data.player1.score = 0;
    data.player2.score = 0;
    data.team1.score = 0;
    data.team2.score = 0;

    App.instance().store().update('game', data, 'api')

    return res.json({
        success: true
    })
}