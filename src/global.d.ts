type Maze = number[][];

type Texture = {
  width: number;
  height: number;
  bitmap: number[][];
  colors: string[];
}

interface Camera {
  angle: number;
  fov: number;
  x: number;
  y: number;
}

interface Settings {
  rays: number;
  rayStep: number;
  withTexture: boolean;
  withFisheyeFix: boolean;
  withInterruption: boolean;
  camera: Camera;
}
