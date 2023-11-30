import Color from "../models/Color";

export const colors: { [key: string]: Color } = {
    'cyan': new Color({
        name:'Light blue',
        hex:'cyan',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-cyan-300',
        borderClassNames: 'border-cyan-700',
    }),
    'blue': new Color({
        name:'Blue',
        hex:'blue',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-blue-700',
        borderClassNames: 'border-blue-700',
    }),
    'green': new Color({
        name:'Green',
        hex:'green',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-green-300',
        borderClassNames: 'border-green-700',
    }),
    'pink': new Color({
        name:'Pink',
        hex:'fuchsia',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-fuchsia-300',
        borderClassNames: 'border-fuchsia-300',
    }),
    'purple': new Color({
        name:'Purple',
        hex:'purple',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-purple-300',
        borderClassNames: 'border-purple-700',
    }),
    'orange': new Color({
        name:'Orange',
        hex:'orange',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-orange-700',
        borderClassNames: 'border-orange-700',
    }),
    'red': new Color({
        name:'Red',
        hex:'red',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-red-700',
        borderClassNames: 'border-red-700',
    }),
    'yellow': new Color({
        name:'Yellow',
        hex:'yellow',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-yellow-300',
        borderClassNames: 'border-yellow-300',
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
