class Vector {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt((this.x^2) + (this.y^2));
    }

    get direction(): number {
        return Math.atan((this.y / this.x))
    }

    add(...props: Vector[]) {

        for (const i in props) {

            this.x += props[i].x;

            this.y += props[i].y;
        }

    }

    subtract(...props: Vector[]) {

        for (const o of props) {
            this.add(o.negative());
        }

    }

    multiply(value: Vector | number) {

        if (typeof value === 'number') {
            
            this.x *= value;
            this.y*= value;

        } else {

            this.x *= value.x;
            this.y *= value.y;

        }

    }

    negative(): Vector {
        return this.multipliedBy(-1);
    }

    multipliedBy(value: number): Vector {
        return new Vector(this.x * value, this.y * value);
    }

    static fromPolar(magnitude: number, angle: number): Vector {
        const x = magnitude * Math.cos(angle);
        const y = magnitude * Math.sin(angle);
        return new Vector(x, y);
    }
}

export { Vector };