/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "createStars": () => (/* binding */ src_createStars)
});

;// CONCATENATED MODULE: ./src/utils.js
const get = (target, defaultValue) => ((target !== undefined) ? target : defaultValue);

const getRandomPos = (width, height) => {
    const getRandomInRange = (from, to) => Math.floor(Math.random() * (to - from) + from);

    return {
        x: getRandomInRange(0, width),
        y: getRandomInRange(0, height),
    };
};

;// CONCATENATED MODULE: ./src/stars.js
// eslint-disable-next-line import/named


class Star {
    constructor(pos, size, color) {
        this.pos = pos;
        this.size = size;
        this.color = color;
    }

    render(ctx) {
        ctx.fillStyle = `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, ${0.7})`;
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }
}

const createStar = (selector, pos, size, white, blue, red) => {
    // white
    if (selector >= white.lower && selector <= white.upper && white.enable) {
        const color = Math.floor((Math.random() * 255) + 1);
        return new Star(pos, size, { red: color, green: color, blue: color });
    }

    // blue
    if (selector >= blue.lower && selector <= blue.upper && blue.enable) {
        const color = Math.floor((Math.random() * 255) + 1);
        return new Star(pos, size, { red: 0, green: 0, blue: color });
    }

    // red
    if (selector >= red.lower && selector <= red.upper && red.enable) {
        const color = Math.floor((Math.random() * 255) + 1);
        return new Star(pos, size, { red: color, green: 0, blue: 0 });
    }

    return undefined;
};

/**
 * Function use to create a background star on a specific html element
 * @param elementId{!string} Html element id who receive the background
 * @param density{!number} Density of star in the html element
 * @param red{?boolean} (Optional, default: true) Enable red star
 * @param blue{?boolean} (Optional, default: true) Enable blue star
 * @param white{?boolean} (Optional, default: true) Enable white star
 * @param width{?number} (Optional, default: html element width) Custom tile width
 * @param height{?number} (Optional, default: html element height) Custom tile height
 * @param size{?number} (Optional, default: 1) Star size in pixel
 * @returns {number|NodeJS.Timeout}
 */
const createStars = (elementId, density, {
    red, blue, white, width, height, size,
} = {}) => {
    const redIn = get(red, true);
    const blueIn = get(blue, true);
    const whiteIn = get(white, true);
    const element = document.getElementById(elementId);
    const boundingClientRect = element.getBoundingClientRect();
    const widthIn = get(width, boundingClientRect.width);
    const heightIn = get(height, boundingClientRect.height);
    const sizeIn = get(size, 1);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = widthIn;
    canvas.height = heightIn;

    const stars = [];

    const numberOfStar = ((widthIn + heightIn) / sizeIn) * density;

    for (let i = 0; i < numberOfStar; i += sizeIn) {
        const whiteMinus = !whiteIn ? -20 : 0;
        const blueMinus = !blueIn ? -2 : 0;
        const redMinus = !redIn ? -2 : 0;
        const colorSelectorMinus = whiteMinus + blueMinus + redMinus;
        const colorSelector = Math.floor((Math.random() * (24 + colorSelectorMinus)) + 1);
        const star = createStar(
            colorSelector,
            getRandomPos(widthIn, heightIn),
            sizeIn,
            { lower: 1, upper: 20, enable: redIn },
            { lower: 21 + whiteMinus, upper: 22 + whiteMinus, enable: blueIn },
            {
                lower: 23 + whiteMinus + blueMinus,
                upper: 24 + whiteMinus + blueMinus,
                enable: whiteIn,
            },
        );
        if (star !== undefined) {
            stars.push(star);
        }
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, widthIn, heightIn);

    stars.forEach((star) => star.render(ctx));
    element.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
};

/* harmony default export */ const stars = (createStars);

;// CONCATENATED MODULE: ./src/index.js
// MIT License
//
// Copyright (c) 2021 AlasDiablo
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.



// eslint-disable-next-line import/prefer-default-export
const src_createStars = stars;

})();

var __webpack_export_target__ = (SpaceJS = typeof SpaceJS === "undefined" ? {} : SpaceJS);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;