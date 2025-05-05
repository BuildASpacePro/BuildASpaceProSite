// Replace the import statement with a global THREE object (assumes Three.js is loaded via a <script> tag in HTML)
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

const container = document.getElementById('globe-container');
if (!container) {
    console.error("Container element '#globe-container' not found.");
    throw new Error("Container element '#globe-container' not found."); // Stop execution if container is missing
}

const scene = new THREE.Scene();
// Optional: Set background color directly in scene
// scene.background = new THREE.Color(0x050505);

const camera = new THREE.PerspectiveCamera(
    75, // Field of View
    container.clientWidth / container.clientHeight, // Aspect Ratio matches container
    0.1, // Near clipping plane
    1000 // Far clipping plane
);
camera.position.z = 5; // Move camera back so we can see the globe

const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable anti-aliasing for smoother points
renderer.setSize(container.clientWidth, container.clientHeight); // Match the container's dimensions
renderer.setPixelRatio(window.devicePixelRatio || 1); // Ensure pixel ratio fallback for older browsers
container.appendChild(renderer.domElement);

// --- Globe Geometry and Material ---

// Higher detail sphere for more points
const geometry = new THREE.SphereGeometry(
    2,  // Radius of the sphere
    64, // Width segments (more = denser points horizontally)
    32  // Height segments (more = denser points vertically)
);

// Material for the points
const material = new THREE.PointsMaterial({
    color: 0xaaaaaa, // Color of the points (light grey)
    size: 0.015,      // Size of each point
    sizeAttenuation: true // Points farther away appear smaller
});

// Create the Points object (instead of a Mesh)
const earthPoints = new THREE.Points(geometry, material);
// earthPoints.rotation.z = THREE.MathUtils.degToRad(23.45); // Tilt the globe by 23.45 degrees
scene.add(earthPoints);

// --- Lighting (Optional - Not very effective for PointsMaterial) ---
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);


// --- Animation Loop ---
function animate() {
    requestAnimationFrame(animate); // Request the next frame

    // Rotate the points object
    earthPoints.rotation.y += 0.001; // Slower rotation speed
    // earthPoints.rotation.x += 0.0005; // Optional: Tilt rotation

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// --- Handle Window Resizing ---
function onWindowResize() {
    // Update renderer size to match the container
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Update camera aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize);

// --- Start Animation ---
animate();

// --- Optional Enhancements ---
// You could add OrbitControls for user interaction (zooming, panning)
// import { OrbitControls } from 'https://unpkg.com/three@0.164.1/examples/jsm/controls/OrbitControls.js';
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true; // Smooths out the controls
// controls.dampingFactor = 0.05;
// controls.screenSpacePanning = false;
// controls.minDistance = 3;
// controls.maxDistance = 10;
// // If using controls, you need to call controls.update() in the animate loop:
// // function animate() { ... controls.update(); ... renderer.render... }
