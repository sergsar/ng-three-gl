import { Injectable } from '@angular/core';
import { Object3D, Raycaster, Vector2 } from 'three';
import { CanvasControllerComponent } from './canvas-controller.component';
import { RendererComponent } from './renderer.component';
import { InputProvider } from './input-provider';

@Injectable()
export class RaycastProvider {

    private mouseVector: Vector2 = new Vector2();
    private raycaster: Raycaster = new Raycaster();
    private canvas: HTMLCanvasElement;


    constructor(
        private sceneInputProvider: InputProvider,
        private rendererComponent: RendererComponent,
        canvasControllerComponent: CanvasControllerComponent) {

        this.canvas = canvasControllerComponent.Canvas;
    }

    public checkIntersection(target: Object3D): boolean {
        if(!this.rendererComponent.getActiveCamera())
        {
            return;
        }
        const rect = this.canvas.getBoundingClientRect();
        const x = (this.sceneInputProvider.ClientX - rect.left) / rect.width;
        const y = (this.sceneInputProvider.ClientY - rect.top) / rect.height;
        this.mouseVector.set((x * 2) - 1, - (y * 2) + 1);

        this.raycaster.setFromCamera(this.mouseVector, this.rendererComponent.getActiveCamera());
        const intersections = this.raycaster.intersectObject(target, true);
        const intersected = intersections.length > 0;
        return intersected;
    }
}
