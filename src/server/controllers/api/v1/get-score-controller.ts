import {Request, Response} from "express";
import {App} from "../../../app";

export default async(req: Request, res: Response) => {
    const data = App.instance().store().get('game');

    if(!data) {
        return res.status(425).json({
            message: 'no data - open the dashboard or reload it'
        })
    }

    let score1;
    let score2;
    if(data.gameMode === '1v1') {
        score1 = data.player1.score;
        score2 = data.player2.score;
    }
    else {
        score1 = data.team1.score;
        score2 = data.team2.score;
    }

    return res.json({
        data: {
            gameMode: data.gameMode,
            score: {
                score1: score1,
                score2: score2,
            }
        }
    })
}