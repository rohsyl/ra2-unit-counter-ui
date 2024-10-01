import {EventEmitter} from "node:events";

export default class Store extends EventEmitter {

    private stores: any;

    constructor() {
        super();
        this.stores = {};
    }

    public update(store: string, data: any, emitter: string) {
        this.stores[store] = data;
        console.log(store, data)
        this.emit('updated', store, this.stores[store], emitter)
    }

    public get(store: string): any {
        return this.stores[store];
    }
}