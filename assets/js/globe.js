// Simple globe implementation with globe-gl
// Non-interactive background visual for index page

let globe;

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, looking for globe container...');
  const container = document.getElementById('globe-container');
  if (!container) {
    console.error('Globe container not found!');
    return;
  }
  console.log('Globe container found:', container);

  // Load globe-gl from CDN and initialize
  loadGlobeGL().then(() => {
    console.log('Globe GL loaded successfully');
    initGlobe();
  }).catch(error => {
    console.error('Failed to load globe-gl:', error);
  });
});

function loadGlobeGL() {
  return new Promise((resolve, reject) => {
    if (window.Globe) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/globe.gl@2.27.0/dist/globe.gl.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function initGlobe() {
  console.log('Initializing globe...');
  const container = document.getElementById('globe-container');
  console.log('Container dimensions:', container.offsetWidth, 'x', container.offsetHeight);
  
  globe = Globe()(container)  // Pass container directly to Globe
    .globeImageUrl('./assets/images/earth-dark.jpg')
    .backgroundColor('rgba(0,0,0,0)')
    .width(container.offsetWidth)
    .height(400);
  
  console.log('Globe object created and mounted:', globe);
  
  // Wait a bit for the globe to initialize, then configure controls
  setTimeout(() => {
    try {
      // Disable all interactions for background effect
      globe.controls().enableZoom = false;
      globe.controls().enableRotate = false;
      globe.controls().enablePan = false;
      
      // Auto-rotate the globe
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;
      
      console.log('Globe controls configured');
    } catch (error) {
      console.error('Error configuring globe controls:', error);
    }
  }, 500);  // Increased timeout

  // Load country data
  fetch('./assets/datasets/ne_110m_admin_0_countries.geojson')
    .then(response => response.json())
    .then(countries => {
      globe
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.3)
        .hexPolygonColor(() => '#2c3e50')
        .hexPolygonAltitude(0.01);
      
      // Add satellites after countries are loaded
      addSatellites();
    })
    .catch(error => {
      console.error('Failed to load country data:', error);
      // Still add satellites even if countries fail
      addSatellites();
    });
}

function addSatellites() {
  const satellites = [];
  const satelliteColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
  
  // Create 6 satellites with different orbits
  for (let i = 0; i < 6; i++) {
    const lat = (Math.random() - 0.5) * 180;
    const lng = (Math.random() - 0.5) * 360;
    const altitude = 0.1 + Math.random() * 0.1; // Random altitude between 0.1 and 0.2
    
    satellites.push({
      lat: lat,
      lng: lng,
      altitude: altitude,
      color: satelliteColors[i],
      size: 0.5
    });
  }

  globe.pointsData(satellites)
    .pointColor('color')
    .pointAltitude('altitude')
    .pointRadius('size');

  // Animate satellites in orbit
  animateSatellites(satellites);
}

function animateSatellites(satellites) {
  let frame = 0;
  
  function animate() {
    frame++;
    
    satellites.forEach((sat, i) => {
      // Different orbital speeds for each satellite
      const speed = 0.3 + (i * 0.1);
      sat.lng = (sat.lng + speed) % 360;
    });
    
    // Update globe data every 10 frames for performance
    if (frame % 10 === 0) {
      globe.pointsData([...satellites]);
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}