export default class Color {

    public name: string;
    public hex?: string;
    public gradient?: string;
    public className?: string;

    constructor({
        name,
        hex,
        gradient,
        className
    }: {name: string, hex?: string, gradient?: string, className?: string}) {
        this.name = name;
        this.hex = hex;
        this.gradient = gradient;
        this.className = className;
    }

    public toOption(): { value: string, label: string } {
        return {
            value: this.name.toLowerCase(),
            label:  this.name.charAt(0).toUpperCase() +  this.name.slice(1),
        }
    }
}
