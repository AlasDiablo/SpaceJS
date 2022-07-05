// eslint-disable-next-line import/named
import { get, getRandomPos } from './utils';

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

export default createStars;
