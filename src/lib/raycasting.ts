import { map, SCREEN_HEIGHT, SCREEN_WIDTH } from "../data";
import { degreeToRadians } from "./math";

export function calculateRays(settings: Settings): Ray[] {
  const camera = settings.camera;
  const maxDistance = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT);
  const incrementAngle = camera.fov / Math.min(SCREEN_WIDTH, settings.raycasting.amount);

  let rayAngle = camera.angle - camera.fov / 2;

  const rays: Ray[] = [];

  for (let rayCount = 0; rayCount < settings.raycasting.amount; rayCount++) {
    const ray: Ray = {
      x: camera.x,
      y: camera.y,
      distance: 0,
      wall: -1,
    };

    const rayCos = Math.cos(degreeToRadians(rayAngle)) * settings.raycasting.step;
    const raySin = Math.sin(degreeToRadians(rayAngle)) * settings.raycasting.step;

    let wall = 0;

    while (wall === 0 || ray.x > maxDistance || ray.y > maxDistance) {
      ray.x += rayCos;
      ray.y += raySin;
      wall = map[Math.floor(ray.y)][Math.floor(ray.x)]!;
    }

    let distance = Math.sqrt(
      Math.pow(camera.x - ray.x, 2) + Math.pow(camera.y - ray.y, 2)
    );

    if (settings.raycasting.fisheyeFix) {
      distance = distance * Math.cos(degreeToRadians(rayAngle - camera.angle));
    }

    rayAngle += incrementAngle;
    ray.distance = distance;
    ray.wall = wall;
    rays.push(ray);
  }

  return rays;
}
