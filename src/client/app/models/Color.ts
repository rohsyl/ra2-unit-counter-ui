export default class Color {

    public name: string;
    public hex?: string;
    public gradient?: string;
    public className?: string;
    public gradientFromClassNames?: string;
    public gradientToClassNames?: string;
    public borderClassNames?: string;

    constructor({
        name,
        hex,
        gradient,
        className,
        gradientFromClassNames,
        gradientToClassNames,
        borderClassNames
    }: {
        name: string,
        hex?: string,
        gradient?: string,
        className?: string,
        gradientFromClassNames?: string,
        gradientToClassNames?: string,
        borderClassNames?: string
    }) {
        this.name = name;
        this.hex = hex;
        this.gradient = gradient;
        this.className = className;
        this.gradientFromClassNames = gradientFromClassNames;
        this.gradientToClassNames = gradientToClassNames;
        this.borderClassNames = borderClassNames;
    }

    public toOption(): { value: string, label: string } {
        return {
            value: this.name.toLowerCase(),
            label:  this.name.charAt(0).toUpperCase() +  this.name.slice(1),
        }
    }
}
