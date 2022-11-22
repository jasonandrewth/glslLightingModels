export default class MathHelper {
  constructor() {}

  rand_range = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
  };

  rand_normalish = () => {
    const r = Math.random() + Math.random() + Math.random() + Math.random();
    return (r / 4.0) * 2.0 - 1;
  };

  rand_int = (a: number, b: number) => {
    return Math.round(Math.random() * (b - a) + a);
  };

  lerp(x: number, a: number, b: number) {
    return x * (b - a) + a;
  }

  step(edge: number, x: number) {
    if (x < edge) {
      return 0.0;
    }
    return 1.0;
  }

  smoothstep(x: number, a: number, b: number) {
    x = x * x * (3.0 - 2.0 * x);
    return x * (b - a) + a;
  }

  smootherstep(x: number, a: number, b: number) {
    x = x * x * x * (x * (x * 6 - 15) + 10);
    return x * (b - a) + a;
  }

  clamp(x: number, a: number, b: number) {
    return Math.min(Math.max(x, a), b);
  }

  sat(x: number) {
    return Math.min(Math.max(x, 0.0), 1.0);
  }
}
