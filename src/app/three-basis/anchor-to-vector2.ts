import {Vector2} from 'three';

export function anchorToVector2(value: number) {
    let x = Math.round(value * 0.1) - 1;
    let  y = (value % 10) - 1;
    return new Vector2(x, y);
}
