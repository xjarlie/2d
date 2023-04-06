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
    currentSprite: Sprite;
    animation: SpriteAnimation;

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

            let current = this.currentSprite;

            if (this.animation) {
                this.animation.step();
                current = this.animation.currentSprite;
            }

            switch (current.fit) {
                case "fit": {
                    current.width = this.parent.size.x;
                    current.height = this.parent.size.y;
                }
            }

            const topLeft = Vector.subtract(center, new Vector(current.width / 2, current.height / 2));

            ctx.drawImage(current.imageElement, topLeft.x, topLeft.y, current.width, current.height);

        }
    }
}

type FitType = "default" | "fit" | "tile";

class Sprite {
    name: string;

    fit: FitType;
    src: string;

    imageElement: HTMLImageElement;
    imageBitmap: ImageBitmap;
    width: number;
    height: number;

    constructor(src: string, name: string = src, fit: FitType = "default") {
        this.name = name;
        
        this.src = `${__webpack_public_path__}/${src}`;
        this.fit = fit;

        this.imageElement = new Image();
        this.imageElement.src = this.src;

        this.height = this.imageElement.height;
        this.width = this.imageElement.width;

        let initialised: boolean = false;

        const offscreen = new OffscreenCanvas(this.imageElement.naturalWidth, this.imageElement.naturalHeight);
        const offCtx = offscreen.getContext("2d");

        for (let i=0; i < 10000; i++) {
            // doesn't ever load fsr
            if (initialised) break;
            if (!this.imageElement.complete) continue;

            

            offCtx.drawImage(this.imageElement, 0, 0, this.width, this.height);
            this.imageBitmap = offscreen.transferToImageBitmap();
            initialised = true;
        }

    }
}

class SpriteSheet extends Sprite {
    constructor(src: string) {
        super(src);

        // some code to determine img size and separate em out idk anymore
    }
}

type AnimationFrame = {
    duration: number;
    sprite: Sprite;
    delayAfter: number;
}

class SpriteAnimation {
    frames: AnimationFrame[];
    standardDelay: number;

    animTicks: number;
    totalTicks: number;
    stepSpeed: number;

    startingTicks: number[];

    currentFrameIndex: number;

    constructor(frames: AnimationFrame[] = [], standardDelay: number = 0) {
        this.frames = frames;
        this.standardDelay = standardDelay;

        this.animTicks = 0;
        this.startingTicks = [];

        this.totalTicks = 0;

        for (const i in frames) {
            const o = frames[i];

            this.startingTicks[i] = this.totalTicks;

            this.totalTicks += o.duration + o.delayAfter + this.standardDelay;
        }

        this.currentFrameIndex = 0;

    }

    get currentSprite(): Sprite {
        return this.frames[this.currentFrameIndex].sprite;
    } 

    indexFromTicks(ticks: number): number {
        for( let i = this.frames.length - 1;  i >= 0;  --i ) {
            if( ticks >= this.startingTicks[i] ) {
                return i;
            }
        }
        return -1;
    }

    step() {
        this.currentFrameIndex = this.indexFromTicks(this.animTicks);

        this.animTicks++;
        if (this.animTicks > this.totalTicks) this.animTicks = 0;

        console.log(this.animTicks, this.currentSprite.name)
    }

    static fromSpriteSheet(sheet: SpriteSheet, metadata: {duration: number; delayAfter: number}[]): SpriteAnimation {
        
        const frameList: AnimationFrame[] = [];
        const sprites: Sprite[] = []; // Get sprites from spritesheet

        for (const i in sprites) {
            const frame: AnimationFrame = {
                sprite: sprites[i],
                ...metadata[i]
            };
            frameList[i] = frame;
        }

        return new SpriteAnimation(frameList);
    }
}

enum GraphicsType {
    Image,
    Texture,
    Rectangle,
    Circle
}

export default Graphics;
export { GraphicsType, Sprite, SpriteSheet, SpriteAnimation }