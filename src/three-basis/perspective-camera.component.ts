// tslint:disable: no-duplicate-imports no-import-side-effect ordered-imports

import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Unsubscribable } from 'rxjs';
import { ClampToEdgeWrapping, Matrix4, Object3D, PerspectiveCamera, RepeatWrapping, RGBAFormat, RGBFormat, Sprite, SpriteMaterial, Texture, Vector3 } from 'three';
import * as THREE from 'three';
import '../assets/js/three/EnableThreeExamples';
import 'three/examples/js/postprocessing/EffectComposer';
import 'three/examples/js/postprocessing/ShaderPass';
import 'three/examples/js/shaders/CopyShader';
import 'three/examples/js/postprocessing/MaskPass';
import '../assets/js/three/SimplexNoise';
import '../assets/js/three/shaders/SSAOShader';
import 'three/examples/js/postprocessing/SSAOPass';
import { ElementProviderService } from '../services/element-provider.service';

import { CameraComponent } from './camera.component';
import { EventDispatcher } from './event-dispatcher';
import { GroupProvider } from './group-provider.service';
import { RendererComponent } from './renderer.component';
import { SceneComponent } from './scene.component';

@Component({
    selector: 'three-perspective-camera',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GroupProvider],
})
export class PerspectiveCameraComponent extends CameraComponent implements OnInit, OnDestroy {

    @Input()
    public id: any;

    @Input()
    public positionX: number = 0.0;

    @Input()
    public positionY: number = 0.0;

    @Input()
    public positionZ: number = 0.0;

    @Input()
    public set ShowIcon(value: boolean) {
        this.showIcon = value;
        if(this.icon) {
            this.icon.visible = value;
        }
    }

    public get object() : Object3D {
        return this.perspectiveCamera;
    }

    @Input()
    public activate: Subscribable<any>;

    private activateSubscription: Unsubscribable;

    private readonly perspectiveCamera: PerspectiveCamera = new PerspectiveCamera();
    private readonly onChange: EventDispatcher = new EventDispatcher();

    private effectComposer: THREE.EffectComposer;

    private icon: Sprite;
    private showIcon: boolean = false;

    constructor(
        private rendererComponent: RendererComponent,
        private sceneComponent: SceneComponent,
        private groupProvider: GroupProvider,
        private elementProviderService: ElementProviderService,
    ) {
        super();
    }

    public ngOnInit(): void {
        const scene = this.sceneComponent.getScene();
        const renderer = this.rendererComponent.Renderer;
        const rendererSize = renderer.getSize();
        this.rendererComponent.addCamera(this.perspectiveCamera, this.id);
        this.perspectiveCamera.near = 0.1;
        this.perspectiveCamera.far = 5.0;
        this.perspectiveCamera.position.x = this.positionX;
        this.perspectiveCamera.position.z = this.positionY;
        this.perspectiveCamera.position.y = this.positionZ;
        this.perspectiveCamera.fov = 70;
        this.perspectiveCamera.focus = 1.0;

        let frameTask: () => void;


        if(!renderer.extensions.get( 'WEBGL_depth_texture' )) {
            console.log('WEBGL_depth_texture error');
        }

        const ssaoPass = new THREE[('SSAOPass')](scene, this.perspectiveCamera);
        ssaoPass.kernelRadius = 0.1;
        // ssaoPass.kernelSize = 16;
        ssaoPass.minDistance = 0.0005;
        ssaoPass.maxDistance = 0.3;
        ssaoPass.renderToScreen = true;

        ssaoPass.output = 0;

        this.onChange.add((w, h) => ssaoPass.setSize(w, h));

        this.effectComposer = new THREE.EffectComposer(this.rendererComponent.Renderer);
        this.effectComposer.addPass(ssaoPass);
        frameTask = () => {
            this.effectComposer.render();
        }

        frameTask = frameTask || (() => renderer.render(scene, this.perspectiveCamera));

        this.perspectiveCamera.addEventListener('render-task', frameTask);

        this.onResize(rendererSize.width, rendererSize.height);
        this.rendererComponent.Resize.add(this.onResize);

        if(this.activate) {
            this.activateSubscription = this.activate.subscribe(() => {
                this.rendererComponent.setActiveCamera(this.id);
                this.perspectiveCamera.dispatchEvent({type: 'start-render'});
            });
        }

        // this.initializeIcon();
    }

    public ngOnDestroy(): void {
        this.rendererComponent.removeCamera(this.id);
        this.rendererComponent.Resize.remove(this.onResize);
        this.activateSubscription.unsubscribe();
    }

    private onResize = (width: number, height: number): void => {
        this.perspectiveCamera.aspect = width / height;
        this.perspectiveCamera.updateProjectionMatrix();
        this.effectComposer.setSize(width, height);
        this.onChange.dispatch(width, height);
    }

    private async initializeIcon(): Promise<void> {
        const spriteTexture = new Texture();
        const spriteTextureUrl = 'assets/textures/camera-icon.png';
        spriteTexture.image = await this.elementProviderService.getImage(spriteTextureUrl);
        spriteTexture.format = RGBAFormat;
        spriteTexture.wrapS = ClampToEdgeWrapping;
        spriteTexture.wrapT = ClampToEdgeWrapping;
        spriteTexture.needsUpdate = true;
        const spriteMaterial = new SpriteMaterial({color: 'gray', map: spriteTexture});
        spriteMaterial.depthTest =false;
        const sprite = new Sprite(spriteMaterial);
        sprite.center.set(0.5, 0.5);
        const spriteScale = new Vector3(0.15, 0.07, 0.001);
        spriteScale.divide(this.groupProvider.Group.getWorldScale(new Vector3()));
        sprite.scale.set(spriteScale.x, spriteScale.y, spriteScale.z);
        this.groupProvider.Group.add(sprite);
        this.icon = sprite;
        this.icon.visible = this.showIcon;
    }
}
