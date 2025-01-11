import './style.css'
import P5 from "p5";
import {Cyclotron} from "./objects/cyclotron.ts";
import {CyclotronParticle} from "./objects/cyclotronParticle.ts";

type Particle = {
    mass: number,
    charge: number
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

    let animationStartStop: P5.Element
    let animationReset: P5.Element
    let animationSpeed: P5.Element
    let animationRunning: boolean

    // Setup function - runs once
    p5.setup = ()=> {
        const canvas = p5.createCanvas(1920, 1080);
        canvas.parent("app");

        // Parameter inputs        
        particleSelect = p5.createSelect()
        particleSelect.position(1200, 200)
        particleSelect.class('input')
        particleSelect.option('Proton')
        particleSelect.option('Deuteron')
        particleSelect.option('Alpha particle')
        particleSelect.option('Electron')
        voltageInput = p5.createInput('10')
        voltageInput.position(1200, 250)
        voltageInput.class('input')
        magneticInput = p5.createInput('200')
        magneticInput.position(1200, 300)
        magneticInput.class('input')
        p5.createElement('label', 'Particle: ').position(1000, 200).class('text')
        p5.createElement('label', 'Voltage [V]: ').position(1000, 250).class('text')
        p5.createElement('label', 'Magnetic field [T]: ').position(1000, 300).class('text')
        p5.createElement('label', 'Animation speed: ').position(1000, 350).class('text')

        // Animation control
        animationSpeed = p5.createSlider(-5, 5, 0)
        animationSpeed.position(1200, 360)
        animationSpeed.class('slider')
        animationStartStop = p5.createButton('Start/Stop')
        animationStartStop.position(1050, 400)
        animationStartStop.class('button')
        animationStartStop.mouseClicked(startStopAnimation)
        animationReset = p5.createButton('Reset')
        animationReset.position(1200, 400)
        animationReset.class('button')
        animationReset.mouseClicked(resetAnimation)
        animationRunning = false

        cyclotron = new Cyclotron(p5, 1.5, 15)
        cyclotron.voltage = 10
        cyclotron.magnetic_field = 200
        particle = new CyclotronParticle(p5, cyclotron, new P5.Vector(0, 0), new P5.Vector(0, 0))
        particle.mass = 1.67e-27
        particle.charge = 1.6e-19
        p5.frameRate(60)
    }

    // Draw function - runs every frame
    p5.draw = () => {
        const voltageValue = parseFloat(voltageInput.value() as string)
        const magneticValue = parseFloat(magneticInput.value() as string)

        if (!isNaN(voltageValue)) {
            cyclotron.basicVoltage = voltageValue
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
        if (animationRunning) {
            const speedMultiplier = Math.pow(2, animationSpeed.value() as number)
            cyclotron.update(particle, speedMultiplier)
            particle.update(speedMultiplier)
        }
        cyclotron.draw()
        particle.draw(p5)
        p5.pop()

        // Particle info
        const velocityValue = particle.velocity.mag()
        const kineticEnergy = 6.24151e12 * particle.mass * Math.pow(velocityValue, 2) / 2
        p5.rect(950, 500, 700, 350, 20);
        p5.textSize(20)
        p5.textFont('sans-serif')
        p5.text("Mass: " + particle.mass + " kg", 1000, 550)
        p5.text("Charge: " + particle.charge + " C", 1000, 600)
        p5.text("Velocity: " + velocityValue + " m/s", 1000, 650)
        p5.text("Acceleration: " + particle.getAcceleration().mag() + " m/s^2", 1000, 700)
        p5.text("Kinetic energy: " + kineticEnergy + " MeV", 1000, 750)
        const maxEnergy = 6.24151e12 * (Math.pow(particle.charge * cyclotron.magnetic_field * cyclotron.radius, 2) / (2 * particle.mass))
        p5.text("Theoretical kinetic energy on exit: " + maxEnergy + " MeV", 1000, 800)
        p5.rect(950, 150, 700, 300, 20);
    }

    function startStopAnimation() {
        animationRunning = !animationRunning
    }

    function resetAnimation() {
        particle = new CyclotronParticle(p5, cyclotron, new P5.Vector(0, 0), new P5.Vector(0, 0))
        animationRunning = false
    }
}

new P5(sketch);