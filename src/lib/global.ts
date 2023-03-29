let global: any = {};

global.entities = [];

function resetGlobal() {
    global = {};
    global.entities = [];
}

export default global 
export { resetGlobal };