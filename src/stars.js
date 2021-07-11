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

class Star {
    constructor(pos, size, color) {
        this.pos = pos;
        this.size = size;
        this.color = color;
    }

    render(ctx) {
        ctx.fillStyle = `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, ${0.7}`;
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }

    dynamicRender(ctx, delta) {
        ctx.fillStyle = `rgba(${this.color.red}, ${this.color.green}, ${this.color.blue}, ${0.7 + delta}`;
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }
}

// eslint-disable-next-line no-unused-vars
function stars(htmlElement, density, {red, blue, white, width, height, animated, size} = {}) {
    const get = (target, defaultValue) => (target !== undefined) ? target : defaultValue;

    const redIn = get(red, true);
    const blueIn = get(blue, true);
    const whiteIn = get(white, true);
    const boundingClientRect = htmlElement.getBoundingClientRect();
    const widthIn = get(width, boundingClientRect.width);
    const heightIn = get(height, boundingClientRect.height);
    const sizeIn = get(size, 1);
    const animatedIn = get(animated, true);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = widthIn;
    canvas.height = heightIn;

    const getPos = () => {
        const getRandomInRange = (from, to) => {
            return Math.floor(Math.random() * (to - from) + from);
        };

        return {
            x: getRandomInRange(0, widthIn),
            y: getRandomInRange(0, widthIn)
        };
    };

    const createStar = (colorSelector, white, blue, red) => {
        // white
        if (colorSelector >= white.lower && colorSelector <= white.upper && whiteIn) {
            const color = Math.floor((Math.random() * 255) + 1);
            const star = new Star(getPos(), sizeIn, {red: color, green: color, blue: color});
            stars.push(star);
        }
        // blue
        else if (colorSelector >= blue.lower & colorSelector <= blue.upper && blueIn) {
            const color = Math.floor((Math.random() * 255) + 1);
            const star = new Star(getPos(), sizeIn, {red: 0, green: 0, blue: color});
            stars.push(star);
        }
        // red
        else if (colorSelector >= red.lower && colorSelector <= red.upper && redIn) {
            const color = Math.floor((Math.random() * 255) + 1);
            const star = new Star(getPos(), sizeIn, {red: color, green: 0, blue: 0});
            stars.push(star);
        }
    };

    const stars = [];

    for (let i = 0; i < ((widthIn + heightIn) / sizeIn) * density; i+=sizeIn) {
        const whiteMinus = !whiteIn ? -20 : 0;
        const blueMinus = !blueIn ? -2 : 0;
        const redMinus = !redIn ? -2 : 0;
        const colorSelectorMinus = whiteMinus + blueMinus + redMinus;
        const colorSelector = Math.floor((Math.random() * (24 + colorSelectorMinus)) + 1);
        createStar(
            colorSelector,
            {lower: 1, upper: 20},
            {lower: 21 + whiteMinus, upper: 22 + whiteMinus},
            {lower: 23 + whiteMinus + blueMinus, upper: 24 + whiteMinus + blueMinus},
        );
    }
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, widthIn, heightIn);
    
    stars.forEach(star => star.render(ctx));

    htmlElement.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
}