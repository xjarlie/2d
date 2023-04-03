import Entity from "./Entity";
import { Vector } from "./Vector";
import global from "./global";

class Graphics {
    parent: Entity;
    type: GraphicsType;
    scale: number;
    
    // Shape
    color?: string;

    // Image / Texture
    imageURL?: string;

    constructor(parent: Entity, type: GraphicsType = GraphicsType.Rectangle, scale: number = 1) {
        this.parent = parent;
        this.type = type;
        this.scale = scale;

        this.color = '#ffffff';
    }

    draw(center: Vector, scale: number = this.scale) {

        const ctx = global.ctx as CanvasRenderingContext2D;
        
        switch (this.type) {
            case GraphicsType.Rectangle: {
                ctx.fillStyle = this.color;

                const halfScale = scale / 2;
                const halfSizeScale = Vector.multiply(this.parent.size, halfScale)

                const topLeft = Vector.subtract(center, halfSizeScale);
                const bottomRight = Vector.sum(center, halfSizeScale);

                ctx.fillRect(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y);
            }
            case GraphicsType.Circle: {

            }
        }

    }
}

enum GraphicsType {
    Image,
    Texture,
    Rectangle,
    Circle
}

export default Graphics;