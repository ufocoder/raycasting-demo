import {
  type Component,
  onMount,
  createEffect,
  type Accessor,
  createSignal,
  onCleanup,
  type Setter,
} from "solid-js";
import {
  COLOR_MAP_PATH,
  COLOR_MAP_PLAYER,
  COLOR_MAP_VISION,
  COLOR_MAP_WALL,
  MAP_CELL_SIZE,
  MAP_PLAYER_SIZE,
  COLOR_MAP_POINTER,
} from "../data";
import { calculateRays } from "../lib/raycasting";
import CanvasDefault from "../lib/canvas/CanvasDefault";

interface Position {
  x: number;
  y: number;
}

function setValueInMaze(maze: Maze, x: number, y: number, value: number) {
  return maze.map((row, rowIndex) =>
    rowIndex === y
      ? row.map((cell, colIndex) => (colIndex === x ? value : cell))
      : [...row]
  );
}

function drawMaze(canvas: CanvasDefault, settings: Settings) {
  settings.maze.forEach((row, y) => {
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
    color: COLOR_MAP_VISION,
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

function drawOverlay(canvas: CanvasDefault, { x, y }: Position) {
  canvas.clear();
  if (x < 0 || y < 0) {
    return;
  }
  canvas.drawRect({
    x: x * MAP_CELL_SIZE,
    y: y * MAP_CELL_SIZE,
    width: MAP_CELL_SIZE,
    height: MAP_CELL_SIZE,
    color: COLOR_MAP_POINTER,
  });
}

interface RendererProps {
  settings: Accessor<Settings>;
  setSettings: Setter<Settings>;
}

const Renderer: Component<RendererProps> = ({ settings, setSettings }) => {
  const [pointerPosition, setPointerPosition] = createSignal<Position>({
    x: -1,
    y: -1,
  });

  let refOverlay: HTMLCanvasElement;
  let refContainer: HTMLCanvasElement;

  let canvasOverlay: CanvasDefault;
  let canvasContainer: CanvasDefault;

  const render = () => {
    if (!refContainer!) {
      return;
    }

    drawMaze(canvasContainer, settings());
    drawVision(canvasContainer, settings());
    drawCamera(canvasContainer, settings().camera);
    drawOverlay(canvasOverlay, pointerPosition());
  };

  const handleDocumentPointermove = (e: PointerEvent) => {
    if (!refOverlay!) {
      return;
    }

    const rect = refOverlay.getBoundingClientRect();

    const x = Math.floor((e.clientX - rect.x) / MAP_CELL_SIZE);
    const y = Math.floor((e.clientY - rect.y) / MAP_CELL_SIZE);

    setPointerPosition({ x, y });
  };

  const handleDocumentPointerdown = (e: PointerEvent) => {
    if (!refOverlay!) {
      return;
    }

    const rect = refOverlay.getBoundingClientRect();

    const x = Math.floor((e.clientX - rect.x) / MAP_CELL_SIZE);
    const y = Math.floor((e.clientY - rect.y) / MAP_CELL_SIZE);

    setSettings((prev) => ({
      ...prev,
      maze: setValueInMaze(prev.maze, x, y, prev.maze[y][x] == 0 ? 1 : 0),
    }));
  };

  onMount(() => {
    document.addEventListener("pointermove", handleDocumentPointermove);
    document.addEventListener("pointerdown", handleDocumentPointerdown);

    refOverlay!.width = settings().maze[0].length * MAP_CELL_SIZE;
    refOverlay!.height = settings().maze.length * MAP_CELL_SIZE;

    refContainer!.width = settings().maze[0].length * MAP_CELL_SIZE;
    refContainer!.height = settings().maze.length * MAP_CELL_SIZE;

    canvasOverlay = new CanvasDefault(refOverlay!);
    canvasContainer = new CanvasDefault(refContainer!);

    render();
  });

  createEffect(() => {
    render();
  });

  onCleanup(() => {
    document.removeEventListener("pointerdown", handleDocumentPointerdown);
    document.removeEventListener("pointermove", handleDocumentPointermove);
  });

  return (
    <div class="relative">
      <canvas ref={refOverlay!} class="border border-gray-300 absolute" />
      <canvas ref={refContainer!} class="border border-gray-300 " />
    </div>
  );
};

export default Renderer;
