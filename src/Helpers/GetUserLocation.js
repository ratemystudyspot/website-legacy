import { getLocation } from '../Services/Utils/location';

async function getCurrentUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => { // success case
        const { longitude, latitude } = position.coords;
        resolve({
          locationAlert: false, // error case was not activated
          coords: [longitude, latitude],
        });
      },
      async () => { // error case
        try {
          const { location: { longitude, latitude } } = await getLocation();
          resolve({
            locationAlert: true, // error case has been activated
            coords: [longitude, latitude],
          });
        } catch (error) {
          reject(error);
        }
      });
  })
}

export default getCurrentUserLocation;