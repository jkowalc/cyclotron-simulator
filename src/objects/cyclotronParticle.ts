import P5 from "p5";
import {Cyclotron} from "./cyclotron.ts";

export class CyclotronParticle {
    _p5: P5
    cyclotron: Cyclotron
    /**
     * Position [m] (2D vector)
     */
    pos: P5.Vector
    /**
     * Velocity [m/s] (2D vector)
     */
    velocity: P5.Vector
    /**
     * Charge [C]
     */
    charge: number
    /**
     * Mass [kg]
     */
    mass: number
    _acceleration: P5.Vector
    constructor(p5: P5, cyclotron: Cyclotron, start_pos: P5.Vector, start_velocity: P5.Vector) {
        this._p5 = p5;
        this.pos = start_pos
        this.velocity = start_velocity
        this.cyclotron = cyclotron
        this.mass = 0
        this.charge = 0
        this._acceleration = new P5.Vector(0, 0)
    }

    draw(p5: P5) {
        if(!this.cyclotron.bounds.inside(this.pos)) return
        // Colors only for testing isInElectricField and isInMagneticField
        p5.push()
        if (this.isInElectricField() && this.isInMagneticField()) {
            p5.stroke(255, 0, 0)
        } else if (this.isInElectricField()) {
            p5.stroke(0, 255, 0)
        } else if (this.isInMagneticField()) {
            p5.stroke(0, 0, 255)
        } else {
            p5.stroke(0, 0, 0)
        }
        p5.strokeWeight(0.5)
        p5.point(this.pos)
        p5.pop()
    }

    update() {
        const p5 = this._p5;
        let acceleration = new P5.Vector()
        const dt = 5e-13
        if(this.isInElectricField()) {
            const electricPart = new P5.Vector(0, dt * this.cyclotron.voltage * this.charge / this.mass / this.cyclotron.gap)
            acceleration.add(electricPart)
        }
        if(this.isInMagneticField()) {
            const magneticPart = this.velocity.copy().rotate(p5.HALF_PI).mult(dt * this.charge * this.cyclotron.magnetic_field / this.mass)
            acceleration.add(magneticPart)
        }
        this.velocity.add(acceleration)
        this.pos.add(this.velocity)
        this._acceleration = acceleration
    }

    getAcceleration() {
        return this._acceleration;
    }

    /**
     * Calculates whether the particle is in range of the cyclotron's electric field.
     */
    isInElectricField(): boolean {
        return this.pos.x > (-this.cyclotron.radius) &&
            this.pos.x < (this.cyclotron.radius) &&
            this.pos.y > (-this.cyclotron.gap / 2) &&
            this.pos.y < (this.cyclotron.gap / 2)
    }

    /**
     * Calculates whether the particle is in range of the cyclotron's magnetic field.
     */
    isInMagneticField(): boolean {
        return this.pos.dist(new P5.Vector(0, -this.cyclotron.gap / 2)) < this.cyclotron.radius ||
        this.pos.dist(new P5.Vector(0, this.cyclotron.gap / 2)) < this.cyclotron.radius ||
        this.isInElectricField()
    }
}