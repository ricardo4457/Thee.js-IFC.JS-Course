import { 
    Scene, 
    BoxGeometry, 
    MeshBasicMaterial, 
    Mesh, 
    PerspectiveCamera, 
    WebGLRenderer } from 'three';
    
    // 1 The scene
    const scene = new Scene()
    
    // 2 The Object
    const geometry = new BoxGeometry(1, 0.2, 0.3);
    const material = new MeshBasicMaterial( {color: 'orange'} );
    const cubeMesh = new Mesh( geometry, material );
    const secubeMesh = new Mesh( geometry, material );
    secubeMesh.position.x += 2;
    secubeMesh.scale.set(2,2,2);
    scene.add( cubeMesh );
    scene.add( secubeMesh);
  

    // 3 The Camera
    const sizes = {
        width: 1800,
        height: 800,
    }
    
    const camera = new PerspectiveCamera(75, sizes.width/ sizes.height);
    camera.position.z = 3;
  
    scene.add( camera );

// render

    const canvas = document.getElementById('three-canvas');
const renderer = new WebGLRenderer({
    canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

function animate() {
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.z += 0.01;
    secubeMesh.rotation.x += 0.01;
    secubeMesh.rotation.z += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
 }
 
 animate();