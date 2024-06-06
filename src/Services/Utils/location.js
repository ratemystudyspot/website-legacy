async function getLocation() {
  try {
    const response = await fetch(`http://ip-api.com/json/`);
    const locationData = await response.json();
    return locationData;
  } catch (error) {
    console.error(error);
  }
}

export {
  getLocation,
};
