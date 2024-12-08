import './style.css'
import P5 from "p5";
import {Cyclotron} from "./objects/cyclotron.ts";
import {CyclotronParticle} from "./objects/cyclotronParticle.ts";
import {vectorToString} from "./utils.ts";


const sketch = (p5: P5) => {
    // Persistent variables here
    let cyclotron: Cyclotron
    let particle: CyclotronParticle

    // Setup function - runs once
    p5.setup = ()=> {
        const canvas = p5.createCanvas(2000, 2000);
        canvas.parent("app");
        cyclotron = new Cyclotron(p5, 1.5, 15)
        cyclotron.voltage = 10
        cyclotron.magnetic_field = 200
        particle = new CyclotronParticle(p5, cyclotron, p5.createVector(0, 0), p5.createVector(0, 0))
        particle.mass = 1.67e-27
        particle.charge = 1.6e-19
    }

    // Draw function - runs every frame
    p5.draw = () => {
        const cyclotronCenter = p5.createVector(500, 500)
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
        p5.push()
        p5.noStroke()
        p5.rect(1000, 100, 1000, 200)
        p5.pop()
        p5.textSize(20)
        p5.text("Position: " + vectorToString(particle.pos), 1000, 150)
        p5.text("Velocity: " + vectorToString(particle.velocity), 1000, 200)
        p5.text("Acceleration: " + vectorToString(particle.getAcceleration()), 1000, 250)
        // Temporary debug end
    }

}

new P5(sketch);