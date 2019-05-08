import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Object3D } from 'three';
import { AnimateProvider } from './animate-provider.service';
import { RaycastProvider } from './raycast-provider';

@Component({
    selector: 'three-raycaster',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RaycastProvider]
})
export class RaycasterComponent {
    @Output()
    public readonly raycastChange: EventEmitter<boolean> = new EventEmitter();

    @Input()
    public target: Object3D;

    private intersected: boolean;

    constructor(
        private animateProvider: AnimateProvider,
        private raycastProvider: RaycastProvider) {

        this.animateProvider.setFrameTask(this, () => this.process());
    }

    private process() : void {
        if(!this.target) {
            return;
        }

        const intersected = this.raycastProvider.checkIntersection(this.target);

        if(this.intersected !== intersected) {
            this.raycastChange.emit(intersected);
            this.intersected = intersected;
        }
    }
}
