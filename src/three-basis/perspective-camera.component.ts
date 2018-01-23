import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';
import {PerspectiveCamera} from 'three';
import {CameraProvider} from './camera-provider.service';
import {RendererProvider} from './renderer-provider.service';
import {Controller} from './controller';

@Component({selector: 'perspective-camera', template: '<ng-content></ng-content>'})
export class PerspectiveCameraComponent implements AfterContentInit {
    @ContentChildren('controller')
    private controllers: QueryList<Controller> = new QueryList<Controller>();

    private perspectiveCamera: PerspectiveCamera;

    constructor(private cameraProvider: CameraProvider, private rendererProvider: RendererProvider) {
      const renderer = this.rendererProvider.getRenderer();
      const rendererSize = renderer.getSize();
      const aspect = rendererSize.width / rendererSize.height;
      this.perspectiveCamera = new PerspectiveCamera(75, aspect, 0.1, 1000);
      this.perspectiveCamera.position.x = -0.4;
      this.perspectiveCamera.position.z = 1;
      this.perspectiveCamera.position.y = 1;
      this.perspectiveCamera.fov = 70;
      this.cameraProvider.setCamera(this.perspectiveCamera);
    }

    ngAfterContentInit() {
      this.controllers.forEach(p => p.setControllable(this.perspectiveCamera));
    }
}
