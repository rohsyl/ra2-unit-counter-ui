import {Request, Response} from "express";
import {App} from "../../../app.ts";

export default async(req: Request, res: Response) => {
    const data = App.instance().store().get('game');

    if(!data) {
        return res.status(425).json({
            message: 'no data - open the dashboard or reload it'
        })
    }
    let value: number = 0
    const target: number = req.body.target;
    if(req.body.action) {
        if(req.body.action === "increment") {
            value = 1;
        }
        if(req.body.action === "decrement") {
            value = -1;
        }
    }

    if(data.gameMode === '1v1') {
        if(target === 0) {
            data.player1.score += value
        }
        else if(target === 1) {
            data.player2.score += value
        }
    }
    else {
        if(target === 0) {
            data.team1.score += value
        }
        else if(target === 1) {
            data.team2.score += value
        }
    }

    App.instance().store().update('game', data, 'api')

    return res.json({
        success: true
    })
}