/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Entity.ts":
/*!***********************!*\
  !*** ./src/Entity.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ \"./src/Vector.ts\");\n/* harmony import */ var _lib_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/global */ \"./src/lib/global.ts\");\n/* harmony import */ var _lib_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/types */ \"./src/lib/types.ts\");\n/* harmony import */ var _lib_getEntities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/getEntities */ \"./src/lib/getEntities.ts\");\n/* harmony import */ var _lib_collisions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/collisions */ \"./src/lib/collisions.ts\");\n\r\n\r\n\r\n\r\n\r\nvar Entity = /** @class */ (function () {\r\n    function Entity(posX, posY, sizeX, sizeY) {\r\n        if (posX === void 0) { posX = 0; }\r\n        if (posY === void 0) { posY = 0; }\r\n        if (sizeX === void 0) { sizeX = 50; }\r\n        if (sizeY === void 0) { sizeY = 50; }\r\n        this.position = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(posX, posY);\r\n        this.size = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(sizeX, sizeY);\r\n        this.velocity = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector();\r\n        this.acceleration = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector();\r\n        this.density = 1;\r\n        this.color = '#fff';\r\n        this.gravity = true;\r\n        this.drag = 0.1;\r\n        this.force = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector();\r\n        this.group = _lib_types__WEBPACK_IMPORTED_MODULE_2__.EntityGroup.Default;\r\n        this.id = -1;\r\n    }\r\n    Object.defineProperty(Entity.prototype, \"area\", {\r\n        get: function () {\r\n            return this.size.x * this.size.y;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Entity.prototype, \"mass\", {\r\n        get: function () {\r\n            return this.area * this.density;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Entity.prototype.applyForce = function (f) {\r\n        // this.acceleration = Vector.sum(this.acceleration, Vector.divide(f, this.mass));\r\n        this.force = _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.sum(this.force, f);\r\n    };\r\n    Entity.prototype.draw = function (position) {\r\n        if (position === void 0) { position = this.position; }\r\n        var ctx = _lib_global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ctx;\r\n        ctx.fillStyle = this.color;\r\n        ctx.fillRect(position.x, position.y, this.size.x, this.size.y);\r\n    };\r\n    Entity.prototype.tick = function (deltaTime) {\r\n        //console.log(this.acceleration);\r\n        // apply gravity\r\n        if (this.gravity)\r\n            this.acceleration.y += _lib_global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gravity;\r\n        var deltaTimeS = deltaTime / 1000;\r\n        // apply air resistance\r\n        var airRes = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(0, 0);\r\n        airRes.x = -0.5 * _lib_global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].airConstant * (this.size.y / 1) * Math.pow(this.velocity.x, 2) * Math.sign(this.velocity.x);\r\n        airRes.y = -0.5 * _lib_global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].airConstant * (this.size.x / 1) * Math.pow(this.velocity.y, 2) * Math.sign(this.velocity.y);\r\n        this.force = _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.sum(this.force, airRes);\r\n        // apply acceleration a = f/m\r\n        this.acceleration = _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.sum(this.acceleration, _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.divide(this.force, this.mass));\r\n        // this.acceleration.x += 1;\r\n        // this.acceleration.y += 1;\r\n        // apply velocity & position\r\n        // v = u + at\r\n        this.velocity = _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.sum(this.velocity, _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.multiply(this.acceleration, deltaTimeS));\r\n        this.position = _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.sum(this.position, _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector.multiply(this.velocity, deltaTimeS));\r\n        var entities = _lib_global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].entities;\r\n        var collisions = this.collidingMultiple.apply(this, entities);\r\n        if (collisions.length > 0) {\r\n            this.color = 'red';\r\n        }\r\n        else {\r\n            this.color = 'white';\r\n        }\r\n        // for (const o of collisions) {\r\n        //     this.force.subtract(o.force);\r\n        //     o.force.add(this.force);\r\n        // }\r\n        this.force = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector();\r\n        this.acceleration = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector();\r\n    };\r\n    Entity.prototype.add = function () {\r\n        this.id = (0,_lib_getEntities__WEBPACK_IMPORTED_MODULE_3__.nextID)();\r\n        _lib_global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].entities.push(this);\r\n    };\r\n    // Needs to return a collision vector rather than boolean\r\n    // describing direction, magnitude etc\r\n    Entity.prototype.collidingWith = function (entity) {\r\n        var a = this;\r\n        var b = entity;\r\n        return !(((a.position.y + a.size.y) < (b.position.y)) ||\r\n            (a.position.y > (b.position.y + b.size.y)) ||\r\n            ((a.position.x + a.size.x) < b.position.x) ||\r\n            (a.position.x > (b.position.x + b.size.x)));\r\n    };\r\n    Entity.prototype.collidingMultiple = function () {\r\n        var entities = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            entities[_i] = arguments[_i];\r\n        }\r\n        var colliding = [];\r\n        for (var _a = 0, entities_1 = entities; _a < entities_1.length; _a++) {\r\n            var o = entities_1[_a];\r\n            if (o.id === this.id)\r\n                continue;\r\n            if (this.collidingWith(o)) {\r\n                colliding.push(o);\r\n            }\r\n        }\r\n        return colliding;\r\n    };\r\n    Entity.areColliding = function (a, b) {\r\n        return !(((a.position.y + a.size.y) < (b.position.y)) ||\r\n            (a.position.y > (b.position.y + b.size.y)) ||\r\n            ((a.position.x + a.size.x) < b.position.x) ||\r\n            (a.position.x > (b.position.x + b.size.x)));\r\n    };\r\n    Entity.getCollisionBetween = function (a, b) {\r\n        if (!Entity.areColliding(a, b))\r\n            return null;\r\n        var collision = new _lib_collisions__WEBPACK_IMPORTED_MODULE_4__.Collision(a, b, 0, 0);\r\n    };\r\n    return Entity;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Entity);\r\n\n\n//# sourceURL=webpack://canvassy/./src/Entity.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entity */ \"./src/Entity.ts\");\n/* harmony import */ var _lib_keyMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/keyMap */ \"./src/lib/keyMap.ts\");\n/* harmony import */ var _lib_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/types */ \"./src/lib/types.ts\");\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Vector */ \"./src/Vector.ts\");\n/* harmony import */ var _lib_global__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/global */ \"./src/lib/global.ts\");\n/* harmony import */ var _tick__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tick */ \"./src/tick.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\n\r\n\r\n\r\n\r\nvar Player = /** @class */ (function (_super) {\r\n    __extends(Player, _super);\r\n    function Player(posX, posY) {\r\n        var _this = _super.call(this, posX, posY, 50, 50) || this;\r\n        _this.movementForce = 2500000;\r\n        _this.density = 1;\r\n        _this.group = _lib_types__WEBPACK_IMPORTED_MODULE_2__.EntityGroup.Player;\r\n        return _this;\r\n    }\r\n    Player.prototype.tick = function (deltaTime) {\r\n        _super.prototype.tick.call(this, deltaTime);\r\n        if ((0,_lib_keyMap__WEBPACK_IMPORTED_MODULE_1__.keyPressed)(\"d\")) {\r\n            this.applyForce(_Vector__WEBPACK_IMPORTED_MODULE_3__.Vector.fromPolar(this.movementForce, 0));\r\n        }\r\n        if ((0,_lib_keyMap__WEBPACK_IMPORTED_MODULE_1__.keyPressed)(\"a\")) {\r\n            this.applyForce(_Vector__WEBPACK_IMPORTED_MODULE_3__.Vector.fromPolar(this.movementForce, Math.PI));\r\n        }\r\n        if ((0,_lib_keyMap__WEBPACK_IMPORTED_MODULE_1__.keyPressed)(\"s\")) {\r\n            this.applyForce(_Vector__WEBPACK_IMPORTED_MODULE_3__.Vector.fromPolar(this.movementForce, Math.PI * 0.5));\r\n        }\r\n        if ((0,_lib_keyMap__WEBPACK_IMPORTED_MODULE_1__.keyPressed)(\"w\")) {\r\n            this.applyForce(_Vector__WEBPACK_IMPORTED_MODULE_3__.Vector.fromPolar(this.movementForce, Math.PI * 1.5));\r\n        }\r\n        console.log(_tick__WEBPACK_IMPORTED_MODULE_5__.ticks, _lib_global__WEBPACK_IMPORTED_MODULE_4__[\"default\"].entities);\r\n    };\r\n    return Player;\r\n}(_Entity__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\r\n\n\n//# sourceURL=webpack://canvassy/./src/Player.ts?");

/***/ }),

/***/ "./src/Vector.ts":
/*!***********************!*\
  !*** ./src/Vector.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Vector\": () => (/* binding */ Vector)\n/* harmony export */ });\nvar Vector = /** @class */ (function () {\r\n    function Vector(x, y) {\r\n        if (x === void 0) { x = 0; }\r\n        if (y === void 0) { y = 0; }\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    Object.defineProperty(Vector.prototype, \"magnitude\", {\r\n        get: function () {\r\n            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));\r\n        },\r\n        set: function (m) {\r\n            this.x = m * Math.cos(this.direction);\r\n            this.y = m * Math.sin(this.direction);\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Vector.prototype, \"direction\", {\r\n        get: function () {\r\n            return Math.atan2(this.y, this.x);\r\n        },\r\n        set: function (d) {\r\n            this.x = this.magnitude * Math.cos(d);\r\n            this.y = this.magnitude * Math.sin(d);\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Vector.prototype.negative = function () {\r\n        return Vector.multiply(this, -1);\r\n    };\r\n    Vector.fromPolar = function (magnitude, angle) {\r\n        var x = Math.round(magnitude * Math.cos(angle));\r\n        var y = (magnitude * Math.sin(angle));\r\n        return new Vector(x, y);\r\n    };\r\n    Vector.normalise = function (target) {\r\n        return Vector.divide(target, target.magnitude);\r\n    };\r\n    Vector.dot = function (a, b) {\r\n        return a.x * b.x + a.y * b.y;\r\n    };\r\n    Vector.round = function (v) {\r\n        return new Vector(Math.round(v.x), Math.round(v.y));\r\n    };\r\n    Vector.multiply = function (target) {\r\n        var vectors = [];\r\n        for (var _i = 1; _i < arguments.length; _i++) {\r\n            vectors[_i - 1] = arguments[_i];\r\n        }\r\n        var result = new Vector(target.x, target.y);\r\n        for (var _a = 0, vectors_1 = vectors; _a < vectors_1.length; _a++) {\r\n            var o = vectors_1[_a];\r\n            if (typeof o === 'number') {\r\n                result.x = result.x * o;\r\n                result.y = result.y * o;\r\n            }\r\n            else {\r\n                result.x = result.x * o.x;\r\n                result.y = result.y * o.y;\r\n            }\r\n        }\r\n        return result;\r\n    };\r\n    Vector.divide = function (target) {\r\n        var vectors = [];\r\n        for (var _i = 1; _i < arguments.length; _i++) {\r\n            vectors[_i - 1] = arguments[_i];\r\n        }\r\n        var result = new Vector(target.x, target.y);\r\n        for (var _a = 0, vectors_2 = vectors; _a < vectors_2.length; _a++) {\r\n            var o = vectors_2[_a];\r\n            if (typeof o === 'number') {\r\n                result.x = result.x / o;\r\n                result.y = result.y / o;\r\n            }\r\n            else {\r\n                result.x = result.x / o.x;\r\n                result.y = result.y / o.y;\r\n            }\r\n        }\r\n        return result;\r\n    };\r\n    Vector.sum = function () {\r\n        var vectors = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            vectors[_i] = arguments[_i];\r\n        }\r\n        var result = new Vector();\r\n        for (var _a = 0, vectors_3 = vectors; _a < vectors_3.length; _a++) {\r\n            var o = vectors_3[_a];\r\n            result.x += o.x;\r\n            result.y += o.y;\r\n        }\r\n        return result;\r\n    };\r\n    Vector.subtract = function () {\r\n        var vectors = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            vectors[_i] = arguments[_i];\r\n        }\r\n        var result = new Vector();\r\n        for (var _a = 0, vectors_4 = vectors; _a < vectors_4.length; _a++) {\r\n            var o = vectors_4[_a];\r\n            result.x -= o.x;\r\n            result.y -= o.y;\r\n        }\r\n        return result;\r\n    };\r\n    return Vector;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://canvassy/./src/Vector.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entity */ \"./src/Entity.ts\");\n/* harmony import */ var _lib_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/global */ \"./src/lib/global.ts\");\n/* harmony import */ var _lib_keyMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/keyMap */ \"./src/lib/keyMap.ts\");\n/* harmony import */ var _tick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tick */ \"./src/tick.ts\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Vector */ \"./src/Vector.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nfunction main() {\r\n    var canvas = document.getElementById('canvas');\r\n    var ctx = canvas.getContext(\"2d\");\r\n    _lib_global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ctx = ctx;\r\n    _lib_global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gravity = 9.81 * 200;\r\n    // global.scale = 0.1;\r\n    _lib_global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].airConstant = 1;\r\n    var player = new _Player__WEBPACK_IMPORTED_MODULE_4__[\"default\"](200, 200);\r\n    player.gravity = false;\r\n    player.add();\r\n    var ground = new _Entity__WEBPACK_IMPORTED_MODULE_0__[\"default\"](100, 400, 300, 25);\r\n    ground.gravity = false;\r\n    ground.add();\r\n    requestAnimationFrame(_tick__WEBPACK_IMPORTED_MODULE_3__.tick);\r\n    window.addEventListener(\"keydown\", function (key) { (0,_lib_keyMap__WEBPACK_IMPORTED_MODULE_2__.keyListener)(key, 'down'); });\r\n    window.addEventListener(\"keyup\", function (key) { (0,_lib_keyMap__WEBPACK_IMPORTED_MODULE_2__.keyListener)(key, 'up'); });\r\n    // vector testing\r\n    var a = new _Vector__WEBPACK_IMPORTED_MODULE_5__.Vector(0.1, 1);\r\n    var b = new _Vector__WEBPACK_IMPORTED_MODULE_5__.Vector(2, 0.2);\r\n    console.warn(_Vector__WEBPACK_IMPORTED_MODULE_5__.Vector.divide(a, b, 10));\r\n}\r\nwindow.onload = main;\r\n\n\n//# sourceURL=webpack://canvassy/./src/index.ts?");

/***/ }),

/***/ "./src/lib/collisions.ts":
/*!*******************************!*\
  !*** ./src/lib/collisions.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Collision\": () => (/* binding */ Collision),\n/* harmony export */   \"getCollisions\": () => (/* binding */ getCollisions),\n/* harmony export */   \"handleCollisions\": () => (/* binding */ handleCollisions)\n/* harmony export */ });\n/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Entity */ \"./src/Entity.ts\");\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ \"./src/Vector.ts\");\n/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global */ \"./src/lib/global.ts\");\n\r\n\r\n\r\nvar collisions = [];\r\nfunction handleCollisions() {\r\n    // update collision array\r\n    // called every tick\r\n    var entities = _global__WEBPACK_IMPORTED_MODULE_2__[\"default\"].entities;\r\n    // loop through all entities, and check for box collisions\r\n    for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {\r\n        var o = entities_1[_i];\r\n        var current = o;\r\n        // check every other entity for collisions\r\n        for (var _a = 0, entities_2 = entities; _a < entities_2.length; _a++) {\r\n            var p = entities_2[_a];\r\n            if (p === o)\r\n                continue;\r\n            // first, check that they are nearby each other for performance\r\n            // then, specific collision\r\n            var collision = _Entity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getCollisionBetween(o, p);\r\n            if (collision !== null) {\r\n                collisions.push(collision);\r\n            }\r\n        }\r\n    }\r\n}\r\nfunction getCollisions(target) {\r\n    return collisions.filter(function (o) { return o.bodyA === target || o.bodyB === target; });\r\n}\r\nvar Collision = /** @class */ (function () {\r\n    function Collision(a, b, x, y) {\r\n        this.bodyA = a;\r\n        this.bodyB = b;\r\n        this.vector = new _Vector__WEBPACK_IMPORTED_MODULE_1__.Vector(x, y);\r\n    }\r\n    return Collision;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://canvassy/./src/lib/collisions.ts?");

/***/ }),

/***/ "./src/lib/getEntities.ts":
/*!********************************!*\
  !*** ./src/lib/getEntities.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getByGroup\": () => (/* binding */ getByGroup),\n/* harmony export */   \"getById\": () => (/* binding */ getById),\n/* harmony export */   \"nextID\": () => (/* binding */ nextID)\n/* harmony export */ });\n/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ \"./src/lib/global.ts\");\n\r\nfunction getById(id) {\r\n    var entities = _global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].entities;\r\n    return entities.filter(function (o) { return o.id === id; })[0];\r\n}\r\nfunction nextID() {\r\n    var entities = _global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].entities;\r\n    return entities.length;\r\n}\r\nfunction getByGroup(group) {\r\n    var entities = _global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].entities;\r\n    return entities.filter(function (o) { return o.group === group; });\r\n}\r\n\n\n//# sourceURL=webpack://canvassy/./src/lib/getEntities.ts?");

/***/ }),

/***/ "./src/lib/global.ts":
/*!***************************!*\
  !*** ./src/lib/global.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar global = {};\r\nglobal.entities = [];\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (global);\r\n\n\n//# sourceURL=webpack://canvassy/./src/lib/global.ts?");

/***/ }),

/***/ "./src/lib/keyMap.ts":
/*!***************************!*\
  !*** ./src/lib/keyMap.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"keyListener\": () => (/* binding */ keyListener),\n/* harmony export */   \"keyPressed\": () => (/* binding */ keyPressed)\n/* harmony export */ });\nvar keyMap = {};\r\nfunction keyPressed(key) {\r\n    return keyMap[key] === true;\r\n}\r\nfunction keyListener(e, type) {\r\n    if (type === 'up') {\r\n        console.log('Keyup: ', e.key);\r\n        keyMap[e.key] = false;\r\n        delete keyMap[e.key];\r\n    }\r\n    else {\r\n        console.log('Keydown: ', e.key);\r\n        keyMap[e.key] = true;\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://canvassy/./src/lib/keyMap.ts?");

/***/ }),

/***/ "./src/lib/types.ts":
/*!**************************!*\
  !*** ./src/lib/types.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EntityGroup\": () => (/* binding */ EntityGroup)\n/* harmony export */ });\nvar EntityGroup;\r\n(function (EntityGroup) {\r\n    EntityGroup[EntityGroup[\"Default\"] = 0] = \"Default\";\r\n    EntityGroup[EntityGroup[\"Ground\"] = 1] = \"Ground\";\r\n    EntityGroup[EntityGroup[\"Player\"] = 2] = \"Player\";\r\n})(EntityGroup || (EntityGroup = {}));\r\n\n\n//# sourceURL=webpack://canvassy/./src/lib/types.ts?");

/***/ }),

/***/ "./src/tick.ts":
/*!*********************!*\
  !*** ./src/tick.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"tick\": () => (/* binding */ tick),\n/* harmony export */   \"ticks\": () => (/* binding */ ticks)\n/* harmony export */ });\n/* harmony import */ var _lib_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/global */ \"./src/lib/global.ts\");\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\r\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\r\n        if (ar || !(i in from)) {\r\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\r\n            ar[i] = from[i];\r\n        }\r\n    }\r\n    return to.concat(ar || Array.prototype.slice.call(from));\r\n};\r\n\r\nvar ticks = 0;\r\nvar lastTimestamp = 0;\r\n_lib_global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].tps = 0;\r\nfunction tick(timestamp) {\r\n    var deltaTime = timestamp - lastTimestamp;\r\n    _lib_global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].tps = 1 / (deltaTime / 1000);\r\n    //console.info('TPS: ', global.tps);\r\n    _lib_global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ctx.clearRect(0, 0, _lib_global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ctx.canvas.width, _lib_global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ctx.canvas.height);\r\n    var entities = __spreadArray([], _lib_global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].entities, true);\r\n    //console.log('TICK RUNNING', ticks);\r\n    for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {\r\n        var o = entities_1[_i];\r\n        if (ticks > 5)\r\n            o.tick(deltaTime);\r\n        o.draw();\r\n    }\r\n    lastTimestamp = timestamp;\r\n    ticks++;\r\n    requestAnimationFrame(tick);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://canvassy/./src/tick.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;