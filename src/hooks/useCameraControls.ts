import { createSignal, onCleanup, type Setter } from "solid-js";
import { degreeToRadians } from "../lib/math";
import { map, MAP_PLAYER_SIZE } from "../data";
import createLoop from "../lib/loop";

interface UseCameraControlsProps {
  setSettings: Setter<Settings>;
}

export function useCameraControls({ setSettings }: UseCameraControlsProps) {
  const [isMoving, setMoving] = createSignal(0);
  const [isRotating, setRotating] = createSignal(0);

  function moveCamera(camera: Camera, direction: number) {
    let playerCos = Math.cos(degreeToRadians(camera.angle)) * camera.moveSpeed;
    let playerSin = Math.sin(degreeToRadians(camera.angle)) * camera.moveSpeed;
    let newX = camera.x + direction * playerCos;
    let newY = camera.y + direction * playerSin;
    
    let checkX = Math.floor(
      newX + (direction * playerCos * MAP_PLAYER_SIZE) / 2
    );
    let checkY = Math.floor(
      newY + (direction * playerSin * MAP_PLAYER_SIZE) / 2
    );

    const canMoveY = map[checkY][Math.floor(camera.x)] == 0;
    const canMoveX = map[Math.floor(camera.y)][checkX] == 0;

    return {
      ...camera,
      x: canMoveX ? newX : camera.x,
      y: canMoveY ? newY : camera.y,
    };
  }

  function rotateCamera(camera: Camera, direction: number) {
    return {
      ...camera,
      angle: (camera.angle + direction * camera.rotationSpeed + 360) % 360,
    };
  }

  const mainLoop = createLoop(function () {
    if (isMoving()) {
      setSettings(prev => ({
        ...prev,
        camera: moveCamera(prev.camera, isMoving())
      }));
    }

    if (isRotating()) {
      setSettings(prev => ({
        ...prev,
        camera: rotateCamera(prev.camera, isRotating())
      }));
    }
  });

  mainLoop.play();

  const handleDocumentKeyup = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) {
      return;
    }
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
      case "KeyS":
      case "ArrowDown":
        setMoving(0);
        break;

      case "KeyA":
      case "ArrowLeft":
      case "KeyD":
      case "ArrowRight":
        setRotating(0);
        break;
    }
  };

  const handleDocumentKeydown = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) {
      return;
    }
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        setMoving(1);
        return
      case "KeyS":
      case "ArrowDown":
        setMoving(-1);
        break;

      case "KeyA":
      case "ArrowLeft":
        setRotating(-1);
        break;
      case "KeyD":
      case "ArrowRight":
        setRotating(1);
        break;
    }
  };

  document.addEventListener("keyup", handleDocumentKeyup);
  document.addEventListener("keydown", handleDocumentKeydown);

  onCleanup(() => {
    mainLoop.pause();
    document.removeEventListener("keyup", handleDocumentKeyup);
    document.removeEventListener("keydown", handleDocumentKeydown);
  });
}
