export const get = (target, defaultValue) => ((target !== undefined) ? target : defaultValue);

export const getRandomPos = (width, height) => {
    const getRandomInRange = (from, to) => Math.floor(Math.random() * (to - from) + from);

    return {
        x: getRandomInRange(0, width),
        y: getRandomInRange(0, height),
    };
};
