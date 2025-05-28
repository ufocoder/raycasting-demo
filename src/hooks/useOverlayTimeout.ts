import { onCleanup, createEffect, type Accessor } from "solid-js";

const duration = 2_500;

interface UseFadeOutLayoutProps {
  refOverlay: Accessor<HTMLElement | undefined>;
}

export function useFadeOutLayout({ refOverlay }: UseFadeOutLayoutProps) {
  createEffect(() => {
    const element = refOverlay();

    if (!element) { 
      return;
    }

    element.style.transition = `opacity ${duration}ms ease-in`;
    element.style.opacity = "1";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.style.opacity = "0";
      });
    });

    const timeoutId = setTimeout(() => {
      element.remove();
    }, duration);

    const handleDocumentClick = () => {
      if (element.isConnected) {
        element.remove();
      }
    };

    const handleDocumentKeydown = () => {
      if (element.isConnected) {
        element.remove();
      }
    }

    document.addEventListener("keydown", handleDocumentKeydown);
    document.addEventListener("click", handleDocumentClick);

    onCleanup(() => {
      document.addEventListener("keydown", handleDocumentKeydown);
      document.removeEventListener("click", handleDocumentClick);
      clearTimeout(timeoutId);
    });
  });
}