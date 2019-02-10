import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { Color, Scene } from 'three';
import { GroupProvider } from './group-provider.service';

@Component({
    selector: 'three-scene',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GroupProvider],
})
export class SceneComponent implements OnInit, OnChanges {

    @Input()
    public backgroundColor: string = '60 60 60';

    private readonly scene: Scene;

    constructor(groupProvider: GroupProvider) {
        this.scene = new Scene();
        this.scene.add(groupProvider.Group);
    }

    public ngOnInit(): void {
        this.updateColor();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.updateColor();
    }

    public getScene(): Scene {
        return this.scene;
    }

    private updateColor() : void {
        if(!this.scene)
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
