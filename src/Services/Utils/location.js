import axios from 'axios';

const IP_API_KEY = process.env.REACT_APP_IP_API_KEY;

async function getLocation() {
  try {
    const response = await fetch(`https://api.ipapi.is/?key=${IP_API_KEY}`);
    const locationData = await response.json();
    return locationData;
  } catch (error) {
    console.error(error);
  }
}

async function getLocationsFromAddress(location, limit) {
  try {
    const response = axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=geojson&addressdetails=1&countrycodes=ca&limit=${limit}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export {
  getLocation,
  getLocationsFromAddress,
};
