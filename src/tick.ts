import Entity from "./Entity";
import global from "./global";

let ticks = 0;
function tick(timestamp: DOMHighResTimeStamp) {

    global.ctx.clearRect(0, 0, global.ctx.canvas.width, global.ctx.canvas.height);


    const entities: Entity[] = global.entities;

    for (const i in entities) {
        entities[i].tick();
        entities[i].draw();
    }


    ticks++;
    requestAnimationFrame(tick);

}

export { ticks, tick };