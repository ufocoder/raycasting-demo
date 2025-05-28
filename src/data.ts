export const SCREEN_WIDTH = 800;
export const SCREEN_HEIGHT = 600;

export const MAP_CELL_SIZE = 15;
export const MAP_PLAYER_SIZE = 10;

export const COLOR_MAP_WALL = "#374151"; 
export const COLOR_MAP_PATH = "#F0F0F0"; 
export const COLOR_MAP_PLAYER = "#3b82f6";
export const COLOR_MAP_VISION = "#fffac6";

export const COLOR_RAYCASTING_CEILING = "#000000";
export const COLOR_RAYCASTING_WALL = "#24262a";
export const COLOR_RAYCASTING_FLOOR = "#88827c";

export const RAYCASTING_REDNERING_TIME = 5 * 1_000;

export const map2 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];



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
    scale: 16,
    width: 4,
    height: 4,
    bitmap: [
      [0, 0, 1, 1],
      [0, 0, 1, 1],
      [1, 1, 0, 0],
      [1, 1, 0, 0],
    ],
    colors: {
      rgb: [
        [85, 85, 85],
        [70, 70, 60]
      ],
      hex: [
        "#555",
        "#464242"
      ],
    }
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
    colors: {
      rgb: [
        [85, 85, 85],
        [70, 70, 60]
      ],
      hex: [
        "#555",
        "#464242"
      ],
    }
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
    colors: {
      rgb: [
        [85, 85, 85],
        [70, 70, 60]
      ],
      hex: [
        "#555",
        "#464242"
      ],
    }
  },
}

export const defaultSettings = {
  raycasting: {
    amount: SCREEN_WIDTH,
    step: 0.005,
    texture: true,
    fisheyeFix: true,
    interruption: false,
  },
  mode7: {
    texture: true,
    useBuffer: false,
  },
  camera: {
    angle: 0,
    fov: 45,
    x: 1.5,
    y: 1.5,
    moveSpeed: 0.1,
    rotationSpeed: 1.125,
  },
};