import Color from "../models/Color";

export const colors: { [key: string]: Color } = {
    'cyan': new Color({
        name:'Cyan',
        hex:'cyan',
        gradient:'linear-gradient(0deg, rgba(0,156,156,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)',
        className: 'border-cyan-700 bg-gradient-to-b to-cyan-700 from-transparent'
    }),
    'blue': new Color({
        name:'Blue',
        hex:'blue',
        gradient:'linear-gradient(0deg, rgba(0,0,156,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)',
        className: 'border-blue-700 bg-gradient-to-b from-blue-700 to-transparent'
    }),
    'green': new Color({
        name:'Green',
        hex:'green',
        gradient:'linear-gradient(0deg, rgba(0,156,0,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)',
        className: 'border-green-700 bg-gradient-to-b to-green-700 from-transparent'
    }),
    'pink': new Color({
        name:'Pink',
        hex:'fuchsia',
        gradient:'linear-gradient(0deg, rgba(156,0,156,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)',
        className: 'border-fuchsia-300 bg-gradient-to-b to-fuchsia-300 from-transparent'
    }),
    'purple': new Color({
        name:'Purple',
        hex:'purple',
        gradient:'linear-gradient(0deg, rgba(156,0,156,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)',
        className: 'border-purple-700 bg-gradient-to-b to-purple-700 from-transparent'
    }),
    'orange': new Color({
        name:'Orange',
        hex:'orange',
        gradient:'linear-gradient(0deg, rgba(156,78,0,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)',
        className: 'border-orange-700 bg-gradient-to-b to-orange-700 from-transparent'
    }),
    'red': new Color({
        name:'Red',
        hex:'red',
        gradient:'inear-gradient(0deg, rgba(156,0,0,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)',
        className: 'border-red-700 bg-gradient-to-b to-red-700 from-transparent'
    }),
    'yellow': new Color({
        name:'Yellow',
        hex:'yellow',
        gradient:'linear-gradient(0deg, rgba(163,159,0,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)',
        className: 'border-yellow-700 bg-gradient-to-b to-yellow-700 from-transparent'
    }),
}

export default class ColorsProvider {
    public static getColors(): { [key: string]: Color } {
        return colors
    }

    public static getColor(name: string): Color {
        return colors[name]
    }
}
