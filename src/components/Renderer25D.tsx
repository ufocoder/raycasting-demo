import { type Component, onMount, createEffect, type Accessor } from "solid-js";
import {
  textures,
  COLOR_RAYCASTING_CEILING,
  COLOR_RAYCASTING_WALL,
  COLOR_RAYCASTING_FLOOR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../data";
import { calculateRays } from "../lib/raycasting";
import { degreeToRadians } from "../lib/math";
import type { BaseCanvas } from "../lib/canvas/BaseCanvas";
import CanvasBuffered from "../lib/canvas/CanvasBuffer";
import CanvasBasic from "../lib/canvas/CanvasDefault";

function drawTexture(canvas: BaseCanvas, ray: Ray, screenX: number) {
  const wallHeight = Math.floor(SCREEN_HEIGHT / 2 / ray.distance);
  const texturePositionX = Math.floor(
    (textures.wall.width * (ray.x + ray.y)) % textures.wall.width
  );

  let yIncrementer = (wallHeight * 2) / textures.wall.height;
  let y = SCREEN_HEIGHT / 2 - wallHeight;
  for (let i = 0; i < textures.wall.height; i++) {
    canvas.drawVerticalLine({
      x: screenX,
      y1: y,
      y2: y + (yIncrementer + 0.5),
      color: textures.wall.colors[textures.wall.bitmap[i][texturePositionX]]
    });
    y += yIncrementer;
  }
}

async function draw(canvas: BaseCanvas, settings: Settings) {
  const rays = calculateRays(settings);

  canvas.drawRect({
    x: 0,
    y: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2,
    color: COLOR_RAYCASTING_CEILING
  });

  if (settings.raycasting.textureFloor) {
    drawFloors(canvas, rays, settings);
  } else {
    canvas.drawRect({
      x: 0,
      y: SCREEN_HEIGHT / 2,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT / 2,
      color: COLOR_RAYCASTING_FLOOR
    });
  }

  await drawWalls(canvas, rays, settings);

  if (settings.raycasting.useBuffer) {
    (canvas as CanvasBuffered).commitBufferSnapshot();
  }
}

const getTexturePosition = (pos: number, size: number) =>
  ((Math.floor(pos) % size) + size) % size;

function drawFloors(
  canvas: BaseCanvas,
  rays: Ray[],
  settings: Settings
) {
  const { raycasting, camera } = settings;
  const texture = textures.floor;

  const incrementWidth = Math.round(SCREEN_WIDTH / raycasting.amount);
  const incrementAngle = camera.fov / Math.min(SCREEN_WIDTH, raycasting.amount);

  let rayAngle = camera.angle - camera.fov / 2;

  for (let i = 0; i < settings.raycasting.amount; i++) {
    const ray = rays[i];

    const wallHeight = Math.floor(SCREEN_HEIGHT / 2 / ray.distance);
    const halfHeight = SCREEN_HEIGHT / 2;
    const start = halfHeight + wallHeight;

    const rayCos = Math.cos(degreeToRadians(rayAngle));
    const raySin = Math.sin(degreeToRadians(rayAngle));
    const diffCos = Math.cos(degreeToRadians(settings.camera.angle - rayAngle));

    for (let y = start; y < SCREEN_HEIGHT; y++) {
      const yDiff = 2 * y - SCREEN_HEIGHT;
      let distance = SCREEN_HEIGHT / yDiff;

      if (settings.raycasting.fisheyeFix) {
        distance = distance / diffCos;
      }

      let tileX = distance * rayCos;
      let tileY = distance * raySin;

      tileX += settings.camera.x;
      tileY += settings.camera.y;

      tileX *= texture.scale;
      tileY *= texture.scale;

      const textureX = getTexturePosition(tileX, texture.width);
      const textureY = getTexturePosition(tileY, texture.height);

      const colorIndex = texture.bitmap[textureX][textureY];
      const x = i * incrementWidth;

      for (let j = 0; j < incrementWidth; j++) {
        canvas.drawRect({
          x: x + j, 
          y, 
          width: 1, 
          height: 1, 
          color: texture.colors[colorIndex]
        });
      }
    }
    rayAngle += incrementAngle;
  }
}

async function drawWalls(
  canvas: BaseCanvas,
  rays: Ray[],
  settings: Settings
) {
  const incrementWidth = Math.round(SCREEN_WIDTH / settings.raycasting.amount);

  for (let i = 0; i < settings.raycasting.amount; i++) {
    const ray = rays[i];
    for (let j = 0; j < incrementWidth; j++) {
      const wallHeight = Math.floor(SCREEN_HEIGHT / 2 / ray.distance);
      if (settings.raycasting.textureWalls) {
        drawTexture(canvas, ray, i * incrementWidth + j);
      } else {
        canvas.drawVerticalLine({
          x: i * incrementWidth + j,
          y1: SCREEN_HEIGHT / 2 - wallHeight,
          y2: SCREEN_HEIGHT / 2 + wallHeight,
          color: COLOR_RAYCASTING_WALL
        });
      }
    }
  }
}

interface RendererProps {
  settings: Accessor<Settings>;
}

const Renderer: Component<RendererProps> = ({ settings }) => {
  let ref: HTMLCanvasElement;
  let canvas: CanvasBasic | CanvasBuffered;

  const render = async () => {
    const _canvas = canvas
    if (!_canvas) {
      return;
    }

    canvas.clear();
    await draw(canvas, settings());
  };

  createEffect(async () => {
    const useBuffer = settings().raycasting.useBuffer;

    if (useBuffer) {
      if (!(canvas instanceof CanvasBuffered)) {
        canvas = new CanvasBuffered(ref!)
      }
    } else {
      if (!(canvas instanceof CanvasBasic)) {
        canvas = new CanvasBasic(ref!)
      }
    }
  });

  onMount(async () => {
    canvas = settings().raycasting.useBuffer 
      ? new CanvasBuffered(ref!)
      : new CanvasBasic(ref!);

    await render();
  });

  createEffect(async () => {
    await render();
  });

  return (
    <canvas
      ref={ref!}
      width={SCREEN_WIDTH}
      height={SCREEN_HEIGHT}
      class="border border-gray-300"
    />
  );
};

export default Renderer;
