export const SCREEN_WIDTH = 640;
export const SCREEN_HEIGHT = 480;

export const MAP_CELL_SIZE = 20;
export const MAP_PLAYER_SIZE = 10;

export const COLOR_MAP_WALL = "#374151"; 
export const COLOR_MAP_PATH = "#e0e0e0"; 
export const COLOR_MAP_PLAYER = "#3b82f6";

export const COLOR_RAYCASTING_CEILING = "black";
export const COLOR_RAYCASTING_WALL = '#24262a';
export const COLOR_RAYCASTING_FLOOR = "rgb(95, 87, 79)";

export const RAYCASTING_REDNERING_TIME = 5 * 1_000;

export const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
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
    colors: ["rgb(255, 241, 232)", "rgb(194, 195, 199)"],
  },
];