import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";
import { CSS2DRenderer, CSS2DObject } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/renderers/CSS2DRenderer.js';

globe(document.getElementById('globe-container')).addLayer(labelsLayer).update();

// Set up scene
var scene = new THREE.Scene();

// Set up camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Set up renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create globe geometry
var geometry = new THREE.SphereGeometry(2, 32, 32);

// Load globe texture
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('earthtexturemap.jpeg');

// Create material with texture
var material = new THREE.MeshBasicMaterial({ map: texture });

// Create globe mesh
var globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Set up OrbitControls
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Set up animation
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate(); 