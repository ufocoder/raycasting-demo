export const SCREEN_WIDTH = 800;
export const SCREEN_HEIGHT = 600;

export const MAP_CELL_SIZE = 15;
export const MAP_PLAYER_SIZE = 10;

export const COLOR_MAP_WALL: Color = { r: 55, g: 65, b: 81 };
export const COLOR_MAP_PATH: Color = { r: 240, g: 240, b: 240 };
export const COLOR_MAP_PLAYER: Color = { r: 59, g: 130, b: 246 };
export const COLOR_MAP_VISION: Color = { r: 255, g: 250, b: 200 };
export const COLOR_RAYCASTING_CEILING: Color = { r: 0, g: 0, b: 0 };
export const COLOR_RAYCASTING_WALL: Color = { r: 36, g: 38, b: 42 };
export const COLOR_RAYCASTING_FLOOR: Color = { r: 136, g: 130, b: 124 };

export const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const textures: Record<string, Texture> = {
  floor: {
    scale: 2.5,
    width: 4,
    height: 4,
    bitmap: [
      [0, 0, 1, 1],
      [0, 0, 1, 1],
      [1, 1, 0, 0],
      [1, 1, 0, 0],
    ],
    colors: [
      { r: 85, g: 85, b: 85 },
      { r: 70, g: 70, b: 60 }
    ]
  },
  ceiling: {
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
      { r: 85, g: 85, b: 85 },
      { r: 70, g: 70, b: 60 }
    ]
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
      { r: 85, g: 85, b: 85 },
      { r: 70, g: 70, b: 60 }
    ]
  },
}

export const defaultSettings = {
  raycasting: {
    amount: SCREEN_WIDTH,
    step: 0.005,
    fisheyeFix: true,
    textureWalls: true,
    textureFloor: true,
    useBuffer: false,
  },
  camera: {
    angle: 0,
    fov: 45,
    x: 3,
    y: 3,
    moveSpeed: 0.1,
    rotationSpeed: 1.125,
  },
};