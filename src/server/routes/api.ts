import {Router} from "express";
import activePlayersController from "../controllers/api/active-players-controller.ts";
import playerDataController from "../controllers/api/player-data-controller.ts";
import metaDataController from "../controllers/api/meta-data-controller.ts";
import getPlayersControllers from "../controllers/api/v1/get-players-controllers.ts";
import getScoreController from "../controllers/api/v1/get-score-controller.ts";
import setScoreController from "../controllers/api/v1/set-score-controller.ts";
import clearScoreController from "../controllers/api/v1/clear-score-controller.ts";

export default () => {
    const router: Router = Router();

    router.get('/playerdata/:color', playerDataController);
    router.get('/metadata', metaDataController);
    router.get('/active-players', activePlayersController);

    router.get('/api/v1/players', getPlayersControllers);

    router.get('/api/v1/score', getScoreController);

    router.put('/api/v1/score', setScoreController);

    router.delete('/api/v1/score', clearScoreController);


    return router;
}