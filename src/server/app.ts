import express, {Express} from "express";
import ConfigProvider, { Config } from "./config.ts";
import cors from "cors";
import api from "./routes/api.ts";
import web from "./routes/web.ts";
import path from "node:path";
import "jsr:@std/dotenv/load";
import http from "node:http";
import websockets from "./websockets/index.ts";
import Store from "./store.ts";

interface Process extends NodeJS.Process {
    pkg: any;
}
declare const process: Process;

export class App {
    private static _app: App;

    public static instance(): App {
        if(!App._app) {
            App._app = new App();
        }
        return App._app;
    }


    public masterConnection: any = null;
    public slaveConnections: any[] = []

    private _express!: Express;
    private _server!: http.Server;
    private _config!: Config;
    private clientDir!: string;

    private _store: any;

    public constructor() {
        this._express = express()
        this._config = (new ConfigProvider()).get();
        this._store = new Store()
    }

    public config(): Config {
        return this._config
    }

    public express(): Express {
        return this._express;
    }

    public store(): Store {
        return this._store;
    }

    public setClientDir(dir: string): void {
        this.clientDir = dir;
    }

    public getClientDir(): string {
        return this.clientDir;
    }

    public listen() {
        this._server = this._express.listen(this._config.server.port, () => {
            console.log("Server successfully running on port " + this._config.server.port);
            console.log("Open : http://" + this._config.server.hostname + ":" + this._config.server.port + this._config.client.base_path + " in your browser");
        });
    }

    public websocket() {

        websockets(this._server)
    }
}

export function bootstrap(): App {

    const appDir: string = import.meta.dirname;

    let clientDir: string;
    let dotEnvPath: string;
    dotEnvPath = path.join(import.meta.dirname, '../../.env');
    clientDir = path.join(import.meta.dirname, '../../dist/client');

    const app = App.instance();
    console.log("RA2 - UI by wushaolin " + app.config().version);

    app.setClientDir(clientDir)

    app.express().use(cors())
    app.express().use(express.json())

    app.express().use('/', web())
    app.express().use('/', api())

    return app;
}