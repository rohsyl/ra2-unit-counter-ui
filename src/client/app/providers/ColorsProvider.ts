import Color from "../models/Color";

export const colors: { [key: string]: Color } = {
    'red': new Color('Red', 'red', 'inear-gradient(0deg, rgba(156,0,0,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)'),
    'yellow': new Color('Yellow', 'yellow', 'linear-gradient(0deg, rgba(163,159,0,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)'),
}

export default class ColorsProvider {
    public static getColors(): { [key: string]: Color } {
        return colors
    }

    public static getColor(name: string): Color {
        return colors[name]
    }
}
