import express, {Express} from "express";
import ConfigProvider, { Config } from "./config";
import cors from "cors";
import api from "./routes/api";
import web from "./routes/web";
import path from "path";
import dotenv from "dotenv";
import http from "http";
import websockets from "./websockets";
import Store from "./store";

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

    const appDir: string = path.join(__dirname, '../');

    let clientDir: string;
    let dotEnvPath: string;
    if(process.pkg) {
        dotEnvPath = path.join(process.cwd(), '/.env');
        clientDir = path.join(appDir, '/../client');
    }
    else {
        dotEnvPath = path.join(__dirname, '../../.env');
        clientDir = path.join(__dirname, '../../dist/client');
    }

    dotenv.config({
        path: dotEnvPath
    });

    const app = App.instance();
    console.log("RA2 - UI by wushaolin " + app.config().version);

    app.setClientDir(clientDir)

    app.express().use(cors())
    app.express().use(express.json())

    app.express().use('/', web())
    app.express().use('/', api())

    return app;
}