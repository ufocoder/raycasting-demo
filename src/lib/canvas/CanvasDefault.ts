import {
  convertColor,
  type BaseCanvas,
  type DrawCircleProps,
  type DrawLineProps,
  type DrawRectProps,
  type DrawVerticalLineProps,
} from "./BaseCanvas";

interface DrawPolygonProps {
  points: { x: number; y: number }[];
  color: Color;
}

export default class CanvasDefault implements BaseCanvas {
  readonly width: number;
  readonly height: number;

  context: CanvasRenderingContext2D;

  constructor(element: HTMLCanvasElement) {
    this.width = element.width;
    this.height = element.height;

    this.context = element.getContext("2d")!;
  }

  drawBackground(color: Color) {
    this.context.fillStyle = convertColor(color);
    this.context.fillRect(0, 0, this.width, this.height);
  }

  drawVerticalLine({ x, y1, y2, color }: DrawVerticalLineProps) {
    this.context.fillStyle = convertColor(color);
    this.context.fillRect(x, y1, 1, y2 - y1);
  }

  drawLine({ x1, y1, x2, y2, color }: DrawLineProps) {
    this.context.strokeStyle = convertColor(color);
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }

  drawRect({ x, y, width, height, color }: DrawRectProps) {
    this.context.fillStyle = convertColor(color);
    this.context.fillRect(x, y, width, height);
  }

  drawCircle({ x, y, radius, color }: DrawCircleProps) {
    this.context.fillStyle = convertColor(color);
    this.context.beginPath();
    this.context.arc(x, y, radius / 2, 0, Math.PI * 2);
    this.context.fill();
  }

  drawPolygon({ points, color }: DrawPolygonProps) {
    this.context.beginPath();
    this.context.moveTo(points[0].x, points[0].y);
    for (let i = 2; i < points.length - 1; i++) {
      this.context.lineTo(points[i].x, points[i].y);
    }
    this.context.closePath();
    this.context.fillStyle = convertColor(color);
    this.context.fill();
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
