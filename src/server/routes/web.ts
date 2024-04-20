import {Router} from "express";
import assetsController from "../controllers/client/assets-controller";
import appController from "../controllers/client/app-controller";
import {App} from "../app";

export default () => {
    const router: Router = Router();

    const clientBasePath: string = App.instance().config().client.base_path
    const assetsBasePath: string = clientBasePath + '/assets'

    router.get(assetsBasePath + '/*', assetsController)
    router.get([clientBasePath, clientBasePath + '/*'], appController);

    return router;
}