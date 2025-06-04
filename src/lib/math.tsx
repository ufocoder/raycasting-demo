export const minmax = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function degreeToRadians(degree: number) {
  return (degree * Math.PI) / 180;
}

export function round(number: number, precision = 2) {
  return Math.floor(number * Math.pow(10, precision)) / Math.pow(10, precision);
}
