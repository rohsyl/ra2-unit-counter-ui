import {defineStore} from "pinia";
import ConfigProvider from "../providers/ConfigProvider";

export type Unit = {
    name: string;
    position: number;
    default?: boolean;
    checked?: boolean;
    faction?: string;
}

export type UnitsContainer = {
    allied: Unit[];
    soviet: Unit[];
    yuri: Unit[];
}

export type MetadataStateProps = {
    colors: string[],
    countries: object,
    units: UnitsContainer
    yuriAsSoviet: boolean,
    showFactionIcons: boolean,
    hideWhenZero: boolean,
}

function sortUnits(a: any, b: any) {
    return a.position - b.position;
}

export const useMetadataStore = defineStore('metadata', {
    state: () : MetadataStateProps => ({
        colors: [],
        countries: {},
        units: {allied: [], soviet: [], yuri: []},
        yuriAsSoviet: true,
        showFactionIcons: true,
        hideWhenZero: false
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
        getMetadataState(state): MetadataStateProps {
            return {
                colors: state.colors,
                countries: state.countries,
                units: state.units,
                yuriAsSoviet: state.yuriAsSoviet,
                showFactionIcons: state.showFactionIcons,
                hideWhenZero: state.hideWhenZero
            }
        }
    },
    actions: {
        async loadMetadata(): Promise<boolean> {

            const response = await fetch(ConfigProvider.config.client.api_url + '/metadata');
            const data = (await response.json()).data;

            this.colors = data.colors;
            this.countries = data.countries;

            const units = data.units;
            for(const faction in units) {
                for(const i in units[faction]) {
                    const nu = units[faction][i]
                    const su = this.units[faction].find(u => u.name == nu.name)
                    units[faction][i].checked = su?.checked ?? nu.default ?? undefined;
                    units[faction][i].position = su?.position ?? nu.position ?? undefined;
                }
            }
            this.$patch({
                units: units
            })
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
        },

        getCountry(faction: string, name: string): any {
            return this.countries[faction].find(c => c.name = name);
        },
    },
    persist: true
})
