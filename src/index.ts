import Entity from "./Entity";
import global from "./global";
import { tick } from "./tick";

function main() {

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");


    global.ctx = ctx;
    global.gravity = 9.81;

    const testRect = new Entity(200, 200, 50, 50);
    testRect.gravity = true;
    testRect.add();

    const ground = new Entity(100, 400, 300, 25);
    ground.gravity = false;
    ground.add();

    requestAnimationFrame(tick);

}

main();