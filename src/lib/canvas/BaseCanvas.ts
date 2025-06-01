export interface DrawLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: Color;
}

export interface DrawVerticalLineProps {
  x: number;
  y1: number;
  y2: number;
  color: Color;
}

export interface DrawRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: Color;
}

export interface DrawCircleProps {
  x: number;
  y: number;
  radius: number;
  color: Color;
}

export const convertColor = ({ r, g, b }: Color): string => `rgba(${r}, ${g}, ${b})`;

export interface BaseCanvas {
  width: number;
  height: number;

  context: CanvasRenderingContext2D;

  drawBackground(color: Color): void;
  drawVerticalLine({ x, y1, y2, color }: DrawVerticalLineProps): void;
  drawLine({ x1, y1, x2, y2, color }: DrawLineProps): void;
  drawRect({ x, y, width, height, color }: DrawRectProps): void;

  clear(): void;
}
