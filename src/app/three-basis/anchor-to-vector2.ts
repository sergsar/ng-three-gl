import {Vector2} from 'three';

export function anchorToVector2(value: number) {
    const x = Math.round(value * 0.1) - 1;
    const  y = (value % 10) - 1;
    return new Vector2(x, y);
}
