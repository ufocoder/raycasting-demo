export const SCREEN_WIDTH = 800;
export const SCREEN_HEIGHT = 600;

export const MAP_CELL_SIZE = 15;
export const MAP_PLAYER_SIZE = 10;

export const COLOR_MAP_POINTER: Color = { r: 255, g: 255, b: 0 };
export const COLOR_MAP_WALL: Color = { r: 55, g: 65, b: 81 };
export const COLOR_MAP_PATH: Color = { r: 240, g: 240, b: 240 };
export const COLOR_MAP_PLAYER: Color = { r: 59, g: 130, b: 246 };
export const COLOR_MAP_VISION: Color = { r: 255, g: 250, b: 200 };
export const COLOR_RAYCASTING_CEILING: Color = { r: 20, g: 20, b: 20 };
export const COLOR_RAYCASTING_WALL: Color = { r: 36, g: 38, b: 42 };
export const COLOR_RAYCASTING_FLOOR: Color = { r: 136, g: 130, b: 124 };

const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const textures: Record<string, Texture> = {
  floor: {
    scale: 2,
    width: 4,
    height: 4,
    bitmap: [
      [0, 0, 1, 1],
      [0, 0, 1, 1],
      [1, 1, 0, 0],
      [1, 1, 0, 0],
    ],
    colors: [
      { r: 120, g: 120, b: 120 },
      { r: 90, g: 90, b: 90 },
    ],
  },
  wall: {
    scale: 1,
    width: 8,
    height: 8,
    bitmap: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 0, 0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 0, 0, 0, 1, 0, 0],
    ],
    colors: [
      { r: 120, g: 120, b: 120 },
      { r: 90, g: 90, b: 90 },
    ],
  },
};

export const defaultSettings = {
  maze,
  raycasting: {
    amount: SCREEN_WIDTH,
    step: 0.005,
    fisheyeFix: true,
    textureWalls: true,
    textureFloor: true,
    useBuffer: true,
  },
  camera: {
    angle: 180,
    fov: 45,
    x: 14,
    y: 8.5,
    moveSpeed: 0.1,
    rotationSpeed: 1.125,
  },
};
