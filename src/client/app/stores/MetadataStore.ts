import {defineStore} from "pinia";

export interface Unit {
    name: string;
    position: number;
    checked: boolean;
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
                position: factionDefaultsMap[faction].indexOf(unit)
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
            const response = await fetch(import.meta.env.VITE_DATA_API_URL + '/metadata');
            const data = (await response.json()).data;

            this.colors = data.colors;
            this.countries = data.countries;
            this.units = this.units ?? initDefaultUnits(data.units)


            return true
        },
    },
    persist: true
})