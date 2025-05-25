import { type Component, onMount, createEffect, type Accessor } from "solid-js";
import {
  textures,
  COLOR_RAYCASTING_CEILING,
  COLOR_RAYCASTING_WALL,
  COLOR_RAYCASTING_FLOOR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  RAYCASTING_REDNERING_TIME,
  map,
} from "../data";
import { degreeToRadians } from "../lib";


async function time(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function drawTexture(
  ctx: CanvasRenderingContext2D,
  x: number,
  wallHeight: number,
  texturePositionX: number,
  texture: Texture
) {
  let yIncrementer = (wallHeight * 2) / texture.height;
  let y = SCREEN_HEIGHT / 2 - wallHeight;
  for (let i = 0; i < texture.height; i++) {
    ctx.strokeStyle = texture.colors[texture.bitmap[i][texturePositionX]];
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + (yIncrementer + 0.5));
    ctx.stroke();
    y += yIncrementer;
  }
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  cssColor: string
) {
  ctx.strokeStyle = cssColor;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function clear(canvasRef: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
}

async function rayCasting(
  ctx: CanvasRenderingContext2D,
  settings: Settings
) {
  const camera = settings.camera;

  const maxDistance = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT);
  const incrementAngle = camera.fov / Math.min(SCREEN_WIDTH, settings.rays);
  const incrementWidth = Math.round(SCREEN_WIDTH / settings.rays);
  const interruptionTimeout = RAYCASTING_REDNERING_TIME / settings.rays;

  let rayAngle = camera.angle - camera.fov / 2;

  for (let rayCount = 0; rayCount < settings.rays; rayCount++) {
    const ray = {
      x: camera.x,
      y: camera.y,
    };

    const rayCos = Math.cos(degreeToRadians(rayAngle));
    const raySin = Math.sin(degreeToRadians(rayAngle));

    let wall = 0;

    while (wall === 0 || ray.x > maxDistance || ray.y > maxDistance) {
      ray.x += rayCos;
      ray.y += raySin;
      wall = map[Math.floor(ray.y)][Math.floor(ray.x)];
    }

    let distance = Math.sqrt(
      Math.pow(camera.x - ray.x, 2) + Math.pow(camera.y - ray.y, 2)
    );

    if (settings.withFisheyeFix) {
      distance = distance * Math.cos(degreeToRadians(rayAngle - camera.angle));
    }

    const wallHeight = Math.floor(SCREEN_HEIGHT / 2 / distance);
    const texture = textures[wall - 1];
    const texturePositionX = Math.floor(
      (texture.width * (ray.x + ray.y)) % texture.width
    );

    for (let j = 0; j < incrementWidth; j++) {
      drawLine(
        ctx,
        rayCount * incrementWidth + j,
        0,
        rayCount * incrementWidth + j,
        SCREEN_HEIGHT / 2 - wallHeight,
        COLOR_RAYCASTING_CEILING
      );
      if (settings.withTexture) {
        drawTexture(
          ctx,
          rayCount * incrementWidth + j,
          wallHeight,
          texturePositionX,
          texture
        );
      } else {
        drawLine(
        ctx,
        rayCount * incrementWidth + j,
        SCREEN_HEIGHT / 2 - wallHeight,
        rayCount * incrementWidth + j,
        SCREEN_HEIGHT / 2 + wallHeight,
        COLOR_RAYCASTING_WALL
      );
      }
      drawLine(
        ctx,
        rayCount * incrementWidth + j,
        SCREEN_HEIGHT / 2 + wallHeight,
        rayCount * incrementWidth + j,
        SCREEN_HEIGHT,
        COLOR_RAYCASTING_FLOOR
      );
    }

    rayAngle += incrementAngle;

    if (settings.withInterruption) {
      await time(interruptionTimeout);
    }
  }
}

interface RendererProps {
  settings: Accessor<Settings>;
}

const Renderer: Component<RendererProps> = ({ settings }) => {
  let canvasRef: HTMLCanvasElement;

  const render = async () => {
    if (!canvasRef!) {
      return;
    }

    const ctx = canvasRef!.getContext("2d");

    if (!ctx) {
      return;
    }

    clear(canvasRef, ctx);
    await rayCasting(ctx, settings());
  };

  onMount(async () => {
    await render();
  });

  createEffect(async () => {
    await render();
  });

  return (
    <canvas
      ref={canvasRef!}
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      class="border border-gray-300"
    />
  );
};

export default Renderer;
