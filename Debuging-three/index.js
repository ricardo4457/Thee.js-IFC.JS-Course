import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
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
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import gsap from "gsap";
const gui = new GUI();


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
const sphereGeometry = new SphereGeometry(0.5);

const solarSystem = new Object3D();
scene.add(solarSystem);

const sunMaterial = new MeshBasicMaterial({color: 'yellow' });
const sunMesh= new Mesh(sphereGeometry, sunMaterial);
solarSystem.add(sunMesh);

const earthMaterial = new MeshBasicMaterial({color: 'blue' });
const earthMesh = new Mesh(sphereGeometry, earthMaterial);
earthMesh.position.set(5, 0, 0);
sunMesh.add(earthMesh);

const moonMaterial = new MeshBasicMaterial({color: 'white' });
const moonMesh = new Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(0.5, 0.5, 0.5);
moonMesh.position.set(1, 0, 0);
earthMesh.add(moonMesh);


const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 2;
scene.add(axes);

const grid = new GridHelper();
grid.material.depthTest = false;
grid.renderOrder = 1;
scene.add(grid);

//3 The Camera
const camera = new PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight
);
camera.position.z = 3;
camera.position.y = 6;
camera.lookAt(solarSystem);
scene.add(camera);

//GUI
const colorParam = {
	color: 0xff0000	
}

const min = -3;
const max = 3;
const step = 0.01;

const transformationFolder =gui.addFolder('Transformation')
transformationFolder.add(sunMesh.position, 'y', min, max, step).name(' Eixo do Y');
transformationFolder.add(sunMesh.position, 'x', min, max, step).name(' Eixo do X');
transformationFolder.add(sunMesh.position, 'z', min, max, step).name('Eixo do Z');
transformationFolder.addFolder('Visibility').add(sunMesh ,'visible');
transformationFolder.addFolder('Color').addColor(colorParam, 'color').onChange(() => {
	sunMesh.material.color.set(colorParam.color);
});

transformationFolder.close();



const functionParam = {
	spin: () => {
		gsap.to(sunMesh.rotation, { y: sunMesh.rotation.y +0.5, duration: 1 });
	}
}

gui.add(functionParam, 'spin');


//4 The Renderer
const renderer = new WebGLRenderer({
  canvas: canvas,
	antialias: true,
	alpha: true,
	powerPreference: 'high-performance',
  
});
renderer.setClearColor("red", 1);

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

function animate() {



  const delta = clock.getDelta();
	cameraControls.update( delta );
	renderer.render( scene, camera );
  requestAnimationFrame(animate);
}

animate();
