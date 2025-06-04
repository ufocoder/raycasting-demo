import { minmax } from "../math";
import type {
  BaseCanvas,
  DrawLineProps,
  DrawRectProps,
  DrawVerticalLineProps,
} from "./BaseCanvas";

interface DrawPixelProps {
  x: number;
  y: number;
  color: Color;
}

export default class CanvasBuffered implements BaseCanvas {
  readonly width: number;
  readonly height: number;

  context: CanvasRenderingContext2D;

  protected buffer: ImageData;

  constructor(element: HTMLCanvasElement) {
    this.width = element.width;
    this.height = element.height;

    this.context = element.getContext("2d")!;
    this.buffer = this.context.createImageData(this.width, this.height);
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  drawBackground(color: Color) {
    this.drawRect({
      x: 0,
      y: 0,
      height: this.height,
      width: this.width,
      color,
    });
  }

  createBufferSnapshot() {
    this.buffer = this.context.createImageData(this.width, this.height);
  }

  commitBufferSnapshot() {
    this.context.putImageData(this.buffer!, 0, 0);
  }

  protected drawPixel({ x, y, color }: DrawPixelProps) {
    const offset = 4 * (Math.floor(x) + Math.floor(y) * this.width);

    this.buffer.data[offset] = color.r;
    this.buffer.data[offset + 1] = color.g;
    this.buffer.data[offset + 2] = color.b;
    this.buffer.data[offset + 3] = 255;
  }

  drawVerticalLine({ x, y1, y2, color }: DrawVerticalLineProps) {
    for (let y = y1; y < y2; y++) {
      this.drawPixel({ x, y, color });
    }
  }

  drawRect({ x, y, width, height, color }: DrawRectProps) {
    const startX = minmax(x, 0, this.width);
    const startY = minmax(y, 0, this.width);
    const limitX = Math.min(this.width, x + width);
    const limitY = Math.min(this.height, y + height);

    for (let i = startX; i < limitX; i++) {
      for (let j = startY; j < limitY; j++) {
        this.drawPixel({
          x: i,
          y: j,
          color,
        });
      }
    }
  }

  drawLine({ x1, y1, x2, y2, color }: DrawLineProps): void {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      this.drawPixel({ x: Math.round(x1), y: Math.round(y1), color });

      if (x1 === x2 && y1 === y2) {
        break;
      }
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }
    }
  }
}
