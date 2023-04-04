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
    sprite: HTMLImageElement;

    constructor(parent: Entity, type: GraphicsType = GraphicsType.Rectangle, scale: number = 1) {
        this.parent = parent;
        this.type = type;
        this.scale = scale;

        this.color = '#ffffff';

        this.sprite = new Image();
    }

    setSprite(src: string) {
        console.log(src, this.sprite);
        this.sprite.src = `${__webpack_public_path__}/${src}`;
    }

    draw(center: Vector, scale: number = this.scale) {

        const ctx = global.ctx as CanvasRenderingContext2D;

        const halfScale = scale / 2;
        const halfSizeScale = Vector.multiply(this.parent.size, halfScale)
        const topLeft = Vector.subtract(center, halfSizeScale);

        switch (this.type) {
            case GraphicsType.Rectangle: {
                ctx.fillStyle = this.color;


                

                ctx.fillRect(topLeft.x, topLeft.y, this.parent.size.x * scale, this.parent.size.y * scale);
            }
            case GraphicsType.Circle: {

            }
            case GraphicsType.Image: {
                ctx.drawImage(this.sprite, topLeft.x, topLeft.y, this.parent.size.x, this.parent.size.y);
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
export { GraphicsType }