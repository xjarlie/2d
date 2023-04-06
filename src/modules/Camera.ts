import Entity from "../lib/Entity";
import global from "../lib/global";
import { Vector } from "../lib/Vector";

class Camera {
    position: Vector;
    ctx: CanvasRenderingContext2D;

    glidingTarget: Vector | null;
    glideTicks: Vector;
    perTickGlide: Vector;

    constructor(ctx: CanvasRenderingContext2D, posX: number = 0, posY: number = 0) {
        this.position = new Vector(posX, posY);
        this.ctx = ctx;

        this.glidingTarget = null;
        this.perTickGlide = new Vector();
        this.glideTicks = new Vector(-1, -1);
    }

    getScreenSpace(worldSpace: Vector): Vector {
        return Vector.subtract(worldSpace, this.position);
    }

    get center(): Vector {
        const x = this.position.x + this.ctx.canvas.width / 2;
        const y = this.position.y + this.ctx.canvas.height / 2;

        return new Vector(x, y);
    }

    translate(x: number, y: number): void {
        this.position = Vector.sum(this.position, new Vector(x, y));
    }

    glide(target: Vector, xTicks: number, yTicks: number = -1, useX: boolean = true, useY: boolean = true) {
        
        let targetX = this.center.x;
        let targetY = this.center.y;

        if (useX) targetX = target.x;
        if (useY) targetY = target.y;

        this.glidingTarget = new Vector(targetX, targetY);
        const ticksX = xTicks;
        const ticksY = yTicks === -1 ? xTicks : yTicks;
        this.glideTicks = new Vector(ticksX, ticksY);
        
        // console.log(this.perTickGlide);
    }

    setCenter(v: Vector, useX: boolean = true, useY: boolean = true): void {
        if (useX) this.position.x = v.x - this.ctx.canvas.width / 2;
        if (useY) this.position.y = v.y - this.ctx.canvas.height / 2;
    }

    render(item: Entity) {
        item.draw(this.getScreenSpace(item.center))
    }

    tick() {
        // Glide
        const center = this.center;

        if (this.glidingTarget !== null) {
            if (Vector.round(center).x === Vector.round(this.glidingTarget).x && Vector.round(center).y === Vector.round(this.glidingTarget).y) {
                this.glidingTarget = null;
                this.glideTicks = new Vector(-1, -1);
            } else {

                const diff = Vector.subtract(this.glidingTarget, center);
                this.perTickGlide = Vector.divide(diff, this.glideTicks);

                this.translate(this.perTickGlide.x, this.perTickGlide.y);
                this.glideTicks = Vector.subtract(this.glideTicks, new Vector(1, 1));
            }
        }

        // console.log(this.position, this.glidingTarget)
        
    }
}

export default Camera;