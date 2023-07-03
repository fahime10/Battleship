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

/***/ "./src/classes/gameboard.js":
/*!**********************************!*\
  !*** ./src/classes/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard)\n/* harmony export */ });\nclass Gameboard {\r\n    constructor() {\r\n        this.gameboard = createGameboard();\r\n    }\r\n\r\n    placeShip(location, placement, ship) {\r\n        let startPos = JSON.parse(JSON.stringify(location));\r\n\r\n        let shipLength = new Array(ship.length).fill(\" \");\r\n        const outOfBounds = this.checkOutOfBounds(location, placement, shipLength);\r\n\r\n        if (outOfBounds === \"collision\") {\r\n            return outOfBounds;\r\n        }\r\n\r\n        location = startPos;\r\n\r\n        for (let i = 0; i < ship.length; i++) {\r\n            this.gameboard[location.y][location.x] = ship;\r\n\r\n            if (placement === \"horizontal\") {\r\n                location.x++;\r\n            } else {\r\n                location.y++;\r\n            }\r\n        }\r\n    }\r\n\r\n    receiveAttack(location) {\r\n        const coord = this.gameboard[location.y][location.x];\r\n\r\n        if (coord === \"\") {\r\n            this.gameboard[location.y][location.x] = \"miss\";\r\n            return \"miss\";\r\n        }\r\n\r\n        if (this.gameboard[location.y][location.x] === \"[X]\") {\r\n            return;\r\n        }\r\n\r\n        if (typeof coord === \"object\") {\r\n            coord.hit();\r\n            this.gameboard[location.y][location.x] = \"[X]\";\r\n\r\n            if (coord.isSunk()) {\r\n                return \"sunk\";\r\n            }\r\n            \r\n            return \"hit\";\r\n        }\r\n    }\r\n\r\n    checkSunk() {\r\n        return this.gameboard.forEach((row) => {\r\n            row.forEach((element) => {\r\n                if (typeof element === \"object\") {\r\n                    return true;\r\n                } else {\r\n                    return false;\r\n                }\r\n            });\r\n        });\r\n    }\r\n\r\n    checkOutOfBounds(location, placement, ship) {\r\n        let check = ship.every(() => {\r\n            if (location.y > 9 || location.x > 9) {\r\n                return false;\r\n            }\r\n\r\n            if (typeof this.gameboard[location.y][location.x] === \"object\") {\r\n                return false;\r\n            }\r\n    \r\n            if (placement === \"horizontal\") {\r\n                location.x++;\r\n            } else {\r\n                location.y++;\r\n            }\r\n            return true;\r\n        });\r\n\r\n        if (check === false) {\r\n            return \"collision\";\r\n        }\r\n    }\r\n}\r\n\r\nfunction createGameboard() {\r\n    let gameboard = [];\r\n\r\n    for (let i = 0; i < 10; i++) {\r\n        let row = [];\r\n        for (let j = 0; j < 10; j++) {\r\n            row.push(\"\");\r\n        }\r\n        gameboard.push(row);\r\n    }\r\n\r\n    return gameboard;\r\n}\n\n//# sourceURL=webpack://battleship/./src/classes/gameboard.js?");

/***/ }),

/***/ "./src/classes/player.js":
/*!*******************************!*\
  !*** ./src/classes/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/classes/gameboard.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ \"./src/classes/ship.js\");\n\r\n\r\n\r\nclass Player {\r\n    constructor(name) {\r\n        this.name = name;\r\n        this.gameboard = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard();\r\n        this.ships = createShips();\r\n        this.moves = availableMoves();\r\n    }\r\n\r\n    placeShip(x, y, placement) {\r\n        const availableShip = this.ships.shift();\r\n\r\n        const result = \r\n            this.gameboard.placeShip({ x: x, y: y }, placement, availableShip);\r\n\r\n        if (result === \"collision\") {\r\n            this.ships.unshift(availableShip);\r\n        }\r\n    }\r\n\r\n    randomShips() {\r\n        const placement = [\"horizontal\", \"vertical\"];\r\n        while (this.ships.length !== 0) {\r\n            const x = Math.floor(Math.random() * 9);\r\n            const y = Math.floor(Math.random() * 9);\r\n            const thisPlacement = placement[Math.floor(Math.random())];\r\n            this.placeShip(x, y, thisPlacement);\r\n        }\r\n    }\r\n\r\n    randomAttack() {\r\n        let coord = this.moves[Math.floor(Math.random() * this.moves.length)];\r\n        const index = this.moves.indexOf(coord);\r\n\r\n        if (index > - 1) {\r\n            this.moves.splice(index, 1);\r\n        }\r\n\r\n        return this.gameboard.receiveAttack(coord);\r\n    }\r\n}\r\n\r\nfunction createShips() {\r\n    const lengths = [2, 3, 4, 1, 1];\r\n    const ships = [];\r\n\r\n    lengths.forEach((length) => {\r\n        ships.push(new _ship_js__WEBPACK_IMPORTED_MODULE_1__.Ship(length));\r\n    });\r\n\r\n    return ships;\r\n}\r\n\r\nfunction availableMoves() {\r\n    const moves = [];\r\n\r\n    for (let i = 0; i < 10; i++) {\r\n        for (let j = 0; j < 10; j++) {\r\n            moves.push({ x: i, y: j });\r\n        }\r\n    }\r\n\r\n    return moves;\r\n}\n\n//# sourceURL=webpack://battleship/./src/classes/player.js?");

/***/ }),

/***/ "./src/classes/ship.js":
/*!*****************************!*\
  !*** ./src/classes/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\r\n    constructor(length) {\r\n        this.length = length;\r\n        this.hits = 0;\r\n        this.sunk = false;\r\n    }\r\n\r\n    hit() {\r\n        this.hits++;\r\n    }\r\n\r\n    isSunk() {\r\n        if (this.hits >= this.length) {\r\n            this.sunk = true;\r\n\r\n            return true;\r\n        } else {\r\n            \r\n            return false;\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://battleship/./src/classes/ship.js?");

/***/ }),

/***/ "./src/components/initial-page.js":
/*!****************************************!*\
  !*** ./src/components/initial-page.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   menuScreen: () => (/* binding */ menuScreen)\n/* harmony export */ });\nfunction menuScreen() {\r\n    const header = buildHeader();\r\n\r\n    const main = document.createElement(\"main\");\r\n    main.append(buildSection());\r\n\r\n    const footer = buildFooter();\r\n\r\n    document.body.append(header, main, footer);\r\n}\r\n\r\nfunction buildHeader() {\r\n    const header = document.createElement(\"header\");\r\n    const h1 = document.createElement(\"h1\");\r\n    h1.textContent = \"Battleship Game\";\r\n    header.append(h1);\r\n\r\n    return header;\r\n}\r\n\r\nfunction buildSection() {\r\n    const section = document.createElement(\"section\");\r\n    section.setAttribute(\"class\", \"menu\");\r\n\r\n    const label = document.createElement(\"label\");\r\n    label.setAttribute(\"for\", \"name\");\r\n    label.textContent = \"Please enter your name\";\r\n\r\n    const input = document.createElement(\"input\");\r\n    input.setAttribute(\"id\", \"name\");\r\n    input.setAttribute(\"type\", \"text\");\r\n\r\n    const button = document.createElement(\"button\");\r\n    button.textContent = \"Start Game\";\r\n\r\n    section.append(label, input, button);\r\n\r\n    return section;\r\n}\r\n\r\nfunction buildFooter() {\r\n    const footer = document.createElement(\"footer\");\r\n    footer.textContent = \"Developed by Fahim Ahmed\";\r\n\r\n    return footer;\r\n}\n\n//# sourceURL=webpack://battleship/./src/components/initial-page.js?");

/***/ }),

/***/ "./src/game/startGame.js":
/*!*******************************!*\
  !*** ./src/game/startGame.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   startGame: () => (/* binding */ startGame)\n/* harmony export */ });\n/* harmony import */ var _classes_ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/ship.js */ \"./src/classes/ship.js\");\n/* harmony import */ var _classes_gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/gameboard.js */ \"./src/classes/gameboard.js\");\n/* harmony import */ var _classes_player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/player.js */ \"./src/classes/player.js\");\n/* harmony import */ var _components_initial_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/initial-page */ \"./src/components/initial-page.js\");\n\r\n\r\n\r\n\r\n\r\nfunction startGame() {\r\n    (0,_components_initial_page__WEBPACK_IMPORTED_MODULE_3__.menuScreen)();\r\n}\n\n//# sourceURL=webpack://battleship/./src/game/startGame.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_startGame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/startGame.js */ \"./src/game/startGame.js\");\n\r\n\r\n(0,_game_startGame_js__WEBPACK_IMPORTED_MODULE_0__.startGame)();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;