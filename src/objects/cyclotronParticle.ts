import P5 from "p5";
import {Cyclotron} from "./cyclotron.ts";

const PARTICLE_SIZE = 5

export class CyclotronParticle {
    _p5: P5
    pos: P5.Vector
    velocity: P5.Vector
    cyclotron: Cyclotron
    charge: number
    mass: number
    constructor(p5: P5, cyclotron: Cyclotron, start_pos: P5.Vector, start_velocity: P5.Vector, mass: number, charge: number) {
        this._p5 = p5;
        this.pos = start_pos
        this.velocity = start_velocity
        this.cyclotron = cyclotron
        this.mass = mass
        this.charge = charge
    }

    draw(p5: P5) {
        if(!this.cyclotron.bounds.inside(this.pos)) return
        // Colors only for testing isInElectricField and isInMagneticField
        p5.push()
        p5.noStroke()
        if (this.isInElectricField() && this.isInMagneticField()) {
            p5.fill(255, 0, 0)
        } else if (this.isInElectricField()) {
            p5.fill(0, 255, 0)
        } else if (this.isInMagneticField()) {
            p5.fill(0, 0, 255)
        } else {
            p5.fill(0, 0, 0)
        }
        p5.circle(this.pos.x, this.pos.y, PARTICLE_SIZE)
        p5.pop()
    }

    update() {

    }

    /**
     * Calculates whether the particle is in range of the cyclotron's electric field.
     */
    isInElectricField(): boolean {
        return this.pos.x > (this.cyclotron.center.x - this.cyclotron.radius) &&
            this.pos.x < (this.cyclotron.center.x + this.cyclotron.radius) &&
            this.pos.y > (this.cyclotron.center.y - this.cyclotron.gap / 2) &&
            this.pos.y < (this.cyclotron.center.y + this.cyclotron.gap / 2)
    }

    /**
     * Calculates whether the particle is in range of the cyclotron's magnetic field.
     */
    isInMagneticField(): boolean {
        const p5 = this._p5;
        return this.pos.dist(P5.Vector.add(this.cyclotron.center, p5.createVector(0, -this.cyclotron.gap / 2))) < this.cyclotron.radius ||
        this.pos.dist(P5.Vector.add(this.cyclotron.center, p5.createVector(0, this.cyclotron.gap / 2))) < this.cyclotron.radius ||
        this.isInElectricField()
    }
}