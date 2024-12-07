import P5 from "p5";

const BOUNDS_BUFFER = 3;
const BOUNDS_PADDING = 20;

class Bounds {
    x: number
    y: number
    width: number
    height: number
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    inside(v: P5.Vector) {
        return v.x >= this.x + BOUNDS_BUFFER
            && v.x <= this.x + this.width - BOUNDS_BUFFER
            && v.y >= this.y + BOUNDS_BUFFER
            && v.y <= this.y + this.height - BOUNDS_BUFFER
    }
}

export class Cyclotron {
    center: P5.Vector
    gap: number
    radius: number
    magnetic_field: number
    voltage: number
    bounds: Bounds
    _p5: P5
    constructor(p5: P5, center: P5.Vector, gap: number, radius: number, magnetic_field: number, voltage: number) {
        this._p5 = p5
        this.center = center
        this.gap = gap
        this.radius = radius
        this.magnetic_field = magnetic_field
        this.voltage = voltage
        this.bounds = new Bounds(
            center.x - radius - BOUNDS_PADDING,
            center.y - radius - BOUNDS_PADDING - gap / 2,
            2 * BOUNDS_PADDING + 2 * radius,
            2 * BOUNDS_PADDING + 2 * radius + gap
        )
    }
    draw() {
        const p5 = this._p5;
        p5.push()
        p5.fill(255)
        p5.noStroke()
        p5.rect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height)
        p5.pop()
        p5.arc(this.center.x,
            this.center.y - this.gap / 2,
            this.radius * 2,
            this.radius * 2,
            p5.PI, p5.TWO_PI,
            p5.CHORD)
        p5.arc(this.center.x,
            this.center.y + this.gap / 2,
            this.radius * 2,
            this.radius * 2,
            0, p5.PI,
            p5.CHORD)
    }
}