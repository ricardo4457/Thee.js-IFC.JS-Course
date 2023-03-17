import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils,
  MOUSE,
  Clock,
  SphereGeometry,
  AxesHelper,
  GridHelper,
  Object3D

} from "three";

import CameraControls from 'camera-controls';

import gsap from "gsap";

import Stats from 'stats.js/src/Stats';


const subsetOfTHREE = {
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  Sphere,
  Raycaster,
  MathUtils: {
    DEG2RAD: MathUtils.DEG2RAD,
    clamp: MathUtils.clamp
  }
};

const canvas = document.getElementById("three-canvas");

//1 The scene
const scene = new Scene();








const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 2;
scene.add(axes);

const grid = new GridHelper();
grid.material.depthTest = false;
grid.renderOrder = 1;
scene.add(grid);


//OBJ

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({color: 'orange'});
const mesh = new Mesh (geometry, material);
scene.add(mesh);


//3 The Camera
const camera = new PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight
);
camera.position.z = 3;
camera.position.y = 6;

scene.add(camera);

const allGeometries = [];
allGeometries.push(geometry);

window.ondblclick = () => {

mesh.removeFromParent(); 
geometry.dispose();
material.dispose();
mesh.geometry= null;
mesh.material= null;

}





//4 The Renderer
const renderer = new WebGLRenderer({
  canvas: canvas,
	antialias: true,
	alpha: true,
	powerPreference: 'high-performance',
  
});
renderer.setClearColor("white", 1);

renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});

// Controls
CameraControls.install( { THREE: subsetOfTHREE } ); 
const clock = new Clock();
const cameraControls = new CameraControls(camera, canvas);

const stats = new Stats();

stats.showPanel(2);
document.body.appendChild(stats.dom)


function animate() {

stats.begin();

  const delta = clock.getDelta();
	cameraControls.update( delta );
	renderer.render( scene, camera );
  requestAnimationFrame(animate);

 stats.end();

}

animate();
