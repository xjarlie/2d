import Entity from "./Entity";
import global, { resetGlobal } from "./lib/global";
import { keyListener } from "./lib/keyMap";
import { pause, setTicks, tick, ticks, unpause } from "./tick";
import Player from "./Player";
import { Vector } from "./Vector";
import { EntityGroup } from "./lib/types";
import Ground from "./Ground";
import Camera from "./Camera";
import Composite from "./Composite";
import { resetCollisions } from "./lib/collisions";

function main() {

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");


    global.ctx = ctx;
    global.gravity = 9.81 * 200;
    // global.scale = 0.1;
    global.airConstant = 0.9;

    const camera = new Camera(ctx);
    global.camera = camera;

    const player = new Player(200, 200);
    player.gravity = true;
    player.add();

    const box = new Entity(300, 200, 50, 50);
    box.group = EntityGroup.Box;
    box.static = false;
    box.add();

    // camera.glide(new Vector(300, 300), 60);

    // const smallBoxOne = new Entity(350, 200, 30, 30);
    // const smallBoxTwo = new Entity(400, 200, 30, 30);
    // const smallBoxes = new Composite(350, 200, [smallBoxOne, smallBoxTwo]);
    // smallBoxes.add();

    const ground = new Ground(150, 400, 1000, 25);
    ground.add();    

    requestAnimationFrame(tick);

    window.addEventListener("keydown", (key) => {keyListener(key, 'down')});
    window.addEventListener("keyup", (key) => {keyListener(key, 'up')});

    window.addEventListener("blur", (e) => { pause() });
    window.addEventListener("focus", (e) => { unpause() });

    // vector testing

    const a = new Vector(-10, -10);
    const b = new Vector(0, 0);

    console.warn(Vector.subtract(a, b))

}

function reset() {
    pause();

    global.entities = [];
    global.ctx.clearRect(0, 0, global.ctx.canvas.width, global.ctx.canvas.height);
    setTicks(0);
    resetGlobal();
    resetCollisions();

    main();
    unpause();
}


window.onload = () => { 
    main();
    reset();
};

export { reset };