import {Router} from "express";
import activePlayersController from "../controllers/api/active-players-controller";
import playerDataController from "../controllers/api/player-data-controller";
import metaDataController from "../controllers/api/meta-data-controller";
import getPlayersControllers from "../controllers/api/v1/get-players-controllers";
import getScoreController from "../controllers/api/v1/get-score-controller";
import setScoreController from "../controllers/api/v1/set-score-controller";
import clearScoreController from "../controllers/api/v1/clear-score-controller";

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