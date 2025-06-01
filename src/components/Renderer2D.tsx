import { type Component, onMount, createEffect, type Accessor } from "solid-js";
import {
  map,
  COLOR_MAP_PATH,
  COLOR_MAP_PLAYER,
  COLOR_MAP_VISION,
  COLOR_MAP_WALL,
  MAP_CELL_SIZE,
  MAP_PLAYER_SIZE,
} from "../data";
import { calculateRays } from "../lib/raycasting";
import CanvasDefault from "../lib/canvas/CanvasDefault";

interface RendererProps {
  settings: Accessor<Settings>;
}

function drawMaze(canvas: CanvasDefault) {
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      canvas.drawRect({
        x: x * MAP_CELL_SIZE,
        y: y * MAP_CELL_SIZE,
        width: MAP_CELL_SIZE,
        height: MAP_CELL_SIZE,
        color: cell === 1 ? COLOR_MAP_WALL : COLOR_MAP_PATH,
      });
    });
  });
}

const resizeCoords = ({ x, y }: { x: number; y: number }) => ({
  x: x * MAP_CELL_SIZE,
  y: y * MAP_CELL_SIZE,
});

async function drawVision(canvas: CanvasDefault, settings: Settings) {
  const points = calculateRays(settings).map(resizeCoords);
  
  canvas.drawPolygon({
    points: [resizeCoords(settings.camera), ...points],
    color: COLOR_MAP_VISION
  });
}

function drawCamera(canvas: CanvasDefault, camera: Camera) {
  canvas.drawCircle({
    x: camera.x * MAP_CELL_SIZE,
    y: camera.y * MAP_CELL_SIZE,
    radius: MAP_PLAYER_SIZE,
    color: COLOR_MAP_PLAYER,
  });
}

const Renderer: Component<RendererProps> = ({ settings }) => {
  let ref: HTMLCanvasElement;
  let canvas: CanvasDefault;

  const render = () => {
    if (!ref!) {
      return;
    }

    drawMaze(canvas);
    drawVision(canvas, settings());
    drawCamera(canvas, settings().camera);
  };

  onMount(() => {
    ref!.width = map[0].length * MAP_CELL_SIZE;
    ref!.height = map.length * MAP_CELL_SIZE;

    canvas = new CanvasDefault(ref!);

    render();
  });

  createEffect(() => {
    render();
  });

  return <canvas ref={ref!} class="border border-gray-300" />;
};

export default Renderer;
