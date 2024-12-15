import './style.css'
import P5 from "p5";
import {Cyclotron} from "./objects/cyclotron.ts";
import {CyclotronParticle} from "./objects/cyclotronParticle.ts";
import {vectorToString} from "./utils.ts";

interface Particle {
    mass: number;
    charge: number;
}

const particleData: { [id: string]: Particle } = {
    "Proton": { mass: 1.67e-27, charge: 1.6e-19 },
    "Deuteron": { mass: 3.34e-27, charge: 1.6e-19 },
    "Alpha particle": { mass: 6.64e-27, charge: 3.2e-19 },
    "Electron": { mass: 9.11e-31, charge: -1.6e-19},
}

const sketch = (p5: P5) => {
    // Persistent variables here
    let cyclotron: Cyclotron
    let particle: CyclotronParticle

    let particleSelect: any
    let voltageInput: P5.Element
    let magneticInput: P5.Element

    // Setup function - runs once
    p5.setup = ()=> {
        const canvas = p5.createCanvas(2000, 2000);
        canvas.parent("app");
        
        particleSelect = p5.createSelect()
        particleSelect.position(1300, 300)
        particleSelect.class('input')
        particleSelect.option('Proton')
        particleSelect.option('Deuteron')
        particleSelect.option('Alpha particle')
        particleSelect.option('Electron')

        voltageInput = p5.createInput('10')
        voltageInput.position(1300, 350)
        voltageInput.class('input')
        magneticInput = p5.createInput('200')
        magneticInput.position(1300, 400)
        magneticInput.class('input')

        p5.createElement('label', 'Particle: ').position(1100, 300).class('text')
        p5.createElement('label', 'Voltage [V]: ').position(1100, 350).class('text')
        p5.createElement('label', 'Magnetic field [T]: ').position(1100, 400).class('text')

        cyclotron = new Cyclotron(p5, 1.5, 15)
        cyclotron.voltage = 10
        cyclotron.magnetic_field = 200
        particle = new CyclotronParticle(p5, cyclotron, new P5.Vector(0, 0), new P5.Vector(0, 0))
        particle.mass = 1.67e-27
        particle.charge = 1.6e-19
    }

    // Draw function - runs every frame
    p5.draw = () => {
        const voltageValue = parseFloat(voltageInput.value() as string)
        const magneticValue = parseFloat(magneticInput.value() as string)

        if (!isNaN(voltageValue)) {
            cyclotron.voltage = voltageValue
        }

        if (!isNaN(magneticValue)) {
            cyclotron.magnetic_field = magneticValue
        }

        particle.mass = particleData[particleSelect.value()].mass
        particle.charge = particleData[particleSelect.value()].charge

        p5.background(255)
        const cyclotronCenter = new P5.Vector(500, 500)
        const pictureScale = 25
        p5.push()
        p5.translate(cyclotronCenter)
        p5.scale(pictureScale)
        p5.strokeWeight(0.05)
        cyclotron.draw()
        particle.update()
        particle.draw(p5)
        p5.pop()
        // Temporary position, velocity and acceleration print for debug
        p5.textSize(20)
        p5.text("Position: " + vectorToString(particle.pos), 1000, 150)
        p5.text("Velocity: " + vectorToString(particle.velocity), 1000, 200)
        p5.text("Acceleration: " + vectorToString(particle.getAcceleration()), 1000, 250)
    }

}

new P5(sketch);