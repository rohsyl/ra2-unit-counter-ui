import Color from "../models/Color";

export const colors: { [key: string]: Color } = {
    'cyan': new Color('Cyan', 'cyan', 'linear-gradient(0deg, rgba(0,156,156,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)'),
    'blue': new Color('Blue', 'blue', 'linear-gradient(0deg, rgba(0,0,156,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)'),
    'green': new Color('Green', 'green', 'linear-gradient(0deg, rgba(0,156,0,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)'),
    'pink': new Color('Pink', 'pink', 'linear-gradient(0deg, rgba(156,0,156,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)'),
    'purple': new Color('Purple', 'purple', 'linear-gradient(0deg, rgba(156,0,156,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)'),
    'orange': new Color('Orange', 'orange', 'linear-gradient(0deg, rgba(156,78,0,1) 0%, rgba(0,0,0,0.32816876750700286) 100%)'),
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
