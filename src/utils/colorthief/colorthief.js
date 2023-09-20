import ColorThief from "../../../node_modules/colorthief/dist/color-thief.mjs"; // your node modules path

export const getPalette = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            let colorThief = new ColorThief();
            resolve(colorThief.getColor(img));
        };
        img.src = url;
    });
};
