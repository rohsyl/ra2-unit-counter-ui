import {defineStore} from "pinia";
import ConfigProvider from "../providers/ConfigProvider";
import {b} from "vite/dist/node/types.d-aGj9QkWt";

export interface Unit {
    name: string;
    position: number;
    checked: boolean;
    faction?: string;
}

interface UnitsContainer {
    allied: Unit[];
    soviet: Unit[];
    yuri: Unit[];
}

export const defaultAlliedUnits = [
    "gis",
    "grizzlies",
    "ifvs",
    "mirages",
    "prisms",
    "rocketeers",
    "oils",
];

export const defaultSovietUnits = [
    "sovietdogs",
    "rhinos",
    "desolators",
    "drones",
    "warfactories",
    "kirovs",
    "oils",
];

export const defaultYuriUnits = [
    "discs",
    "gattlings",
    "magnetrons",
    "masterminds",
    "warfactories",
    "yuriminers",
    "oils",
];

const factionDefaultsMap = {
    allied: defaultAlliedUnits,
    soviet: defaultSovietUnits,
    yuri: [],
};

function initDefaultUnits(units: { allied: string[], soviet: string[], yuri: string[] }): UnitsContainer {
    const result: UnitsContainer = {allied: [], soviet: [], yuri: []};
    for (const faction in units) {
        for (const unit of units[faction]) {
            result[faction].push({
                name: unit,
                checked: factionDefaultsMap[faction].includes(unit),
                position: factionDefaultsMap[faction].indexOf(unit),
                faction: faction,
            } as Unit)
        }
    }
    return result;
}

function sortUnits(a: any, b: any) {
    return a.position - b.position;
}

export const useMetadataStore = defineStore('metadata', {
    state: () : {
        colors: string[],
        countries: object,
        units: UnitsContainer
        yuriAsSoviet: boolean,
        showFactionIcons: boolean,
    } => ({
        colors: [],
        countries: {},
        units: {allied: [], soviet: [], yuri: []},
        yuriAsSoviet: true,
        showFactionIcons: true,
    }),
    getters: {
        getAlliedUnits(state): Unit[] {
            return state.units.allied.sort(sortUnits);
        },
        getSovietUnits(state): Unit[] {
            return state.units.soviet.sort(sortUnits);
        },
        getYuriUnits(state): Unit[] {
            return state.units.yuri.sort(sortUnits);
        },
        getCheckedAlliedUnits(state): Unit[] {
            return state.units.allied.filter(unit => unit.checked).sort(sortUnits);
        },
        getCheckedSovietUnits(state): Unit[] {
            return state.units.soviet.filter(unit => unit.checked).sort(sortUnits);
        },
        getMetadataState(state): {
            colors: string[],
            countries: object,
            units: UnitsContainer
            yuriAsSoviet: boolean,
            showFactionIcons: boolean,
        } {
            return {
                colors: state.colors,
                countries: state.countries,
                units: state.units,
                yuriAsSoviet: state.yuriAsSoviet,
                showFactionIcons: state.showFactionIcons,
            }
        }
    },
    actions: {
        async loadMetadata(): Promise<boolean> {

            const response = await fetch(ConfigProvider.config.client.api_url + '/metadata');
            const data = (await response.json()).data;

            this.colors = data.colors;
            this.countries = data.countries;

            const defaults: UnitsContainer = initDefaultUnits(data.units);
            for (const faction in this.units as UnitsContainer) {
                if(this.units[faction].length === 0) {
                    this.units[faction] = defaults[faction];
                }
                else {
                    // todo merge defaults with existing units
                }
            }
            return true
        },
        async updateMetadataOrder(faction: string, e): Promise<boolean> {
            if(e.hasOwnProperty('moved')) {
                e.moved.newIndex
                e.moved.oldIndex
                let temp = this.units[faction][e.moved.newIndex]
                this.units[faction][e.moved.newIndex] = this.units[faction][e.moved.oldIndex]
                this.units[faction][e.moved.oldIndex] = temp;
                for(let i in this.units[faction]) {
                    this.units[faction][i].position = parseInt(i);
                }
            }
        }
    },
    persist: true
})
