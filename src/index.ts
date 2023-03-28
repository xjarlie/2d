import Entity from "./Entity";
import global from "./lib/global";
import { keyListener } from "./lib/keyMap";
import { tick } from "./tick";
import Player from "./Player";
import { Vector } from "./Vector";
import { EntityGroup } from "./lib/types";

function main() {

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");


    global.ctx = ctx;
    global.gravity = 9.81 * 200;
    // global.scale = 0.1;
    global.airConstant = 1;

    const player = new Player(200, 200);
    player.gravity = false;
    player.add();

    const ground = new Entity(300, 400, 300, 25);
    ground.gravity = false;
    ground.group = EntityGroup.Ground;
    ground.add();

    requestAnimationFrame(tick);

    window.addEventListener("keydown", (key) => {keyListener(key, 'down')});
    window.addEventListener("keyup", (key) => {keyListener(key, 'up')});

    // vector testing

    const a = new Vector(0.1, 1);
    const b = new Vector(2, 0.2);

    console.warn(Vector.divide(a, b, 10))

}

window.onload = main;