import { onCleanup, type Setter } from "solid-js";
import { degreeToRadians } from "../lib";
import { map, MAP_PLAYER_SIZE } from "../data";

interface UseCameraControlsProps {
    setSettings: Setter<Settings>;
}

const moveSpeed = 0.1;
const rotationSpeed = 5;

function round(number: number, precision = 2) {
    return Math.floor(number * Math.pow(10, precision)) / Math.pow(10, precision);
}

export function useCameraControls({ setSettings }: UseCameraControlsProps) {
  const handleDocumentKeyup = (e: KeyboardEvent) => {

    function moveCamera(camera: Camera, direction: number) {
        let playerCos = Math.cos(degreeToRadians(camera.angle)) * moveSpeed;
        let playerSin = Math.sin(degreeToRadians(camera.angle)) * moveSpeed;
        let newX = camera.x + direction * playerCos;
        let newY = camera.y + direction * playerSin;
        let checkX = Math.floor(newX + direction * playerCos * MAP_PLAYER_SIZE / 2);
        let checkY = Math.floor(newY + direction * playerSin * MAP_PLAYER_SIZE / 2);

        const canMoveY = map[checkY][Math.floor(camera.x)] == 0;
        const canMoveX = map[Math.floor(camera.y)][checkX] == 0;
        
        return {
            ...camera,
            x: canMoveX ? newX : round(camera.x),
            y: canMoveY ? newY : round(camera.y),
        }
    }

    function rotateCamera(camera: Camera, direction: number) {
        return {
            ...camera,
            angel: (camera.angle + direction * rotationSpeed) % 360
        }
    }

    switch(e.code) {
      case "KeyW":
      case "ArrowUp":
        setSettings(prev => ({
            ...prev,
            camera: moveCamera(prev.camera, 1)
        }));
      break;

      case "KeyA":
      case "ArrowLeft":
        setSettings(prev => ({
            ...prev,
            camera: rotateCamera(prev.camera, 1)
        }));
      break;

      case "KeyS":
      case "ArrowDown":
        setSettings(prev => ({
            ...prev,
            camera: moveCamera(prev.camera, -1)
        }));
      break;

      case "KeyD":
      case "ArrowRight":
        setSettings(prev => ({
            ...prev,
            camera: rotateCamera(prev.camera, -1)
        }));
      break;
    }
  };


  const handleDocumentKeydown = (e: KeyboardEvent) => {
    switch(e.code) {
      case "KeyW":
      case "KeyUp":

      break;
    }
  };

  document.addEventListener("keyup", handleDocumentKeyup);
  document.addEventListener("keydown", handleDocumentKeydown);

  onCleanup(() => {
    document.removeEventListener("keyup", handleDocumentKeyup);
    document.removeEventListener("keydown", handleDocumentKeydown);
  });
}