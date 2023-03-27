class Vector {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    set magnitude(m: number) {
        this.x = m * Math.cos(this.direction);
        this.y = m * Math.sin(this.direction);
    }

    get magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    set direction(d: number) {
        this.x = this.magnitude * Math.cos(d);
        this.y = this.magnitude * Math.sin(d);
    }

    get direction(): number {
        return Math.atan2(this.y, this.x);
    }

    negative(): Vector {
        return Vector.multiply(this, -1);
    }

    static fromPolar(magnitude: number, angle: number): Vector {
        const x = Math.round(magnitude * Math.cos(angle));
        const y = (magnitude * Math.sin(angle));
        return new Vector(x, y);
    }

    static normalise(target: Vector): Vector {
        return Vector.divide(target, target.magnitude);
    }

    static dot(a: Vector, b: Vector): number {
        return a.x * b.x + a.y * b.y;
    }

    static round(v: Vector): Vector {
        return new Vector(Math.round(v.x), Math.round(v.y));
    }

    static multiply(target: Vector, ...vectors: (Vector | number)[]): Vector {

        const result = new Vector(target.x, target.y);

        for (const o of vectors) {
            if (typeof o === 'number') {
                result.x = result.x * o;
                result.y = result.y * o;
            } else {
                result.x = result.x * o.x;
                result.y = result.y * o.y;
            }
        }

        return result;

    }

    static divide(target: Vector, ...vectors: (Vector | number)[]): Vector {
        
        const result = new Vector(target.x, target.y);

        for (const o of vectors) {
            if (typeof o === 'number') {
                result.x = result.x / o;
                result.y = result.y / o;
            } else {
                result.x = result.x / o.x;
                result.y = result.y / o.y;
            }
        }

        return result;
    }

    static sum(...vectors: Vector[]): Vector {

        const result = new Vector();
        
        for (const o of vectors) {
            result.x += o.x;
            result.y += o.y;
        }

        return result;

    }

    static subtract(...vectors: Vector[]): Vector {

        const result = new Vector();

        for (const o of vectors) {
            result.x -= o.x;
            result.y -= o.y;
        }

        return result;
    }
}

export { Vector };