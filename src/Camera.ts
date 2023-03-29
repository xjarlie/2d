import global from "./lib/global";
import { Renderable } from "./lib/types";
import { Vector } from "./Vector";

class Camera {
    position: Vector;
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, posX: number = 0, posY: number = 0) {
        this.position = new Vector(posX, posY);
        this.ctx = ctx;
    }

    getScreenSpace(worldSpace: Vector): Vector {
        return Vector.subtract(worldSpace, this.position);
    }

    translate(x: number, y: number): void {
        this.position = Vector.sum(this.position, new Vector(x, y));
    }

    setCenter(v: Vector, useX: boolean = true, useY: boolean = true): void {
        if (useX) this.position.x = v.x - this.ctx.canvas.width / 2;
        if (useY) this.position.y = v.y - this.ctx.canvas.height / 2;
    }

    render(item: Renderable) {
        item.draw(this.getScreenSpace(item.position))
    }
}

export default Camera;