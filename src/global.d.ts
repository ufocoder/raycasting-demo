type Maze = number[][];

interface Color {
  r: number
  g: number
  b: number
}

type Texture = {
  width: number;
  height: number;
  bitmap: number[][];
  colors: Color[];
  scale: number;
}

interface Raycasting {
  amount: number;
  step: number;
  textureWalls: boolean;
  textureFloor: boolean;
  fisheyeFix: boolean;
  useBuffer: boolean;
}

interface Camera {
  angle: number;
  fov: number;
  x: number;
  y: number;
  moveSpeed: number;
  rotationSpeed: number;
}

interface Ray {
  x: number;
  y: number;
  wall: number;
  distance: number;
}

interface Settings {
  raycasting: Raycasting;
  camera: Camera;
}
