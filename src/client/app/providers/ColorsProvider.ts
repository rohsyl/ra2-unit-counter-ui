import Color from "../models/Color";

export const colors: { [key: string]: Color } = {
    'cyan': new Color({
        name:'cyan',
        label: 'Light Blue',
        hex:'cyan',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-cyan-300',
        borderClassNames: 'border-cyan-700',
        textClassnames: 'text-cyan-300',
    }),
    'blue': new Color({
        name:'blue',
        label: 'Blue',
        hex:'blue',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-blue-700',
        borderClassNames: 'border-blue-700',
        textClassnames: 'text-blue-700',
    }),
    'green': new Color({
        name:'green',
        label: 'Green',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-green-300',
        borderClassNames: 'border-green-700',
        textClassnames: 'text-green-300',
    }),
    'pink': new Color({
        name:'pink',
        label: 'Pink',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-fuchsia-300',
        borderClassNames: 'border-fuchsia-300',
        textClassnames: 'text-fuchsia-300',
    }),
    'purple': new Color({
        name:'purple',
        label: 'Purple',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-purple-300',
        borderClassNames: 'border-purple-700',
        textClassnames: 'text-purple-300',
    }),
    'orange': new Color({
        name:'orange',
        label: 'Orange',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-orange-700',
        borderClassNames: 'border-orange-700',
        textClassnames: 'text-orange-300',
    }),
    'red': new Color({
        name:'red',
        label: 'Red',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-red-700',
        borderClassNames: 'border-red-700',
        textClassnames: 'text-red-700',
    }),
    'yellow': new Color({
        name:'yellow',
        label: 'Yellow',
        gradientFromClassNames: 'from-gray-700',
        gradientToClassNames: 'to-yellow-300',
        borderClassNames: 'border-yellow-300',
        textClassnames: 'text-yellow-300',
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
