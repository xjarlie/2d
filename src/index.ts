import Entity from "./lib/Entity";
import global, { resetGlobal } from "./lib/global";
import { keyListener } from "./lib/keyMap";
import { pause, setTicks, tick, ticks, unpause } from "./lib/tick";
import Player from "./entities/Player";
import { Vector } from "./lib/Vector";
import { EntityGroup } from "./lib/types";
import Ground from "./entities/Ground";
import Camera from "./modules/Camera";
import { resetCollisions } from "./lib/collisions";
import DefaultPhysics from "./modules/DefaultPhysics";
import DefaultEngine from "./modules/DefaultEngine";
import Engine from "./lib/Engine";

let currentEngine: Engine;

function main() {

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const physics = new DefaultPhysics({
        gravity: 9.81 * 200,
        airConstant: 0.9
    });

    const camera = new Camera(ctx);

    currentEngine = new DefaultEngine();
    currentEngine.camera = camera;
    currentEngine.physicsModule = physics;
    currentEngine.entities = [];

    const player = new Player(200, 200);
    player.hasGravity = true;
    currentEngine.add(player);

    const box = new Entity(300, 200, 50, 50);
    box.groups.push(EntityGroup.Box);
    box.static = false;
    currentEngine.add(box);

    const smallBox = new Entity(400, 200, 30, 30);
    smallBox.groups.push(EntityGroup.Box);
    currentEngine.add(smallBox);

    // camera.glide(new Vector(300, 300), 60);

    // const smallBoxOne = new Entity(350, 200, 30, 30);
    // const smallBoxTwo = new Entity(400, 200, 30, 30);
    // const smallBoxes = new Composite(350, 200, [smallBoxOne, smallBoxTwo]);
    // smallBoxes.add();

    const ground = new Ground(150, 400, 1000, 25);
    currentEngine.add(ground);   
    
    global.handlerNum = requestAnimationFrame(tick);

    window.addEventListener("keydown", (key) => {keyListener(key, 'down')});
    window.addEventListener("keyup", (key) => {keyListener(key, 'up')});

    window.addEventListener("blur", (e) => { pause() });
    window.addEventListener("focus", (e) => { unpause() });

    // vector testing

    const a = new Vector(0, 0);
    const b = 2

    console.warn(Vector.divide(a, b))

}

function reset() {
    // pause();

    // currentEngine.entities = [];

    // currentEngine.camera.ctx.clearRect(0, 0, currentEngine.camera.ctx.canvas.width, currentEngine.camera.ctx.canvas.height);
    // setTicks(0);
    // resetGlobal();
    // resetCollisions();
    // console.log(global.handlerNum);
    // cancelAnimationFrame(global.handlerNum);

    // main();
    // unpause();
    window.location.href = window.location.href;
}


window.onload = () => { 
    main();
    // reset();
};

export { reset, currentEngine as engine };