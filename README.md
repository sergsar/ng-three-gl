<a href="http://ng-three-gl.xyz" >ng-three-gl</a>
is 3d framework prototype designed on Angular 7 and WebGL javascript library Three.js as html visual components

First example component - cube loads json datasource fore simple business logic visualize goals

Our planes to support visualization of any kind data with no complexity limitation components in 3D space
```html
  <canvas></canvas>
  <three-canvas-controller [width]="Width" [height]="Height">
    <three-renderer [width]="Width" [height]="Height">
      <three-scene [backgroundColor]="'0 0 0'" #owner>
        <three-grid-helper [parent]="owner['scene']" [visible]="true"></three-grid-helper>
        <three-perspective-camera #controllable>
          <three-orbit-controller
            [controllable]="controllable['object']"
          ></three-orbit-controller>
        </three-perspective-camera>
        <three-hemisphere-light></three-hemisphere-light>
        <three-direct-light></three-direct-light>
        <three-cube></three-cube>
      </three-scene>
    </three-renderer>
  </three-canvas-controller>
```
