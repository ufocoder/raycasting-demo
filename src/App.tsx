import { createSignal } from "solid-js";
import Renderer2D from "./components/Renderer2D";
import Renderer25D from "./components/Renderer25D";
import FormSettings from "./components/FormSettings";
import { useCameraControls } from "./hooks/useCameraControls";
import { useFadeOutLayout } from "./hooks/useOverlayTimeout";
import { FramesMetric } from "./components/FramesMetric";
import { defaultSettings } from "./data";

function App() {
  const [settings, setSettings] = createSignal<Settings>(defaultSettings);
  const [refOverlay, setRefOverlay] = createSignal<HTMLDivElement>();

  useCameraControls({ setSettings });
  useFadeOutLayout({ refOverlay })

  return (
    <>
      <div ref={setRefOverlay} class="fixed flex items-center justify-center top-0 right-0 left-0 bottom-0 h-screen w-screen bg-color bg-gray-100">
        <div class="flex flex-col">
          <h1 class="mb-4 text-5xl text-center font-bold text-gray-900">
            RayCasting Demo
          </h1>
          <p class="mb-6 text-base text-center font-normal text-gray-500">Learn and experiment with raycasting rendering</p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex gap-8">
          <div class="flex flex-col flex-auto items-center">
            <div class="bg-white rounded mt-4 shadow-lg mb-4">
              <Renderer25D settings={settings} />
            </div>
            <div class="mb-2">
              <FramesMetric />
            </div>
            <p class="text-center text-xl font-normal text-gray-500">
              Camera control via {" "}
              <kbd class="p-1.5 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-400 rounded">
                W
              </kbd>{" "}
              <kbd class="p-1.5 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-400 rounded">
                A
              </kbd>{" "}
              <kbd class="p-1.5 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-400 rounded">
                S
              </kbd>{" "}
              <kbd class="p-1.5 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-400 rounded">
                D
              </kbd>{" "}
              keys
            </p>
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
    </>
  );
}

export default App;
