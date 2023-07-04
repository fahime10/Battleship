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

/***/ "./src/components/grid.js":
/*!********************************!*\
  !*** ./src/components/grid.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createGrid: () => (/* binding */ createGrid)\n/* harmony export */ });\nfunction createGrid(message) {\r\n    const gridContainer = document.createElement(\"section\");\r\n    gridContainer.classList.add(\"grid-container\");\r\n\r\n    const prompt = document.createElement(\"h2\");\r\n    prompt.textContent = message;\r\n\r\n    const grid = document.createElement(\"div\");\r\n    grid.classList.add(\"grid\");\r\n\r\n    for (let i = 0; i < 10; i++) {\r\n        const row = document.createElement(\"div\");\r\n        row.classList.add(\"row\");\r\n\r\n        for (let j = 0; j < 10; j++) {\r\n            const cell = document.createElement(\"div\");\r\n            cell.classList.add(\"cell\");\r\n            cell.setAttribute(\"location\", `{\"x\": \"${j}\", \"y\": \"${i}\"}`);\r\n\r\n            row.appendChild(cell);\r\n        }\r\n\r\n        grid.appendChild(row);\r\n    }\r\n\r\n    gridContainer.append(prompt, grid);\r\n    return gridContainer;\r\n}\n\n//# sourceURL=webpack://battleship/./src/components/grid.js?");

/***/ }),

/***/ "./src/components/initial-page.js":
/*!****************************************!*\
  !*** ./src/components/initial-page.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   menuScreen: () => (/* binding */ menuScreen)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./src/components/validate.js\");\n/* harmony import */ var _game_startGame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game/startGame.js */ \"./src/game/startGame.js\");\n\r\n\r\n\r\nfunction menuScreen() {\r\n    const header = buildHeader();\r\n\r\n    const main = document.createElement(\"main\");\r\n    main.append(buildSection());\r\n\r\n    const footer = buildFooter();\r\n\r\n    document.body.append(header, main, footer);\r\n}\r\n\r\nfunction buildHeader() {\r\n    const header = document.createElement(\"header\");\r\n    const h1 = document.createElement(\"h1\");\r\n    h1.textContent = \"Battleship Game\";\r\n    header.append(h1);\r\n\r\n    return header;\r\n}\r\n\r\nfunction buildSection() {\r\n    const section = document.createElement(\"section\");\r\n    section.setAttribute(\"class\", \"menu\");\r\n\r\n    const label = document.createElement(\"label\");\r\n    label.setAttribute(\"for\", \"name\");\r\n    label.textContent = \"Please enter your name\";\r\n\r\n    const span = document.createElement(\"span\");\r\n    span.textContent = \"Name must be at least one character\";\r\n\r\n    const input = document.createElement(\"input\");\r\n    input.setAttribute(\"id\", \"name\");\r\n    input.setAttribute(\"type\", \"text\");\r\n    input.setAttribute(\"maxlength\", \"20\");\r\n\r\n    const button = document.createElement(\"button\");\r\n    button.textContent = \"Start Game\";\r\n    button.setAttribute(\"class\", \"start\");\r\n    \r\n    button.addEventListener(\"click\", () => {\r\n        let name = document.querySelector(\"#name\").value;\r\n        name = name.trim();\r\n\r\n        if ((0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.validate)(name)) {\r\n            (0,_game_startGame_js__WEBPACK_IMPORTED_MODULE_1__.startGame)(name);\r\n        }\r\n    });\r\n\r\n    section.append(label, span, input, button);\r\n\r\n    return section;\r\n}\r\n\r\nfunction buildFooter() {\r\n    const footer = document.createElement(\"footer\");\r\n    footer.textContent = \"Developed by Fahim Ahmed\";\r\n\r\n    return footer;\r\n}\n\n//# sourceURL=webpack://battleship/./src/components/initial-page.js?");

/***/ }),

/***/ "./src/components/placingShip.js":
/*!***************************************!*\
  !*** ./src/components/placingShip.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   placingShip: () => (/* binding */ placingShip)\n/* harmony export */ });\nfunction placingShip(size) {\r\n    const container = document.createElement(\"section\");\r\n    container.setAttribute(\"id\", \"new-ship\");\r\n\r\n    const h2 = document.createElement(\"h2\");\r\n\r\n    if (size === 0) {\r\n        h2.textContent = \"All ships placed\";\r\n        container.appendChild(h2);\r\n\r\n        return container;\r\n    }\r\n\r\n    h2.textContent = \"Next ship: \";\r\n    h2.ariaValueText = `Next ship: ${size} long`;\r\n\r\n    const row = document.createElement(\"div\");\r\n    row.classList.add(\"row\");\r\n\r\n    for (let i = 0; i < size; i++) {\r\n        const cell = document.createElement(\"div\");\r\n        cell.classList.add(\"cell\");\r\n\r\n        row.appendChild(cell);\r\n    }\r\n\r\n    container.append(h2, row);\r\n    return container;\r\n}\n\n//# sourceURL=webpack://battleship/./src/components/placingShip.js?");

/***/ }),

/***/ "./src/components/validate.js":
/*!************************************!*\
  !*** ./src/components/validate.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   validate: () => (/* binding */ validate)\n/* harmony export */ });\nfunction validate(name) {\r\n    if (name.length === 0) {\r\n        document.querySelector(\"span\").style.display = \"block\";\r\n        return false;\r\n    } else {\r\n        document.querySelector(\"span\").style.display = \"none\";\r\n        return true;\r\n    }\r\n}\n\n//# sourceURL=webpack://battleship/./src/components/validate.js?");

/***/ }),

/***/ "./src/game/createGame.js":
/*!********************************!*\
  !*** ./src/game/createGame.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createGame: () => (/* binding */ createGame)\n/* harmony export */ });\n/* harmony import */ var _components_grid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/grid.js */ \"./src/components/grid.js\");\n/* harmony import */ var _components_placingShip_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/placingShip.js */ \"./src/components/placingShip.js\");\n\r\n\r\n\r\nfunction createGame(ship) {\r\n    document.querySelector(\"main\").innerHTML = \"\";\r\n\r\n    const gameContainer = document.createElement(\"div\");\r\n    gameContainer.setAttribute(\"id\", \"setup-container\");\r\n\r\n    const grid = (0,_components_grid_js__WEBPACK_IMPORTED_MODULE_0__.createGrid)(\"Place ships whithout overlapping them\");\r\n\r\n    const error = document.createElement(\"span\");\r\n    error.textContent = \"Place all ships before starting\";\r\n\r\n    const placementContainer = document.createElement(\"section\");\r\n    placementContainer.classList.add(\"placement-container\");\r\n\r\n    const h2 = document.createElement(\"h2\");\r\n    h2.setAttribute(\"id\", \"current-placement\");\r\n    h2.textContent = \"Current placement: horizontal\";\r\n\r\n    const button = document.createElement(\"button\");\r\n    button.textContent = \"Change to vertical\";\r\n    button.addEventListener(\"click\", () => {\r\n        changePlacement(h2, button);\r\n    });\r\n\r\n    placementContainer.append(h2, button);\r\n\r\n    const newShip = (0,_components_placingShip_js__WEBPACK_IMPORTED_MODULE_1__.placingShip)(ship);\r\n\r\n    const buttonContainer = document.createElement(\"section\");\r\n    buttonContainer.setAttribute(\"id\", \"button-container\");\r\n    \r\n    const reset = document.createElement(\"button\");\r\n    reset.textContent = \"Reset\";\r\n    reset.setAttribute(\"id\", \"reset-button\");\r\n\r\n    const random = document.createElement(\"button\");\r\n    random.textContent = \"Random Place\";\r\n    random.setAttribute(\"id\", \"random-button\");\r\n\r\n    buttonContainer.append(reset, random);\r\n\r\n    const startGameContainer = document.createElement(\"section\");\r\n    startGameContainer.setAttribute(\"id\", \"start-game-container\");\r\n\r\n    const startGame = document.createElement(\"button\");\r\n    startGame.setAttribute(\"id\", \"start-button\");\r\n    startGame.textContent = \"Start Game\";\r\n\r\n    startGameContainer.appendChild(startGame);\r\n\r\n    gameContainer.append(error, grid, placementContainer, newShip,\r\n        buttonContainer, startGameContainer);\r\n    \r\n    document.querySelector(\"main\").append(gameContainer);\r\n\r\n}\r\n\r\nfunction changePlacement(header, button) {\r\n    if (header.textContent === \"Current placement: horizontal\") {\r\n        header.textContent = \"Current placement: vertical\";\r\n        button.textContent = \"Change to horizontal\";\r\n    } else {\r\n        header.textContent = \"Current placement: horizontal\";\r\n        button.textContent = \"Change to vertical\";\r\n    }\r\n}\n\n//# sourceURL=webpack://battleship/./src/game/createGame.js?");

/***/ }),

/***/ "./src/game/gameLoop.js":
/*!******************************!*\
  !*** ./src/game/gameLoop.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gameLoop: () => (/* binding */ gameLoop)\n/* harmony export */ });\nfunction gameLoop() {\r\n    \r\n}\n\n//# sourceURL=webpack://battleship/./src/game/gameLoop.js?");

/***/ }),

/***/ "./src/game/orientation.js":
/*!*********************************!*\
  !*** ./src/game/orientation.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getOrientation: () => (/* binding */ getOrientation)\n/* harmony export */ });\nfunction getOrientation() {\r\n    const orientationElement = \r\n        document.getElementById(\"current-placement\").textContent;\r\n\r\n    const placement = orientationElement.split(\" \").slice(-1).toString();\r\n\r\n    switch (placement) {\r\n        case \"horizontal\": {\r\n            return \"horizontal\";\r\n        }\r\n        case \"vertical\": {\r\n            return \"vertical\";\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://battleship/./src/game/orientation.js?");

/***/ }),

/***/ "./src/game/startGame.js":
/*!*******************************!*\
  !*** ./src/game/startGame.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   startGame: () => (/* binding */ startGame)\n/* harmony export */ });\n/* harmony import */ var _classes_player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/player.js */ \"./src/classes/player.js\");\n/* harmony import */ var _createGame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createGame.js */ \"./src/game/createGame.js\");\n/* harmony import */ var _components_placingShip_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/placingShip.js */ \"./src/components/placingShip.js\");\n/* harmony import */ var _game_orientation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game/orientation.js */ \"./src/game/orientation.js\");\n/* harmony import */ var _game_gameLoop_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../game/gameLoop.js */ \"./src/game/gameLoop.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nfunction startGame(name) {\r\n    let player = new _classes_player_js__WEBPACK_IMPORTED_MODULE_0__.Player(name);\r\n    (0,_createGame_js__WEBPACK_IMPORTED_MODULE_1__.createGame)(player.ships[0].length);\r\n\r\n    const cells = document.querySelectorAll(\".grid .cell\");\r\n    cells.forEach((cell) => {\r\n        cell.addEventListener(\"mouseover\", () => {\r\n            removeHoverFromCells(cells);\r\n            gridListener(cell, player.ships[0], player);\r\n        });\r\n\r\n        cell.addEventListener(\"click\", () => {\r\n            placeShip(cell, player);\r\n        });\r\n    });\r\n\r\n    const reset = document.getElementById(\"reset-button\");\r\n    reset.addEventListener(\"click\", () => {\r\n        player = new _classes_player_js__WEBPACK_IMPORTED_MODULE_0__.Player(name);\r\n        changeNextShip(player.ships[0]);\r\n\r\n        resetCells(cells);\r\n        document.querySelector(\"span\").style.display = \"none\";\r\n    });\r\n\r\n    const random = document.getElementById(\"random-button\");\r\n    random.addEventListener(\"click\", () => {\r\n        removeHoverFromCells(cells);\r\n        randomPlacing(player, cells);\r\n    });\r\n\r\n    const start = document.getElementById(\"start-button\");\r\n    start.addEventListener(\"click\", () => {\r\n        createGameLoop(player);\r\n    })\r\n}\r\n\r\nfunction removeHoverFromCells(cells) {\r\n    cells.forEach((cell) => {\r\n        cell.classList.remove(\"hover-effect\");\r\n        cell.classList.remove(\"cell-error\");\r\n    });\r\n}\r\n\r\nfunction gridListener(cell, ship, player) {\r\n    if (player.ships.length === 0) {\r\n        return;\r\n    }\r\n\r\n    const length = ship.length;\r\n    const placement = (0,_game_orientation_js__WEBPACK_IMPORTED_MODULE_3__.getOrientation)();\r\n\r\n    const position = JSON.parse(cell.getAttribute(\"location\"));\r\n\r\n    const shipArrayLength = new Array(ship.length).fill(\" \");\r\n    let positionToInt = { x: parseInt(position.x), y: parseInt(position.y) };\r\n\r\n    if (player.gameboard.checkOutOfBounds(positionToInt, placement, shipArrayLength) === \"collision\") {\r\n        positionToInt = { x: parseInt(position.x), y: parseInt(position.y) };\r\n        moveUntilError(positionToInt, placement, shipArrayLength, player);\r\n        return;\r\n    }\r\n\r\n    hoverOnShip(length, placement, position);\r\n}\r\n\r\nfunction moveUntilError(position, placement, lengthArray, player) {\r\n    lengthArray.every(() => {\r\n        const startPos = JSON.parse(JSON.stringify(position));\r\n\r\n        if (player.gameboard.checkOutOfBounds([\" \", position, placement]) === \"collision\") {\r\n            return false;\r\n        }\r\n\r\n        const element = document.querySelector(`[location=\\'{\"x\": \"${startPos.x}\", \"y\": \"${startPos.y}\"}\\']`);\r\n        element.classList.add(\"cell-error\");\r\n\r\n        if (placement === \"horizontal\") {\r\n            startPos.x++;\r\n        } else {\r\n            startPos.y++;\r\n        }\r\n\r\n        position = startPos;\r\n        return true;\r\n    });\r\n}\r\n\r\nfunction hoverOnShip(length, placement, position) {\r\n    for (let i = 0; i < length; i++) {\r\n        const element = document.querySelector(`[location=\\'{\"x\": \"${position.x}\", \"y\": \"${position.y}\"}\\']`);\r\n\r\n        element.classList.add(\"hover-effect\");\r\n\r\n        if (placement === \"horizontal\") {\r\n            position.x++;\r\n        } else {\r\n            position.y++;\r\n        }\r\n    }\r\n}\r\n\r\nfunction changeNextShip(ship) {\r\n    let length = 0;\r\n\r\n    if (typeof ship === \"object\") {\r\n        length = ship.length;\r\n    }\r\n\r\n    const previousShip = document.getElementById(\"new-ship\");\r\n    const nextShip = (0,_components_placingShip_js__WEBPACK_IMPORTED_MODULE_2__.placingShip)(length);\r\n\r\n    previousShip.replaceWith(nextShip);\r\n}\r\n\r\nfunction resetCells(cells) {\r\n    cells.forEach((cell) => {\r\n        cell.classList.remove(\"ship\");\r\n        cell.classList.remove(\"hover-effect\");\r\n        cell.classList.remove(\"cell-error\");\r\n    });\r\n}\r\n\r\nfunction placeShip(cell, player) {\r\n    if (player.ships.length === 0) {\r\n        return;\r\n    }\r\n\r\n    if (cell.classList.contains(\"cell-error\")) {\r\n        return;\r\n    }\r\n\r\n    const allHover = document.querySelectorAll(\".hover-effect\");\r\n    allHover.forEach((shipElement) => {\r\n        shipElement.classList.add(\"ship\");\r\n        shipElement.classList.remove(\"hover-effect\");\r\n    });\r\n\r\n    const position = JSON.parse(cell.getAttribute(\"location\"));\r\n    const placement = (0,_game_orientation_js__WEBPACK_IMPORTED_MODULE_3__.getOrientation)();\r\n\r\n    player.placeShip(position.x, position.y, placement);\r\n    changeNextShip(player.ships[0]);\r\n}\r\n\r\nfunction randomPlacing(player) {\r\n    player.randomShips();\r\n\r\n    const gameboard = player.gameboard.gameboard;\r\n\r\n    for (let y = 0; y < gameboard.length; y++) {\r\n        const row = gameboard[y];\r\n        for (let x = 0; x < gameboard.length; x++) {\r\n            const cell = row[x];\r\n\r\n            if (typeof cell === \"object\") {\r\n                const element = document.querySelector(`[location=\\'{\"x\": \"${x}\", \"y\": \"${y}\"}\\']`);\r\n\r\n                element.classList.add(\"ship\");\r\n            }\r\n        }\r\n    }\r\n\r\n    changeNextShip(player.ships[0]);\r\n}\r\n\r\nfunction createGameLoop(player) {\r\n    if (player.ships.length != 0) {\r\n        document.querySelector(\"span\").style.display = \"block\";\r\n        return;\r\n    }\r\n\r\n    const gridContainer = document.querySelector(\"#setup-container\").cloneNode(true);\r\n\r\n    document.querySelector(\"main\").innerHTML = \"\";\r\n\r\n    (0,_game_gameLoop_js__WEBPACK_IMPORTED_MODULE_4__.gameLoop)(gridContainer, player);\r\n}\n\n//# sourceURL=webpack://battleship/./src/game/startGame.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_initial_page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/initial-page.js */ \"./src/components/initial-page.js\");\n\r\n\r\n(0,_components_initial_page_js__WEBPACK_IMPORTED_MODULE_0__.menuScreen)();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

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