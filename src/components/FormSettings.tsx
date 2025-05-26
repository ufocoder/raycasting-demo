import { type Accessor, type Setter, type Component } from "solid-js";
import { SCREEN_WIDTH } from "../data";

interface SettingsFormProps {
  settings: Accessor<Settings>;
  setSettings: Setter<Settings>;
}

const rayGroup = new Array(4)
  .fill(0)
  .map((_, i) => Math.round(SCREEN_WIDTH / (i + 1)));

const SettingsForm: Component<SettingsFormProps> = ({
  settings,
  setSettings,
}) => {
  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    if (name.startsWith("camera.")) {
      const cameraField = name.split(".")[1] as keyof Settings["camera"];
      setSettings((prev) => ({
        ...prev,
        camera: {
          ...prev.camera,
          [cameraField]:
            typeof value === "string" && !isNaN(Number(value))
              ? Number(value)
              : value,
        },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [name]:
          typeof value === "string" && !isNaN(Number(value))
            ? Number(value)
            : value,
      }));
    }
    e.preventDefault();
  };

  const setRays = (rays: number) => {
    setSettings((prev) => ({
      ...prev,
      rays,
    }));
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} class="p-4">
      <fieldset>
        <legend class="mt-1 mb-1 bg-blue-50 w-full p-1">Rays</legend>

        <div class="flex items-center mb-3">
          {" "}
          <div class="w-1/3">
            <label class="text-sm font-medium text-gray-900 pr-4">
              Numbers:
            </label>
          </div>
          <div class="flex w-2/3">
            {rayGroup.map((rays) => (
              <button
                onClick={() => setRays(rays)}
                class={`cursor-pointer ${rays === settings().rays ? `bg-blue-100` : `bg-grey-100`} text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm`}
              >
                {rays}
              </button>
            ))}
          </div>
        </div>
          <div class="flex items-center mb-2">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="rayStep"
            >
              Step:
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="number"
              id="rayStep"
              name="rayStep"
              min="0.005"
              max="1"
              step="0.005"
              value={settings().rayStep}
              onInput={handleInputChange}
              class="bg-gray-100 border-gray-200 border-1 text-sm appearance-none rounded w-full py-1 px-2 text-gray-700 leading-tight focus:bg-white"
            />
          </div>
        </div>

      </fieldset>

      <fieldset>
        <legend class="mt-1 mb-1 bg-blue-50 w-full p-1">Camera Settings</legend>

        <div class="flex items-center mb-2">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="camera.angle"
            >
              Angle:
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="number"
              id="camera.angle"
              name="camera.angle"
              min="0"
              max="360"
              step="1"
              value={settings().camera.angle}
              onInput={handleInputChange}
              class="bg-gray-100 border-gray-200 border-1 text-sm appearance-none rounded w-full py-1 px-2 text-gray-700 leading-tight focus:bg-white"
            />
          </div>
        </div>

        <div class="flex items-center mb-2">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="camera.fov"
            >
              Field of View:
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="number"
              id="camera.fov"
              name="camera.fov"
              min="1"
              max="120"
              value={settings().camera.fov}
              onInput={handleInputChange}
              class="bg-gray-100 border-gray-200 border-1 text-sm appearance-none rounded w-full py-1 px-2 text-gray-700 leading-tight focus:bg-white"
            />
          </div>
        </div>

        <div class="flex items-center mb-2">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="camera.x"
            >
              Position X:
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="number"
              id="camera.x"
              name="camera.x"
              step="0.1"
              value={settings().camera.x}
              onInput={handleInputChange}
              class="bg-gray-100 border-gray-200 border-1 text-sm appearance-none rounded w-full py-1 px-2 text-gray-700 leading-tight focus:bg-white"
            />
          </div>
        </div>

        <div class="flex items-center mb-2">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="camera.y"
            >
              Position Y:
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="number"
              id="camera.y"
              name="camera.y"
              step="0.1"
              value={settings().camera.y}
              onInput={handleInputChange}
              class="bg-gray-100 border-gray-200 border-1 text-sm appearance-none rounded w-full py-1 px-2 text-gray-700 leading-tight focus:bg-white"
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend class="mt-1 mb-1 bg-blue-50 w-full p-1">Features</legend>
        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            id="withTexture"
            name="withTexture"
            checked={settings().withTexture}
            onChange={handleInputChange}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
          />
          <label
            for="withTexture"
            class="cursor-pointer ms-2 text-sm font-medium text-gray-90"
          >
            With texture
          </label>
        </div>

        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            id="withInterruption"
            name="withInterruption"
            checked={settings().withInterruption}
            onChange={handleInputChange}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2"
          />
          <label
            for="withInterruption"
            class="cursor-pointer ms-2 text-sm font-medium text-gray-900"
          >
            With interruption
          </label>
        </div>

        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            id="withFisheyeFix"
            name="withFisheyeFix"
            checked={settings().withFisheyeFix}
            onChange={handleInputChange}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2"
          />

          <label
            for="withFisheyeFix"
            class="cursor-pointer ms-2 text-sm font-medium text-gray-900"
          >
            With fisheye fix
          </label>
        </div>
      </fieldset>
    </form>
  );
};

export default SettingsForm;
