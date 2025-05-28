import { createEffect, onCleanup, createSignal } from "solid-js";

export function FramesMetric() {
  const [fps, setFps] = createSignal(0);

  createEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const updateFps = (time: number) => {
      frameCount++;
      
      if (time >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)));
        frameCount = 0;
        lastTime = time;
      }
      
      animationFrameId = requestAnimationFrame(updateFps);
    };

    animationFrameId = requestAnimationFrame(updateFps);

    onCleanup(() => {
      cancelAnimationFrame(animationFrameId);
    });
  });

  return (
    <div class="text-base">
      FPS: {fps()}
    </div>
  );
}