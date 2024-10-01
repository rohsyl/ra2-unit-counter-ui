import {Router} from "express";
import assetsController from "../controllers/client/assets-controller.ts";
import appController from "../controllers/client/app-controller.ts";
import {App} from "../app.ts";

export default () => {
    const router: Router = Router();

    const clientBasePath: string = App.instance().config().client.base_path
    const assetsBasePath: string = clientBasePath + '/assets'

    router.get(assetsBasePath + '/*', assetsController)
    router.get([clientBasePath, clientBasePath + '/*'], appController);

    return router;
}