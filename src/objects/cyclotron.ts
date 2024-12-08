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
    /**
     * Gap [m]
     *
     * Gap between cyclotron's elements.
     */
    gap: number
    /**
     * Radius [m]
     *
     * Radius of each of cyclotron's elements.
     */
    radius: number
    /**
     * Magnetic field [T]
     *
     * The magnetic field vector is a vector of length {magnetic_field},
     * going away from observer if the number is positive and towards the observer if negative.
     */
    magnetic_field: number
    /**
     * Voltage [V]
     *
     * The voltage applied to cyclotron's elements at any given time.
     */
    voltage: number
    /**
     * Cyclotron's simulation bounds.
     *
     * Declares how big of a region must be cleared to reset the picture
     * and where objects must disappear if they get too far away.
     */
    bounds: Bounds
    _p5: P5
    constructor(p5: P5, gap: number, radius: number) {
        this._p5 = p5
        this.gap = gap
        this.radius = radius
        this.magnetic_field = 0
        this.voltage = 0
        this.bounds = new Bounds(
            - radius - BOUNDS_PADDING,
            - radius - BOUNDS_PADDING - gap / 2,
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
        p5.arc(0,
            - this.gap / 2,
            this.radius * 2,
            this.radius * 2,
            p5.PI, p5.TWO_PI,
            p5.CHORD)
        p5.arc(0,
            this.gap / 2,
            this.radius * 2,
            this.radius * 2,
            0, p5.PI,
            p5.CHORD)
    }
}