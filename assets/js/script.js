// Ensure the Globe library is imported
// <script src="./path/to/globe.min.js"></script> should be included in your HTML file

// Ensure only one instance of Three.js is loaded
// Check your HTML file to ensure Three.js is not imported multiple times

(() => {
    // Ensure the Globe library is loaded
    if (typeof Globe === 'undefined') {
        console.error("Globe library is not loaded. Ensure the script is included in your HTML file.");
        throw new Error("Globe library is not loaded.");
    }

    // Ensure the container exists
    const container = document.getElementById('globe-container'); // Ensure this is declared only once
    if (!container) {
        console.error("Container element '#globe-container' not found.");
        throw new Error("Container element '#globe-container' not found.");
    }

    // Fetch GeoJSON data and render the globe with hexagons
    fetch('./assets/datasets/ne_110m_admin_0_countries.geojson') // Updated path
        .then(res => {
            if (!res.ok) throw new Error(`Failed to fetch GeoJSON: ${res.statusText}`);
            return res.json();
        })
        .then(countries => {
            const globe = new Globe(container) // Ensure Globe is properly loaded
                .globeImageUrl('./assets/images/earth-dark.jpg') // Use locally hosted image
                .hexPolygonsData(countries.features) // Use GeoJSON features for hexagons
                .hexPolygonResolution(3) // Resolution of hexagons
                .hexPolygonMargin(0.3) // Margin between hexagons
                .hexPolygonUseDots(true) // Render hexagons as dots
                .hexPolygonColor(() => '#ffffff') // Set all dots to white
                .hexPolygonLabel(() => null); // Disable labels
        })
        .catch(err => {
            console.error("Failed to load GeoJSON data:", err);
        });
})();
