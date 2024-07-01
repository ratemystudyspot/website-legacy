// function adapted from https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2, readable = false) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km

  let distance = d;
  if (readable) { // return readable version
    let unit = "km"

    if (distance >= 10) { // if distance is more or equal than 10 km away, remove float
      distance = Math.round(distance);
    }
    if (distance < 1) { // if ditance is lesser than 1 km away, use meters
      distance *= 1000.0;
      distance = distance.toFixed(1);
      unit = "m"
    }
    return `${distance} ${unit}`;
  } else { // return raw version
    return distance; 
  }

}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

export default getDistanceFromLatLonInKm;