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
        .globeImageUrl('img/cloudyearth.jpeg')
        .backgroundImageUrl('img/night.jpg')
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
        .height(window.innerHeight * 0.93)
        .width(window.innerWidth * 0.70)

        // Globe landmarks for clicking
        .onLabelClick((label) => {
          const landmarkName = label.properties.name;
          if (['Petra', 'Colosseum', 'Taj Mahal', 'Christ the Redeemer', 'Machu Pichu', 'Great Wall of China', 'Chichen Itza'].includes(landmarkName)) {
              handleLandmarkClick(landmarkName)(label);
          }
      })      
    })
    // Error catch
    .catch(error => console.error('Error fetching data:', error))
});

