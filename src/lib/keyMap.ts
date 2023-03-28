const keyMap: any = {};

function keyPressed(key: string): boolean {
    return keyMap[key] === true;
}

function keyListener(e: KeyboardEvent, type: 'up' | 'down') {
    if (type === 'up') {

        keyMap[e.key] = false;
        delete keyMap[e.key];

    } else {

        keyMap[e.key] = true;

    }
}   

export { keyPressed, keyListener };