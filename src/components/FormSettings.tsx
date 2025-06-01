import { type Accessor, type Setter, type Component } from "solid-js";
import { SCREEN_WIDTH } from "../data";
import { round } from "../lib/math";

interface SettingsFormProps {
  settings: Accessor<Settings>;
  setSettings: Setter<Settings>;
}

const uniq = (numbers: number[]) => Array.from(new Set(numbers));
const devideBy2 = (initialNumber: number, times: number) =>
  new Array(times).fill(0).map((_, i) => Math.round(initialNumber / 2 ** i));

const normalize = (value: string | boolean) =>
  typeof value === "string" && !isNaN(Number(value)) ? Number(value) : value;

const rayGroups = uniq(devideBy2(SCREEN_WIDTH, 7));

const SettingsForm: Component<SettingsFormProps> = ({
  settings,
  setSettings,
}) => {
  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    if (name.includes(".")) {
      const names = name.split(".");

      const groupProperty = names[0] as "camera" | "raycasting";
      const propertyName = names[1] as
        | keyof Settings["camera"]
        | keyof Settings["raycasting"];

      setSettings((prev) => ({
        ...prev,
        [groupProperty]: {
          ...prev[groupProperty],
          [propertyName]: normalize(value),
        },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [name]: normalize(value),
      }));
    }
    e.preventDefault();
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} class="p-4">
      <fieldset>
        <legend class="mt-1 mb-1 bg-blue-50 w-full p-1">Raycasting</legend>

        <div class="flex items-center mb-1">
          {" "}
          <div class="w-1/2">
            <label class="text-sm font-medium text-gray-900 pr-4">
              Rays amount:
            </label>
          </div>
          <div class="w-1/2">
            <select
              id="raycasting.amount"
              name="raycasting.amount"
              value={settings().raycasting.amount}
              class="bg-gray-100 border-gray-200 border-1 text-sm rounded w-full py-1 px-1 text-gray-700 leading-tight focus:bg-white"
              onInput={handleInputChange}
            >
              {rayGroups.map((rays) => (
                <option value={rays}>{rays}</option>
              ))}
            </select>
          </div>
        </div>
        <div class="flex items-center mb-1">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="raycasting.step"
            >
              Ray step
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="number"
              id="raycasting.step"
              name="raycasting.step"
              min="0.005"
              max="1"
              step="0.005"
              value={settings().raycasting.step}
              onInput={handleInputChange}
              class="bg-gray-100 border-gray-200 border-1 text-sm appearance-none rounded w-full py-1 px-2 text-gray-700 leading-tight focus:bg-white"
            />
          </div>
        </div>
        <div class="flex items-center mb-1">
          <div class="w-1/2">
            <label
              for="raycasting.fisheyeFix"
              class="text-sm font-medium text-gray-900 pr-4 cursor-pointer "
            >
              Fix fisheye
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="checkbox"
              id="raycasting.fisheyeFix"
              name="raycasting.fisheyeFix"
              checked={settings().raycasting.fisheyeFix}
              onChange={handleInputChange}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm "
            />
          </div>
        </div>
        <div class="flex items-center mb-1">
          <div class="w-1/2">
            <label
              for="raycasting.textureWalls"
              class="text-sm font-medium text-gray-900 pr-4 cursor-pointer "
            >
              Texture walls
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="checkbox"
              id="raycasting.textureWalls"
              name="raycasting.textureWalls"
              checked={settings().raycasting.textureWalls}
              onChange={handleInputChange}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm "
            />
          </div>
        </div>

        <div class="flex items-center mb-1">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="raycasting.textureFloor"
            >
              Texture floor
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="checkbox"
              id="raycasting.textureFloor"
              name="raycasting.textureFloor"
              checked={settings().raycasting.textureFloor}
              onChange={handleInputChange}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
            />
          </div>
        </div>

        <div class="flex items-center mb-1">
          <div class="w-1/2">
            <label
              for="raycasting.useBuffer"
              class="text-sm font-medium text-gray-900 pr-4 cursor-pointer "
            >
              Use buffer
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="checkbox"
              id="raycasting.useBuffer"
              name="raycasting.useBuffer"
              checked={settings().raycasting.useBuffer}
              onChange={handleInputChange}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm "
            />
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend class="mt-1 mb-1 bg-blue-50 w-full p-1">Camera</legend>

        <div class="flex items-center mb-1">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="camera.angle"
            >
              Angle
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
              value={round(settings().camera.angle)}
              onInput={handleInputChange}
              class="bg-gray-100 border-gray-200 border-1 text-sm appearance-none rounded w-full py-1 px-2 text-gray-700 leading-tight"
            />
          </div>
        </div>

        <div class="flex items-center mb-1">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="camera.fov"
            >
              Field of View
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

        <div class="flex items-center mb-1">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="camera.x"
            >
              Position X
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="number"
              id="camera.x"
              name="camera.x"
              step="0.01"
              value={round(settings().camera.x)}
              onInput={handleInputChange}
              class="bg-gray-100 border-gray-200 border-1 text-sm appearance-none rounded w-full py-1 px-2 text-gray-700 leading-tight focus:bg-white"
            />
          </div>
        </div>

        <div class="flex items-center mb-1">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="camera.y"
            >
              Position Y
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="number"
              id="camera.y"
              name="camera.y"
              step="0.01"
              value={round(settings().camera.y)}
              onInput={handleInputChange}
              class="bg-gray-100 border-gray-200 border-1 text-sm appearance-none rounded w-full py-1 px-2 text-gray-700 leading-tight focus:bg-white"
            />
          </div>
        </div>

        <div class="flex items-center mb-1">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="camera.moveSpeed"
            >
              Move speed
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="number"
              id="camera.moveSpeed"
              name="camera.moveSpeed"
              min="0"
              step="0.025"
              max="0.5"
              value={settings().camera.moveSpeed}
              onInput={handleInputChange}
              class="bg-gray-100 border-gray-200 border-1 text-sm appearance-none rounded w-full py-1 px-2 text-gray-700 leading-tight focus:bg-white"
            />
          </div>
        </div>

        <div class="flex items-center mb-1">
          <div class="w-1/2">
            <label
              class="text-sm font-medium text-gray-900 pr-4"
              for="camera.rotationSpeed"
            >
              Rotation speed
            </label>
          </div>
          <div class="w-1/2">
            <input
              type="number"
              id="camera.rotationSpeed"
              name="camera.rotationSpeed"
              min="0"
              step="0.025"
              max="5"
              value={settings().camera.rotationSpeed}
              onInput={handleInputChange}
              class="bg-gray-100 border-gray-200 border-1 text-sm appearance-none rounded w-full py-1 px-2 text-gray-700 leading-tight focus:bg-white"
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default SettingsForm;
