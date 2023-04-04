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

    constructor(parentID: number, type: GraphicsType = GraphicsType.Rectangle, scale: number = 1) {
        this.parent = getById(parentID);
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

            console.log('IMAGE TYPE', this.parent);

            if (this.sprite.initialized) {
                switch (this.sprite.fit) {
                    case "fit": {
                        this.sprite.width = this.parent.size.x;
                        this.sprite.height = this.parent.size.y;
                    }
                }

                const tL = Vector.subtract(center, new Vector(this.sprite.width / 2, this.sprite.height / 2));

                ctx.drawImage(this.sprite.bitmap, tL.x, tL.y, this.sprite.width, this.sprite.height);
            }

        }
    }
}

type FitType = "default" | "fit" | "tile";

class Sprite {
    fit: FitType;
    src: string;
    bitmap: ImageBitmap;
    width: number;
    height: number;

    initialized: boolean;

    constructor(src: string, fit: FitType = "default") {
        this.src = `${__webpack_public_path__}/${src}`;
        this.fit = fit;

        this.initialized = false;

        const image = new Image();
        image.src = this.src;
        const init = async () => {
            const starting = performance.now();
            this.bitmap = await createImageBitmap(image);
            this.initialized = true;

            console.log(performance.now() - starting);

            this.width = this.bitmap.width;
            this.height = this.bitmap.height;
        };
        init();

    }
}

class SpriteSheet extends Sprite {
    constructor(src: string) {
        super(src);


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