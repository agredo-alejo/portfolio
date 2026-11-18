interface Point {
  x: number;
  y: number;
}
export class Particle implements Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  readonly stickyDistance: number;
  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * 0.7;
    this.vy = Math.sin(angle) * 0.7;
    this.stickyDistance = Math.hypot(width, height) / 5.5;
  }
  update(
    context: CanvasRenderingContext2D,
    particles: Particle[],
    width: number,
    height: number,
    delta: number,
  ) {
    this.x += this.vx * delta;
    this.y += this.vy * delta;
    if (this.x + 1 > width || this.x - 1 < 0) this.vx *= -1;
    if (this.y + 1 > height || this.y - 1 < 0) this.vy *= -1;
    let closest: Point | undefined,
      secondClosest: Point | undefined,
      record = Infinity;
    // Preserve the original portfolio's nearest-record triangle behavior.
    for (const other of particles) {
      if (other === this) continue;
      const distance = Math.hypot(this.x - other.x, this.y - other.y);
      if (distance >= record) continue;
      record = distance;
      secondClosest = closest;
      closest = other;
    }
    if (!closest || !secondClosest) return;
    const sides = [
      Math.hypot(this.x - secondClosest.x, this.y - secondClosest.y),
      Math.hypot(this.x - closest.x, this.y - closest.y),
      Math.hypot(secondClosest.x - closest.x, secondClosest.y - closest.y),
    ];
    const longer = Math.max(...sides),
      shorter = Math.min(...sides);
    if (longer >= this.stickyDistance) return;
    const alpha = 1 - (shorter + longer) / (this.stickyDistance * 2);
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(closest.x, closest.y);
    context.lineTo(secondClosest.x, secondClosest.y);
    context.closePath();
    context.fillStyle = "rgba(75,75,75," + alpha + ")";
    context.fill();
  }
}
