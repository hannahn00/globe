// Making sure DOM is loaded first
document.addEventListener("DOMContentLoaded", function () {
  let globe;
  let dataLoaded = false;
  let places;

  // Function to get coordinates of each place
  function coordinates(placename) {
    const feature = places.features.find(feature => feature.properties.name === placename);

    if (feature) {
      return {
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
      };
    } else {
      console.error(`${placename} not found`);
      return null;
    }
  }

  // Function to handle landmark click, move globe POV to where landmark is
  function handleLandmarkClick(landmarkName) {
    return function (label) {
      if (dataLoaded && label.properties.name === landmarkName) {
        globe.pointOfView({
          lat: coordinates(landmarkName).lat,
          lng: coordinates(landmarkName).lng,
          altitude: 2
        }, [1000]);  
      }
    };
  }

  // List of details (lines 36-38, 43-54) from Globe.GL example: https://github.com/vasturiano/globe.gl/blob/master/example/world-cities/index.html
  // JSON from https://gist.github.com/magamig/a8c0833418fbafd2faa6cfcf9078322c
  fetch('new7wonders.json')
    .then(res => res.json())
    .then(data => {
      places = data;
      dataLoaded = true;
    
      // Fetching globe and labels appearance details
      globe = Globe()
        .globeImageUrl('templates/img/cloudyearth.jpeg')
        .backgroundImageUrl('templates/img/night.jpg')
        .labelsData(places.features)
        .labelLat(d => d.geometry.coordinates[1])
        .labelLng(d => d.geometry.coordinates[0])
        .labelText(d => d.properties.name)
        .labelSize(() => 5)
        .labelDotRadius(() => 5)
        .labelColor(() => 'rgba(100, 240, 21, 0.75)')
        .labelResolution(2)
        .pointOfView({ lat: 0, lng: 0, altitude: 3 })

        // Globe window
        (document.getElementById('globeViz'))
        .height(window.innerHeight * 0.90)
        .width(window.innerWidth * 0.70)
        
        document.querySelectorAll('iframe').forEach(iframe => iframe.style.display = 'none');

        // Globe landmarks for clicking
        globe.onLabelClick((label) => {
          const landmarkName = label.properties.name;
          
          // Set background image dynamically based on landmarkName
          globe.backgroundImageUrl(`templates/img/${landmarkName}.jpg`);
          
          // Moving POV to landmark
          handleLandmarkClick(landmarkName)(label);
          
          const iframe = document.getElementById(`${landmarkName}_iframe`);
          if (iframe) {
            iframe.style.display = 'block';
          }
        
          // Scroll to corresponding HTML id
          const targetElement = document.getElementById(landmarkName);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
          
        
        });
      })

      // Error catch
      .catch(error => console.error('Error fetching data:', error));
});

