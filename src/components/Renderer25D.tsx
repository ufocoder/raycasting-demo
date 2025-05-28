import { type Component, onMount, createEffect, type Accessor } from "solid-js";
import {
  textures,
  COLOR_RAYCASTING_CEILING,
  COLOR_RAYCASTING_WALL,
  COLOR_RAYCASTING_FLOOR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  RAYCASTING_REDNERING_TIME,
} from "../data";
import { calculateRays } from "../lib/raycasting";
import { degreeToRadians } from "../lib/math";

async function time(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function drawTexture(
  ctx: CanvasRenderingContext2D,
  ray: Ray,
  screenX: number,
) {
  const wallHeight = Math.floor(SCREEN_HEIGHT / 2 / ray.distance);
  const texturePositionX = Math.floor(
    (textures.wall.width * (ray.x + ray.y)) % textures.wall.width
  );
  
  let yIncrementer = (wallHeight * 2) / textures.wall.height;
  let y = SCREEN_HEIGHT / 2 - wallHeight;
  for (let i = 0; i < textures.wall.height; i++) {
    drawVerticalLine(
      ctx,
      screenX,
      y,
      y + (yIncrementer + 0.5),
      textures.wall.colors.hex[textures.wall.bitmap[i][texturePositionX]]
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
  const rays = calculateRays(settings);

  if (settings.mode7.texture) {
    ctx.fillStyle = COLOR_RAYCASTING_FLOOR;
    ctx.fillRect(0, SCREEN_HEIGHT / 2, SCREEN_WIDTH, SCREEN_HEIGHT / 2);
    drawMode7(ctx, settings);
  } else { 
    ctx.fillStyle = COLOR_RAYCASTING_FLOOR;
    ctx.fillRect(0, SCREEN_HEIGHT / 2, SCREEN_WIDTH, SCREEN_HEIGHT / 2);
    ctx.fillStyle = COLOR_RAYCASTING_CEILING;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT / 2);
  }
 await drawWalls(ctx, rays, settings);
}

const getTexturePosition = (pos: number, size: number) => 
  (Math.floor(pos) % size + size) % size;

const bufferCanvas = document.createElement("canvas");
const bufferCtx = bufferCanvas.getContext("2d")!;
const bufferImage = bufferCtx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT / 2);

function drawMode7(ctx: CanvasRenderingContext2D, settings: Settings) {
  const texture = textures.floor;

  const sin = Math.sin(degreeToRadians(270 - settings.camera.angle));
  const cos = Math.cos(degreeToRadians(270 - settings.camera.angle));

  let z = 0.001;

  for (let _y = SCREEN_HEIGHT / 2; _y < SCREEN_HEIGHT; _y++) {
    z += 0.005;
    for (let _x = 0; _x < SCREEN_WIDTH; _x++) {
      let x = ((_x - SCREEN_WIDTH / 2) * cos - (SCREEN_HEIGHT - _y) * sin)
      let y = ((_x - SCREEN_WIDTH / 2) * sin + (SCREEN_HEIGHT - _y) * cos)

      x /= z;
      y /= z;

      x += settings.camera.x;
      x -= settings.camera.y;

      x /= texture.scale;
      y /= texture.scale;

      const textureX = getTexturePosition(x, texture.width);
      const textureY = getTexturePosition(y, texture.height);
      const colorIndex = texture.bitmap[textureY][textureX];

      if (settings.mode7.useBuffer) {
        const pixelIndex = ((_y - SCREEN_HEIGHT / 2)* SCREEN_WIDTH + _x) * 4;
        const [r,g,b] = texture.colors.rgb[colorIndex];
        bufferImage.data[pixelIndex] = r;
        bufferImage.data[pixelIndex + 1] = g;
        bufferImage.data[pixelIndex + 2] = b;
        bufferImage.data[pixelIndex + 3] = 255;
      } else {
        ctx.fillStyle = texture.colors.hex[colorIndex];
        ctx.fillRect(_x, _y, 1, 1);
      }
    }
  }
  if (settings.mode7.useBuffer) {
    ctx.putImageData(bufferImage, 0, SCREEN_HEIGHT / 2);
  }
}

async function drawWalls(ctx: CanvasRenderingContext2D, rays: Ray[], settings: Settings) {
  const incrementWidth = Math.round(SCREEN_WIDTH / settings.raycasting.amount);
  const interruptionTimeout = RAYCASTING_REDNERING_TIME / settings.raycasting.amount;
  

  for (let i = 0; i < settings.raycasting.amount; i++) {
    const ray = rays[i];
    for (let j = 0; j < incrementWidth; j++) {
      const wallHeight = Math.floor(SCREEN_HEIGHT / 2 / ray.distance);
      if (settings.raycasting.texture) {
        drawTexture(
          ctx,
          ray,
          i * incrementWidth + j
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
    }

    if (settings.raycasting.interruption) {
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
