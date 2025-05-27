export const SCREEN_WIDTH = 800;
export const SCREEN_HEIGHT = 600;

export const MAP_CELL_SIZE = 20;
export const MAP_PLAYER_SIZE = 10;

export const COLOR_MAP_WALL = "#374151"; 
export const COLOR_MAP_PATH = "#e0e0e0"; 
export const COLOR_MAP_PLAYER = "#3b82f6";
export const COLOR_MAP_VISION = "#fffac6";

export const COLOR_RAYCASTING_CEILING = "#000000";
export const COLOR_RAYCASTING_WALL = "#24262a";
export const COLOR_RAYCASTING_FLOOR = "#88827c";

export const RAYCASTING_REDNERING_TIME = 5 * 1_000;

export const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const textures = [
  {
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
      "#555",
      "#464242"
    ],
  },
];