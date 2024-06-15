async function getLocation() {
  try {
    const response = await fetch(`https://api.ipgeolocation.io/getip`);
    const locationData = await response.json();
    return locationData;
  } catch (error) {
    console.error(error);
  }
}

export {
  getLocation,
};
