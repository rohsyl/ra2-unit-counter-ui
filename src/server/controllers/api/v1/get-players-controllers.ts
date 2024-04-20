import {Request, Response} from "express";
import {App} from "../../../app";

export default async(req: Request, res: Response) => {

    const data = App.instance().store().get('game');

    if(!data) {
        return res.status(425).json({
            message: 'no data - open the dashboard or reload it'
        })
    }

    const players = [];

    if(data.gameMode === '1v1') {
        players.push({
            player: data.player1.name,
            color: data.player1.color
        })
        players.push({
            player: data.player2.name,
            color: data.player2.color
        })
    }
    else {
        for (const player of data.team1.players) {
            players.push({
                player: player.name,
                color: player.color
            })
        }
        for (const player of data.team2.players) {
            players.push({
                player: player.name,
                color: player.color
            })
        }
    }

    return res.json({
        data: {
            gameMode: data.gameMode,
            players: players
        }
    })
}