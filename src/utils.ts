import P5 from "p5";

export function vectorToString(vector: P5.Vector): string {
    return "[" + vector.x + ", " + vector.y + "]"
}