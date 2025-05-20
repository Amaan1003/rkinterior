// 3d.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let canvas, renderer, scene, camera, controls, model;

export function init3D() {
  // Setup scene
  canvas = document.querySelector('#heroCanvas');
  scene = new THREE.Scene();
  
  // Setup camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 8);
  
  // Setup renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  
  // Load model (update path to your GLB file)
  const loader = new GLTFLoader();
  //loader.load('3d/modern_bedroom (1).glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(1.5, 1.5, 1.5);
    model.position.y = -1;
    scene.add(model);
    
    // Auto-rotation
    function animate() {
      requestAnimationFrame(animate);
      if (model) model.rotation.y += 0.002;
      renderer.render(scene, camera);
    }
    animate();
  });
  
  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2.2;
  
  // Responsive handling
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', init3D);