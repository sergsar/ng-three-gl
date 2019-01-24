import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    InjectFlags,
    Injector,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    SkipSelf,
} from '@angular/core';
import { Color, Scene } from 'three';
import { groupProviderFactory } from './group-provider.factory';
import { GroupProvider } from './group-provider.service';
import { PerspectiveCameraComponent } from './perspective-camera.component';
import { SceneProvider } from './scene-provider.service';

@Component({
    selector: 'three-scene',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: GroupProvider, useFactory: groupProviderFactory }],
})
export class SceneComponent implements OnInit, OnChanges {

    @Input()
    public backgroundColor: string = '255 255 255';

    @ContentChild(PerspectiveCameraComponent)
    public perspectiveCameraComponent: PerspectiveCameraComponent;

    private scene: Scene;

    constructor(private sceneProvider: SceneProvider, private groupProvider: GroupProvider) {
        this.scene = sceneProvider.getScene();
        this.scene.add(groupProvider.Group);
    }

    public ngOnInit(): void {
        this.updateColor();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.updateColor();
    }

    private updateColor() : void {
        if(this.scene === undefined)
        {
            return;
        }
        const colorString = this.backgroundColor.split(/\s/);
        const r = Number(colorString[0]) / 255.0;
        const g = Number(colorString[1]) / 255.0;
        const b = Number(colorString[2]) / 255.0;
        this.scene.background = new Color(r, g, b);
    }

}
