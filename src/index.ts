import Entity from "./Entity";
import global from "./lib/global";
import { keyListener } from "./lib/keyMap";
import { tick } from "./tick";
import Player from "./Player";
import { Vector } from "./Vector";
import { EntityGroup } from "./lib/types";
import Ground from "./Ground";
import Camera from "./Camera";

function main() {

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");


    global.ctx = ctx;
    global.gravity = 9.81 * 200;
    // global.scale = 0.1;
    global.airConstant = 1.5;

    const camera = new Camera(ctx);
    global.camera = camera;

    const player = new Player(200, 200);
    player.gravity = true;
    player.add();

    const box = new Entity(300, 200, 50, 50);
    box.group = EntityGroup.Box;
    box.add();

    const ground = new Ground(150, 400, 500, 25);
    ground.add();    

    requestAnimationFrame(tick);

    window.addEventListener("keydown", (key) => {keyListener(key, 'down')});
    window.addEventListener("keyup", (key) => {keyListener(key, 'up')});

    // vector testing

    const a = new Vector(-10, -10);
    const b = new Vector(0, 0);

    console.warn(Vector.subtract(a, b))

}

window.onload = main;