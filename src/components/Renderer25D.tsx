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
import { degreeToRadians } from "../lib/math";
import { calculateRays } from "../lib/raycasting";

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
    drawVerticalLine(
      ctx,
      x,
      y,
      y + (yIncrementer + 0.5),
      texture.colors[texture.bitmap[i][texturePositionX]]
    );
    y += yIncrementer;
  }
}

function drawVerticalLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y1: number,
  y2: number,
  cssColor: string
) {
  ctx.fillStyle = cssColor;
  ctx.fillRect(x, y1, 1, y2 - y1);
}

function clear(canvasRef: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
}

async function draw(ctx: CanvasRenderingContext2D, settings: Settings) {
  const incrementWidth = Math.round(SCREEN_WIDTH / settings.rays);
  const interruptionTimeout = RAYCASTING_REDNERING_TIME / settings.rays;
  const rays = calculateRays(settings);

  for (let i = 0; i < settings.rays; i++) {
    const ray = rays[i];
    for (let j = 0; j < incrementWidth; j++) {
      const wallHeight = Math.floor(SCREEN_HEIGHT / 2 / ray.distance);
      const texture = textures[0];
      const texturePositionX = Math.floor(
        (texture.width * (ray.x + ray.y)) % texture.width
      );
      drawVerticalLine(
        ctx,
        i * incrementWidth + j,
        0,
        SCREEN_HEIGHT / 2 - wallHeight,
        COLOR_RAYCASTING_CEILING
      );
      if (settings.withTexture) {
        drawTexture(
          ctx,
          i * incrementWidth + j,
          wallHeight,
          texturePositionX,
          texture
        );
      } else {
        drawVerticalLine(
          ctx,
          i * incrementWidth + j,
          SCREEN_HEIGHT / 2 - wallHeight,
          SCREEN_HEIGHT / 2 + wallHeight,
          COLOR_RAYCASTING_WALL
        );
      }
      drawVerticalLine(
        ctx,
        i * incrementWidth + j,
        SCREEN_HEIGHT / 2 + wallHeight,
        SCREEN_HEIGHT,
        COLOR_RAYCASTING_FLOOR
      );
    }

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

    ctx.scale(1, 1);

    clear(canvasRef, ctx);
    await draw(ctx, settings());
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
