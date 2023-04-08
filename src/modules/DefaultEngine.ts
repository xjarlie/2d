import Engine from "../lib/Engine";
import Entity from "../lib/Entity";

class DefaultEngine extends Engine {
    constructor() {
        super();
        this.entities = [];
    }
}

export default DefaultEngine;