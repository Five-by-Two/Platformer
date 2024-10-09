export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 900;
export const BG_IMAGE_HEIGHT = 432;

export const scaledCanvas = {
    width: CANVAS_WIDTH / 4,
    height: CANVAS_HEIGHT / 4,
};

export const camera = {
    position: {
        x: 0,
        y: -BG_IMAGE_HEIGHT + scaledCanvas.height,
    },
};
