type Maze = number[][];

type Texture = {
  width: number;
  height: number;
  bitmap: number[][];
  colors: {
    rgb: [number, number, number][];
    hex: string[];
  }
  scale: number;
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
  raycasting: {
    amount: number;
    step: number;
    texture: boolean;
    fisheyeFix: boolean;
    interruption: boolean;
  };
  mode7: {
    texture: boolean;
    useBuffer: boolean;
  };
  camera: Camera;
}
