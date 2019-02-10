import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, Object3D, Raycaster, Vector2 } from 'three';
import { AnimateProvider } from './animate-provider.service';
import { CanvasControllerComponent } from './canvas-controller.component';
import { RendererComponent } from './renderer.component';

@Component({
    selector: 'three-raycaster',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaycasterComponent implements OnInit {
    @Output()
    public readonly raycastChange: EventEmitter<boolean> = new EventEmitter();

    @Input()
    public target: Object3D;

    @Input()
    public clientX: number;

    @Input()
    public clientY: number;

    private mouseVector: Vector2 = new Vector2();
    private raycaster: Raycaster = new Raycaster();
    private camera: Camera;
    private intersected: boolean;
    private canvas: HTMLCanvasElement;

    constructor(
        private animateProvider: AnimateProvider,
        rendererComponent: RendererComponent,
        canvasControllerComponent: CanvasControllerComponent) {

        this.camera = rendererComponent.getCamera();
        this.canvas = canvasControllerComponent.Canvas;
    }

    public ngOnInit(): void {


        this.animateProvider.setFrameTask(this, () => this.process());

    }

    private process() : void {
        if(!this.target) {
            return;
        }
        const rect = this.canvas.getBoundingClientRect();
        const x = (this.clientX - rect.left) / rect.width;
        const y = (this.clientY - rect.top) / rect.height;
        this.mouseVector.set((x * 2) - 1, - (y * 2) + 1);

        this.raycaster.setFromCamera(this.mouseVector, this.camera);
        const intersections = this.raycaster.intersectObject(this.target, true);
        const intersected = intersections.length > 0;

        if(this.intersected !== intersected) {
            this.raycastChange.emit(intersected);
            this.intersected = intersected;
        }
    }
}
