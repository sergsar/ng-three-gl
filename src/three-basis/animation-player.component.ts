import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { AnimationMixer, Clock, Geometry, Object3D } from 'three';
import { AnimateProvider } from './animate-provider.service';

@Component({
    selector: 'three-animation-player',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimationPlayerComponent implements OnDestroy {

    @Input()
    public set animationSource(source: Object3D) {
        const geometry = source as unknown as Geometry;
        if(source) {
            this.playAnimation(geometry);
        }
    }

    private readonly clock = new Clock();

    constructor(private animateProvider: AnimateProvider) {

    }

    public ngOnDestroy(): void {
        this.animateProvider.unsetFrameTask(this);
    }

    private playAnimation(animationSource: Geometry): void {

        const animationClips = animationSource.animations;

        if(!(animationClips && animationClips.length)) {
            return;
        }

        const mixer = new AnimationMixer(animationSource);
        for(const key of Object.keys(animationClips)) {
            const action = mixer.clipAction(animationClips[key]);
            action.play();
        }

        this.animateProvider.unsetFrameTask(this);
        this.animateProvider.setFrameTask(this, () => {
            const delta = this.clock.getDelta();
            mixer.update(delta);
        });
    }
}
