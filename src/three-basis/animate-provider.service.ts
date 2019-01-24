import {Injectable, NgZone} from '@angular/core';

@Injectable()
export class AnimateProvider {

    private animateMap: Map<Object, () => void> = new Map();

    constructor(private ngZone: NgZone) {
        this.animate();
    }

    public setFrameTask(key: Object, task: () => void) : void {
        this.animateMap.set(key, task);
    }

    private animate() : void  {
        this.ngZone.runOutsideAngular(() => requestAnimationFrame(() => this.animate()));
        this.animateMap.forEach( p => p());
    }
}
