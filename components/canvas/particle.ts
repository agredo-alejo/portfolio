import { createVector, Vector, random2D } from "@apjs/vector";
import { fill, circle, grayScaleColor, triangleVector } from "@apjs/dynamic";

export class Particle {
    position: Vector
    radio: number
    velocity: Vector
    stickyDistance: number
    constructor(stickyDistance?: number) {
        this.position = createVector(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        )

        this.velocity = random2D()
        this.velocity.mag = 0.7
        this.radio = 1
        this.stickyDistance = stickyDistance || Math.hypot(window.innerWidth, window.innerHeight) / 5.5
    }
    draw(ctx: CanvasRenderingContext2D) {
        circle(ctx, this.position, this.radio)
        fill(ctx)
    }
    edges(ctx: CanvasRenderingContext2D) {
        if (this.position.x + this.radio > ctx.canvas.width || this.position.x - this.radio < 0) {
            this.velocity.x *= -1
        }
        if (this.position.y + this.radio > ctx.canvas.height || this.position.y - this.radio < 0) {
            this.velocity.y *= -1
        }
    }
    triangles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
        let closest, secondClosest

        let record = Infinity
        for (let particle of particles) {
            if (this === particle) continue

            let distance = this.position.dist(particle.position)
            if (distance >= record) continue

            record = distance
            secondClosest = closest
            closest = particle
        }
        if (!closest || !secondClosest) return

        let side1 = this.position.dist(secondClosest.position)
        let side2 = this.position.dist(closest.position)
        let side3 = secondClosest.position.dist(closest.position)


        let largerSide = Math.max(side1, side2, side3)
        let shorterSide = Math.min(side1, side2, side3)


        if (largerSide >= this.stickyDistance) return
        let alpha = 1 - (shorterSide + largerSide) / (this.stickyDistance * 2)

        triangleVector(ctx, this.position, closest.position, secondClosest.position)
        fill(ctx, grayScaleColor([75, alpha]))

    }
    update(ctx: CanvasRenderingContext2D, particles: Particle[]) {
        this.position.add(this.velocity)
        this.edges(ctx)
        this.triangles(ctx, particles)
    }
}
