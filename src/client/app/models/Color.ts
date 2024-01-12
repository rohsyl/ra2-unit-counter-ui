export default class Color {

    public name: string;
    public label: string;
    public hex?: string;
    public gradient?: string;
    public className?: string;
    public gradientFromClassNames?: string;
    public gradientToClassNames?: string;
    public borderClassNames?: string;
    public textClassnames?: string;

    constructor({
        name,
        label,
        hex,
        gradient,
        className,
        gradientFromClassNames,
        gradientToClassNames,
        borderClassNames,
                    textClassnames
    }: {
        name: string,
        label: string,
        hex?: string,
        gradient?: string,
        className?: string,
        gradientFromClassNames?: string,
        gradientToClassNames?: string,
        borderClassNames?: string,
        textClassnames?: string,
    }) {
        this.name = name;
        this.label = label;
        this.hex = hex;
        this.gradient = gradient;
        this.className = className;
        this.gradientFromClassNames = gradientFromClassNames;
        this.gradientToClassNames = gradientToClassNames;
        this.borderClassNames = borderClassNames;
        this.textClassnames = textClassnames;
    }

    public toOption(): { value: string, label: string } {
        return {
            value: this.name.toLowerCase(),
            label:  this.label.charAt(0).toUpperCase() +  this.label.slice(1),
        }
    }
}
