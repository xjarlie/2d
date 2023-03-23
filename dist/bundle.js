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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ \"./src/Vector.ts\");\n/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global */ \"./src/global.ts\");\n\r\n\r\nvar Entity = /** @class */ (function () {\r\n    function Entity(posX, posY, sizeX, sizeY) {\r\n        if (posX === void 0) { posX = 0; }\r\n        if (posY === void 0) { posY = 0; }\r\n        if (sizeX === void 0) { sizeX = 50; }\r\n        if (sizeY === void 0) { sizeY = 50; }\r\n        this.position = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(posX, posY);\r\n        this.size = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(sizeX, sizeY);\r\n        this.velocity = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector();\r\n        this.force = new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector();\r\n        this.density = 1;\r\n        this.color = '#fff';\r\n        this.gravity = true;\r\n        this.id = crypto.randomUUID();\r\n    }\r\n    Object.defineProperty(Entity.prototype, \"acceleration\", {\r\n        get: function () {\r\n            return new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(this.force.x / this.mass, this.force.y / this.mass);\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Entity.prototype, \"area\", {\r\n        get: function () {\r\n            return this.size.x * this.size.y;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Entity.prototype, \"mass\", {\r\n        get: function () {\r\n            return this.area * this.density;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Entity.prototype.draw = function () {\r\n        var ctx = _global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ctx;\r\n        ctx.fillStyle = this.color;\r\n        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);\r\n    };\r\n    Entity.prototype.tick = function () {\r\n        // apply gravity\r\n        if (this.gravity)\r\n            this.force.y += _global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gravity;\r\n        this.velocity.add(this.acceleration);\r\n        this.position.add(this.velocity, this.acceleration.multipliedBy(0.5));\r\n        var entities = _global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].entities;\r\n        var collisions = this.collidingMultiple.apply(this, entities);\r\n        if (collisions.length > 0) {\r\n            this.color = 'red';\r\n        }\r\n        else {\r\n            this.color = 'white';\r\n        }\r\n        console.log(collisions);\r\n        // for (const o of collisions) {\r\n        //     this.force.subtract(o.force);\r\n        //     o.force.add(this.force);\r\n        // }\r\n    };\r\n    Entity.prototype.add = function () {\r\n        _global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].entities.push(this);\r\n    };\r\n    // Needs to return a collision vector rather than boolean\r\n    // describing direction, magnitude etc\r\n    Entity.prototype.collidingWith = function (entity) {\r\n        var a = this;\r\n        var b = entity;\r\n        return !(((a.position.y + a.size.y) < (b.position.y)) ||\r\n            (a.position.y > (b.position.y + b.size.y)) ||\r\n            ((a.position.x + a.size.x) < b.position.x) ||\r\n            (a.position.x > (b.position.x + b.size.x)));\r\n    };\r\n    Entity.prototype.collidingMultiple = function () {\r\n        var entities = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            entities[_i] = arguments[_i];\r\n        }\r\n        var colliding = [];\r\n        for (var _a = 0, entities_1 = entities; _a < entities_1.length; _a++) {\r\n            var o = entities_1[_a];\r\n            if (o.id === this.id)\r\n                continue;\r\n            if (this.collidingWith(o)) {\r\n                colliding.push(o);\r\n            }\r\n        }\r\n        return colliding;\r\n    };\r\n    return Entity;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Entity);\r\n\n\n//# sourceURL=webpack://canvassy/./src/Entity.ts?");

/***/ }),

/***/ "./src/Vector.ts":
/*!***********************!*\
  !*** ./src/Vector.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Vector\": () => (/* binding */ Vector)\n/* harmony export */ });\nvar Vector = /** @class */ (function () {\r\n    function Vector(x, y) {\r\n        if (x === void 0) { x = 0; }\r\n        if (y === void 0) { y = 0; }\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    Object.defineProperty(Vector.prototype, \"magnitude\", {\r\n        get: function () {\r\n            return Math.sqrt((this.x ^ 2) + (this.y ^ 2));\r\n        },\r\n        set: function (m) {\r\n            this.x = m * Math.cos(this.direction);\r\n            this.y = m * Math.sin(this.direction);\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Vector.prototype, \"direction\", {\r\n        get: function () {\r\n            return Math.atan((this.y / this.x));\r\n        },\r\n        set: function (d) {\r\n            this.x = this.magnitude * Math.cos(d);\r\n            this.y = this.magnitude * Math.sin(d);\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Vector.prototype.add = function () {\r\n        var props = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            props[_i] = arguments[_i];\r\n        }\r\n        for (var i in props) {\r\n            this.x += props[i].x;\r\n            this.y += props[i].y;\r\n        }\r\n    };\r\n    Vector.prototype.subtract = function () {\r\n        var props = [];\r\n        for (var _i = 0; _i < arguments.length; _i++) {\r\n            props[_i] = arguments[_i];\r\n        }\r\n        for (var _a = 0, props_1 = props; _a < props_1.length; _a++) {\r\n            var o = props_1[_a];\r\n            this.add(o.negative());\r\n        }\r\n    };\r\n    Vector.prototype.multiply = function (value) {\r\n        if (typeof value === 'number') {\r\n            this.x *= value;\r\n            this.y *= value;\r\n        }\r\n        else {\r\n            this.x *= value.x;\r\n            this.y *= value.y;\r\n        }\r\n    };\r\n    Vector.prototype.negative = function () {\r\n        return this.multipliedBy(-1);\r\n    };\r\n    Vector.prototype.multipliedBy = function (value) {\r\n        return new Vector(this.x * value, this.y * value);\r\n    };\r\n    Vector.fromPolar = function (magnitude, angle) {\r\n        var x = magnitude * Math.cos(angle);\r\n        var y = magnitude * Math.sin(angle);\r\n        return new Vector(x, y);\r\n    };\r\n    return Vector;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://canvassy/./src/Vector.ts?");

/***/ }),

/***/ "./src/global.ts":
/*!***********************!*\
  !*** ./src/global.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar global = {};\r\nglobal.entities = [];\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (global);\r\n\n\n//# sourceURL=webpack://canvassy/./src/global.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entity */ \"./src/Entity.ts\");\n/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global */ \"./src/global.ts\");\n/* harmony import */ var _tick__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tick */ \"./src/tick.ts\");\n\r\n\r\n\r\nfunction main() {\r\n    var canvas = document.getElementById('canvas');\r\n    var ctx = canvas.getContext(\"2d\");\r\n    _global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ctx = ctx;\r\n    _global__WEBPACK_IMPORTED_MODULE_1__[\"default\"].gravity = 9.81;\r\n    var testRect = new _Entity__WEBPACK_IMPORTED_MODULE_0__[\"default\"](200, 200, 50, 50);\r\n    testRect.gravity = true;\r\n    testRect.add();\r\n    var ground = new _Entity__WEBPACK_IMPORTED_MODULE_0__[\"default\"](100, 400, 300, 25);\r\n    ground.gravity = false;\r\n    ground.add();\r\n    requestAnimationFrame(_tick__WEBPACK_IMPORTED_MODULE_2__.tick);\r\n}\r\nmain();\r\n\n\n//# sourceURL=webpack://canvassy/./src/index.ts?");

/***/ }),

/***/ "./src/tick.ts":
/*!*********************!*\
  !*** ./src/tick.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"tick\": () => (/* binding */ tick),\n/* harmony export */   \"ticks\": () => (/* binding */ ticks)\n/* harmony export */ });\n/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ \"./src/global.ts\");\n\r\nvar ticks = 0;\r\nfunction tick(timestamp) {\r\n    _global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ctx.clearRect(0, 0, _global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ctx.canvas.width, _global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ctx.canvas.height);\r\n    var entities = _global__WEBPACK_IMPORTED_MODULE_0__[\"default\"].entities;\r\n    for (var i in entities) {\r\n        entities[i].tick();\r\n        entities[i].draw();\r\n    }\r\n    ticks++;\r\n    requestAnimationFrame(tick);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://canvassy/./src/tick.ts?");

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