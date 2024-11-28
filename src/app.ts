import './style.css'
import P5 from "p5";


const sketch = (p5: P5) => {
    // Persistent variables here

    // Setup function - runs once
    p5.setup = ()=> {
        const canvas = p5.createCanvas(500, 500);
        canvas.parent("app");
    }

    // Draw function - runs every frame
    p5.draw = () => {
        // Test drawing
        p5.ellipse(100, 100, 100);
    }

}

new P5(sketch);