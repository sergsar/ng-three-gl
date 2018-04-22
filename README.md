<a href="http://ng-three-gl.xyz" >ng-three-gl</a>
is 3d framework prototype for using webgl javascript library three.js as html visual components in angular cli

our first example component - cube is using remote json datasource fore simple business logic visualize goals

```html
<div *ngIf="getData()" >
  <a href="http://www.idvp.net/" id="idvp-logo">
    <img src="assets/idvp-logo.png">
  </a>
  <canvas>
    <three-area >
      <renderer>
        <scene>
          <perspective-camera>
            <orbit-controller #controller></orbit-controller>
          </perspective-camera>
          <cube-control>
            <bind-item key="Title" value="{{getData()['Title']}}"></bind-item>
            <bind-object name="Transform">
              <bind-object name="Position">
                <bind-item key="X" value="0"></bind-item>
                <bind-item key="Y" value="0"></bind-item>
                <bind-item key="Z" value="0"></bind-item>
              </bind-object>
              <bind-object name="Size">
                <bind-item key="X" value="1"></bind-item>
                <bind-item key="Y" value="0.15"></bind-item>
                <bind-item key="Z" value="1"></bind-item>
              </bind-object>
            </bind-object>
            <bind-object name="CubeParts">
              <bind-item key="Title" value="{{getData()['CubeParts'] && getData()['CubeParts']['Title']}}"></bind-item>
              <bind-object *ngFor="let cubePart of getData()['CubeParts'] && getData()['CubeParts']['Parts']" name="CubePart">
                <bind-item key="Title" value="{{cubePart['Title']}}"></bind-item>
                <bind-item key="Name" value="{{cubePart['Name']}}"></bind-item>
                <bind-item key="Value" value="{{cubePart['Value']}}"></bind-item>
                <bind-item key="Color" value="{{cubePart['Color']}}"></bind-item>
              </bind-object>
            </bind-object>
            <bind-object name="CubeRates">
              <bind-item key="Title" value="{{getData()['CubeRates'] && getData()['CubeRates']['Title']}}"></bind-item>
              <bind-object *ngFor="let cubeRate of getData()['CubeRates'] && getData()['CubeRates']['Rates']" name="CubeRate">
                <bind-item key="Title" value="{{cubeRate['Title']}}"></bind-item>
                <bind-item key="Color" value="{{cubeRate['Color']}}"></bind-item>
                <bind-item key="Percent" value="{{cubeRate['Percent']}}"></bind-item>
                <bind-item key="PercentText" value="{{cubeRate['PercentText']}}"></bind-item>
                <bind-item key="Value" value="{{cubeRate['Value']}}"></bind-item>
              </bind-object>
            </bind-object>
          </cube-control>
          <hemisphere-light></hemisphere-light>
          <direct-light></direct-light>
        </scene>
      </renderer>
    </three-area>
  </canvas>
</div>
```
