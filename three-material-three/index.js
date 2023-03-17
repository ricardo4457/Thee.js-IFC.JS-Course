import {
   MeshPhongMaterial,
  Scene,
  BoxGeometry,
  TextureLoader,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
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
  DirectionalLight,
  MathUtils,
  Clock
} from "three";

import CameraControls from 'camera-controls';

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

//2 The Object
const geometry = new BoxGeometry(0.5, 0.5, 0.5);
const loader = new TextureLoader();
const material = new MeshPhongMaterial({
	color: 'orange',
	specular: 'white',
	shininess: 100,
	flatShading: true,
	map: loader.load("https://raw.githubusercontent.com/IFCjs/ifcjs-crash-course/main/static/logo.png"),
});
const cubeMesh = new Mesh(geometry, material);
scene.add(cubeMesh);

//3 The Camera
const camera = new PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight
);
camera.position.z = 3; // Z let's you move backwards and forwards. X is sideways, Y is upward and do
scene.add(camera);

//4 The Renderer


const renderer = new WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});

var light = new DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 );
scene.add(light);

var light = new DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 );
scene.add(light);

var light1 = new DirectionalLight( 0xffffff );
light1.position.set( 0, 1, 1 );
scene.add(light1);

// Controls
CameraControls.install( { THREE: subsetOfTHREE } ); 
const clock = new Clock();
const cameraControls = new CameraControls(camera, canvas);
cameraControls.dollyToCursor = true;
function animate() {
  const delta = clock.getDelta();
  cameraControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();