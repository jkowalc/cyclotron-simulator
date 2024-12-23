import P5 from "p5";

export function drawArrow(p5: P5, start: P5.Vector, vector: P5.Vector) {
    const end = start.copy().add(vector)
    const length = vector.mag()
    p5.line(start.x, start.y, end.x, end.y)
    p5.push();
    const angle = p5.atan2(vector.y, vector.x)
    p5.translate(start)
    p5.rotate(angle - p5.HALF_PI)
    const headHalfWidth = length/10;
    const headLength = length/5;
    p5.triangle(headHalfWidth, length - headLength, 0, length, -headHalfWidth, length - headLength)
    p5.pop();
}