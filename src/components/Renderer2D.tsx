import { type Component, onMount, createEffect, type Accessor } from "solid-js";
import { COLOR_MAP_PATH, COLOR_MAP_PLAYER, COLOR_MAP_WALL, map, MAP_CELL_SIZE, MAP_PLAYER_SIZE } from "../data";

interface RendererProps {
  settings: Accessor<Settings>;
}

function clear(canvasRef: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
}

function drawMaze(ctx: CanvasRenderingContext2D) {
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      ctx.fillStyle = cell === 1 ? COLOR_MAP_WALL : COLOR_MAP_PATH;
      ctx.fillRect(x * MAP_CELL_SIZE, y * MAP_CELL_SIZE, MAP_CELL_SIZE, MAP_CELL_SIZE);
    });
  });
}

function drawCamera(ctx: CanvasRenderingContext2D, camera: Camera) {
  const fov = camera.fov;
  const angle = camera.angle;
  const playerX = camera.x * MAP_CELL_SIZE;
  const playerY = camera.y * MAP_CELL_SIZE;
  const sectorRadius = MAP_CELL_SIZE * 2;

  const angleRad = (angle * Math.PI) / 180;
  const fovRad = (fov * Math.PI) / 180;
  const startAngle = angleRad - fovRad / 2;
  const endAngle = angleRad + fovRad / 2;

  ctx.beginPath();
  ctx.moveTo(playerX, playerY);
  ctx.strokeStyle = COLOR_MAP_PLAYER;
  ctx.lineTo(
    playerX + Math.cos(startAngle) * sectorRadius,
    playerY + Math.sin(startAngle) * sectorRadius
  );
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(playerX, playerY);
  ctx.strokeStyle = COLOR_MAP_PLAYER;
  ctx.lineTo(
    playerX + Math.cos(endAngle) * sectorRadius,
    playerY + Math.sin(endAngle) * sectorRadius
  );
  ctx.stroke();

  ctx.fillStyle = COLOR_MAP_PLAYER;
  ctx.beginPath();
  ctx.arc(playerX, playerY, MAP_PLAYER_SIZE / 2, 0, Math.PI * 2);
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
