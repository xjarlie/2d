import Entity from "../lib/Entity";
import { Vector } from "../lib/Vector";
import { getById } from "../lib/getEntities";
import global from "../lib/global";
import { seconds } from "../lib/types";

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

            const startingPt = current.startingPos;

            if (current.imageElement.complete) {
                ctx.drawImage(current.imageElement, startingPt.x, startingPt.y, current.finishPos.x - startingPt.x, current.finishPos.y - startingPt.y, topLeft.x, topLeft.y, current.width, current.height)
            }
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

    startingPos: Vector;
    finishPos: Vector;

    constructor(src: string, name: string = src, fit: FitType = "default") {
        this.name = name;

        this.src = `${__webpack_public_path__}/${src}`;
        this.fit = fit;

        this.imageElement = new Image();
        this.imageElement.src = this.src;

        this.height = 0;
        this.width = 0;

        this.imageElement.onload = () => this.onImageLoad();

    }

    onImageLoad() {
        this.height = this.imageElement.height;
        this.width = this.imageElement.width;

        this.startingPos = this.startingPos || new Vector(0, 0);
        this.finishPos = this.finishPos || new Vector(this.width, this.height);
    }
}

class SpriteSheet extends Sprite {

    spriteSize: Vector;
    sprites: Sprite[];
    totalSprites: number;

    rawSrc: string;
    names: string[];
    extOnLoad: (sheet: SpriteSheet) => any;

    constructor(src: string, name: string, spriteSize: Vector, names: string[] = [], onLoad: (sheet: SpriteSheet) => any = () => {}) {
        super(src, name);
        this.spriteSize = spriteSize;

        this.rawSrc = src;
        this.names = names;

        this.extOnLoad = onLoad;

        // some code to determine img size and separate em out idk anymore
    }

    getSprite(index: number): Sprite {
        return this.sprites[index];
    }

    onImageLoad(): void {
        super.onImageLoad();

        const numSpritesX: number = this.imageElement.width / this.spriteSize.x;
        const numSpritesY: number = this.imageElement.height / this.spriteSize.y;
        this.totalSprites = numSpritesX * numSpritesY;

        this.sprites = [];

        for (let i = 0; i < numSpritesY; i++) {
            const nextI = i+1;
            for (let j = 0; j < numSpritesX; j++) {
                const nextJ = j+1;

                const name: string = this.names[this.sprites.length] || `${this.name}-${this.sprites.length}`;

                const sprite: Sprite = new Sprite(this.rawSrc, name, "fit");
                sprite.startingPos = new Vector(j * this.spriteSize.x, i * this.spriteSize.y);
                sprite.finishPos = new Vector(nextJ * this.spriteSize.x, nextI * this.spriteSize.y);

                this.sprites.push(sprite);
            }
        }

        this.extOnLoad(this);
    }
}

type AnimationFrame = {
    duration: number;
    sprite: Sprite;
}

class SpriteAnimation {
    frames: AnimationFrame[];
    standardDelay: number;

    animTicks: number;
    totalTicks: number;

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

            this.totalTicks += o.duration + this.standardDelay;
        }

        this.currentFrameIndex = 0;

    }

    get currentSprite(): Sprite {
        return this.frames[this.currentFrameIndex].sprite;
    }

    indexFromTicks(ticks: number): number {
        for (let i = this.frames.length - 1; i >= 0; --i) {
            if (ticks >= this.startingTicks[i]) {
                return i;
            }
        }
        return -1;
    }

    step() {
        this.currentFrameIndex = this.indexFromTicks(this.animTicks);
        this.animTicks++;
        if (this.animTicks > this.totalTicks) this.animTicks = 0;

    }

    static fromSpriteSheet(sheet: SpriteSheet, durations: number[] | number): SpriteAnimation {

        const frameList: AnimationFrame[] = [];
        const sprites: Sprite[] = sheet.sprites; // TODO: Get sprites from spritesheet

        for (const i in sprites) {
            const frame: AnimationFrame = {
                sprite: sprites[i],
                duration: typeof durations === 'number' ? durations : durations[i]
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