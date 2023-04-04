import Entity from "./Entity";
import { Vector } from "./Vector";
import { getById } from "./getEntities";
import global from "./global";

class Graphics {
    parent: Entity;
    type: GraphicsType;
    scale: number;

    // Shape
    color?: string;

    // Image / Texture
    sprite?: Sprite;

    constructor(parent: Entity, type: GraphicsType = GraphicsType.Rectangle, scale: number = 1) {
        this.parent = parent;
        this.type = type;
        this.scale = scale;

        this.color = '#ffffff';

    }

    draw(center: Vector, scale: number = this.scale) {

        const ctx = global.ctx as CanvasRenderingContext2D;

        if (this.type === GraphicsType.Rectangle) {

            ctx.fillStyle = this.color;

            const halfScale = scale / 2;
            const halfSizeScale = Vector.multiply(this.parent.size, halfScale)
            const topLeft = Vector.subtract(center, halfSizeScale);

            ctx.fillRect(topLeft.x, topLeft.y, this.parent.size.x * scale, this.parent.size.y * scale);

        } else if (this.type === GraphicsType.Image) {

            switch (this.sprite.fit) {
                case "fit": {
                    this.sprite.width = this.parent.size.x;
                    this.sprite.height = this.parent.size.y;
                }
            }

            const topLeft = Vector.subtract(center, new Vector(this.sprite.width / 2, this.sprite.height / 2));

            ctx.drawImage(this.sprite.image, topLeft.x, topLeft.y, this.sprite.width, this.sprite.height);

        }
    }
}

type FitType = "default" | "fit" | "tile";

class Sprite {
    fit: FitType;
    src: string;

    image: HTMLImageElement;
    width: number;
    height: number;

    constructor(src: string, fit: FitType = "default") {
        this.src = `${__webpack_public_path__}/${src}`;
        this.fit = fit;

        this.image = new Image();
        this.image.src = this.src;

        this.height = this.image.height;
        this.width = this.image.width;

    }
}

class SpriteSheet extends Sprite {
    constructor(src: string) {
        super(src);


    }
}

type AnimationFrame = {
    duration: number;
    sprite: Sprite;
    delayAfter: number
}

class Animation {
    frames: AnimationFrame[];
    standardDelay: number;

    constructor(frames: AnimationFrame[] = []) {
        this.frames = frames;
        this.standardDelay = 0;

    }

    static fromSpriteSheet(sheet: SpriteSheet, metadata: {duration: number; delayAfter: number}[]): Animation {
        
        const frameList: AnimationFrame[] = [];
        const sprites: Sprite[] = []; // Get sprites from spritesheet

        for (const i in sprites) {
            const frame: AnimationFrame = {
                sprite: sprites[i],
                ...metadata[i]
            };
            frameList[i] = frame;
        }

        return new Animation(frameList);
    }
}

enum GraphicsType {
    Image,
    Texture,
    Rectangle,
    Circle
}

export default Graphics;
export { GraphicsType, Sprite, SpriteSheet }