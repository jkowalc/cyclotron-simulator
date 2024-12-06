import P5 from "p5";

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
        return v.x > this.x
            && v.x < this.x + this.width
            && v.y > this.y
            && v.y < this.y + this.height
    }
}

export class Cyclotron {
    center: P5.Vector
    gap: number
    radius: number
    magnetic_field_power: number
    voltage: number
    bounds: Bounds
    _p5: P5
    constructor(p5: P5, center: P5.Vector, gap: number, radius: number, magnetic_field_power: number, voltage: number, margin: number) {
        this._p5 = p5
        this.center = center
        this.gap = gap
        this.radius = radius
        this.magnetic_field_power = magnetic_field_power
        this.voltage = voltage
        this.bounds = new Bounds(
            center.x - radius - margin,
            center.y - radius - margin - gap / 2,
            2 * margin + 2 * radius,
            2 * margin + 2 * radius + gap
        )
    }
    draw() {
        const p5 = this._p5;
        p5.push()
        p5.fill(255)
        p5.stroke(255)
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