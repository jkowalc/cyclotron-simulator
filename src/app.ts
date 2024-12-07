import './style.css'
import P5 from "p5";
import {Cyclotron} from "./objects/cyclotron.ts";
import {CyclotronParticle} from "./objects/cyclotronParticle.ts";


const sketch = (p5: P5) => {
    // Persistent variables here
    let cyclotron: Cyclotron
    let particle: CyclotronParticle

    // Setup function - runs once
    p5.setup = ()=> {
        const canvas = p5.createCanvas(500, 500);
        canvas.parent("app");
        cyclotron = new Cyclotron(p5, p5.createVector(250, 250), 10, 200, 10, 10)
        particle = new CyclotronParticle(p5, cyclotron, cyclotron.center, p5.createVector(0, 0), 10, 10)
    }

    // Draw function - runs every frame
    p5.draw = () => {
        cyclotron.draw()
        particle.pos = p5.createVector(p5.mouseX, p5.mouseY)
        particle.draw(p5)
    }

}

new P5(sketch);