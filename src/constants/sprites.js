import { v4 as uuid } from 'uuid'
const squareId = uuid()
const triangleId = uuid()
const catId = uuid()

export const SPRITE_WIDTH = 85;
export const SPRITE_HEIGHT = 85;
export default [
    {
        id: catId,
        name: "cat",
        position: { x: 0, y: 0 },
        rotation: 0,
        actions: [],
    },
    {
        id: squareId,
        name: "Square",
        position: { x: 140, y: 0 },
        rotation: 0,
        actions: [],
    },
    {
        id: triangleId,
        name: "Triangle",
        position: { x: 140, y: 0 },
        rotation: 0,
        actions: [],
    }
]