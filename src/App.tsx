import { createSignal } from "solid-js";
import Renderer2D from './components/Renderer2D';
import Renderer25D from './components/Renderer25D';
import FormSettings from './components/FormSettings';
import { useCameraControls } from "./hooks/useCameraControls";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./data";

const defaultSettings = {
  rays: SCREEN_WIDTH,
  withTexture: false,
  withFisheyeFix: true,
  withInterruption: false,
  camera: {
    angle: 90,
    fov: 45,
    x: 1.5,
    y: 1.5,
  }
};

function App() {
  const [settings, setSettings] = createSignal<Settings>(defaultSettings);

  useCameraControls({ setSettings });

  return (
    <div class="flex flex-col gap-2">
      <h1 class="mb-1 text-4xl text-center font-bold text-gray-900">
        Raycasting Demo
      </h1>
      <p class="mb-6 text-base text-center font-normal text-gray-500">
        learn and experiment with raycasting rendering
      </p>

      <div class="flex gap-8">
        <div class="flex flex-col flex-auto items-center">
          <div class="bg-white rounded mt-4 shadow-lg mb-4">
            <Renderer25D settings={settings} />
          </div>
          <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
            {SCREEN_WIDTH}x{SCREEN_HEIGHT}
          </span>
        </div>
        <div>
          <div class="bg-white rounded mt-4 shadow-lg mb-2">
            <Renderer2D settings={settings} />
          </div>
          <div class="bg-white rounded mt-4 shadow-lg">
            <FormSettings settings={settings} setSettings={setSettings} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
