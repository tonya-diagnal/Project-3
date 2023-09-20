import ColorThief, { RGBColor } from "colorthief"; // your node modules path

export const getPalette = (url: string) => {
    return new Promise<RGBColor>((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            let colorThief = new ColorThief();
            const result = colorThief.getColor(img);
            resolve(result);
        };
        img.src = url;
    });
};
