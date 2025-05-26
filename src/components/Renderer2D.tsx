import { type Component, onMount, createEffect, type Accessor } from "solid-js";
import {
  COLOR_MAP_PATH,
  COLOR_MAP_PLAYER,
  COLOR_MAP_VISION,
  COLOR_MAP_WALL,
  map,
  MAP_CELL_SIZE,
  MAP_PLAYER_SIZE,
} from "../data";
import { calculateRays } from "../lib/raycasting";

interface RendererProps {
  settings: Accessor<Settings>;
}

function clear(canvasRef: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
}

function drawPolygon(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[]
) {
  ctx.beginPath();
  ctx.moveTo(points[0].x * MAP_CELL_SIZE, points[0].y * MAP_CELL_SIZE);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x * MAP_CELL_SIZE, points[i].y * MAP_CELL_SIZE);
  }
  ctx.closePath();
  ctx.fillStyle = COLOR_MAP_VISION;
  ctx.fill();
}

function drawMaze(ctx: CanvasRenderingContext2D) {
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      ctx.fillStyle = cell === 1 ? COLOR_MAP_WALL : COLOR_MAP_PATH;
      ctx.fillRect(
        x * MAP_CELL_SIZE,
        y * MAP_CELL_SIZE,
        MAP_CELL_SIZE,
        MAP_CELL_SIZE
      );
    });
  });
}

async function drawVision(ctx: CanvasRenderingContext2D, settings: Settings) {
  const camera = settings.camera;
  const visionPoints = [
    { x: camera.x, y: camera.y },
    ...calculateRays(settings),
  ];

  drawPolygon(ctx, visionPoints);
}

function drawCamera(ctx: CanvasRenderingContext2D, camera: Camera) {
  ctx.fillStyle = COLOR_MAP_PLAYER;
  ctx.beginPath();
  ctx.arc(
    camera.x * MAP_CELL_SIZE,
    camera.y * MAP_CELL_SIZE,
    MAP_PLAYER_SIZE / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

const Renderer: Component<RendererProps> = ({ settings }) => {
  let canvasRef: HTMLCanvasElement;

  const render = () => {
    if (!canvasRef!) {
      return;
    }

    const ctx = canvasRef!.getContext("2d");

    if (!ctx) {
      return;
    }

    clear(canvasRef, ctx);
    drawMaze(ctx);
    drawVision(ctx, settings());
    drawCamera(ctx, settings().camera);
  };

  onMount(() => {
    canvasRef!.width = map[0].length * MAP_CELL_SIZE;
    canvasRef!.height = map.length * MAP_CELL_SIZE;
    render();
  });

  createEffect(() => {
    render();
  });

  return <canvas ref={canvasRef!} class="border border-gray-300" />;
};

export default Renderer;
