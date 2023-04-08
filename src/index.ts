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
import TopdownPhysics from "./modules/TopdownPhysics";
import TopdownPlayer from "./entities/TopdownPlayer";

let currentEngine: Engine;

function main() {

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const camera = new Camera(ctx);
    const physics = new TopdownPhysics({ airConstant: 10 });

    currentEngine = new DefaultEngine();
    currentEngine.camera = camera;
    currentEngine.physicsModule = physics;

    currentEngine.tick = tick;

    currentEngine.start();

    window.addEventListener("keydown", (key) => {keyListener(key, 'down')});
    window.addEventListener("keyup", (key) => {keyListener(key, 'up')});

    window.addEventListener("blur", (e) => { pause() });
    window.addEventListener("focus", (e) => { unpause() });

    const player = new TopdownPlayer(50, 50);
    currentEngine.add(player);

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