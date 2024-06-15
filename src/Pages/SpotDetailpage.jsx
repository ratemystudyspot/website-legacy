import { React, useState, useEffect } from 'react'
import getDistanceFromLatLonInKm from '../Helpers/GetDistanceLatLon';
import { useLocation } from 'react-router-dom';
import { getLocation } from '../Services/Utils/location';
import { BiVolumeMute } from "react-icons/bi";
import { TbSofa, TbBatteryCharging2, TbLockOpen, TbMicrowave  } from "react-icons/tb";
import { MdOutlineFastfood, MdOutlineDoorFront,   } from "react-icons/md";
import { GoRepoLocked } from "react-icons/go";
import './SpotDetailpage.css'

const images = require.context('../Components/Assets', true);

function getImage(imageLink) {
  const image = (typeof (imageLink) != 'undefined') ? images(`./${imageLink}`) : images(`./404.png`)
  return image;
}

const SpotDetailpage = () => {
  let location = useLocation();
  let studySpot = location.state;

  const filterOptions = [
    { label: 'Quiet', value: 'quiet', icon: <BiVolumeMute size={20} className="filter-icon"/> },
    // { label: 'Comfy', value: 'comfy', icon: <TbSofa size={20} className="filter-icon"/> },
    // { label: 'Not busy', value: 'not-busy', icon: <MdOutlineGroupOff size={20} className="filter-icon"/> },
    { label: 'Outlets', value: 'outlets', icon: <TbBatteryCharging2 size={20} className="filter-icon"/> },
    { label: 'Study Rooms', value: 'study-rooms', icon: <GoRepoLocked  size={20} className="filter-icon"/> },
    { label: 'Microwaves', value: 'microwaves', icon: <TbMicrowave  size={20} className="filter-icon"/> },
    { label: 'Food Near', value: 'food-near', icon: <MdOutlineFastfood  size={20} className="filter-icon"/> },
    { label: 'Open Now', value: 'open-now', icon: <MdOutlineDoorFront size={20} className="filter-icon"/> },
    
    // Add more filter options as needed
  ];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => { // success case
        let user_lon = position.coords.longitude;
        let user_lat = position.coords.latitude;
        setCurrentLocation([user_lon, user_lat]);
      },
      async () => { // error case
        const { location: {longitude, latitude} } = await getLocation();
        setCurrentLocation([longitude, latitude]);
      });
  }

  const [currentLocation, setCurrentLocation] = useState(async () => await getCurrentLocation());

  const getDistance = () => {
    console.log(studySpot)
    let user_lon = currentLocation[0];
    let user_lat = currentLocation[1];
    let spot_lon = studySpot.location.coordinates[0];
    let spot_lat = studySpot.location.coordinates[1];

    let distance = getDistanceFromLatLonInKm(user_lat, user_lon, spot_lat, spot_lon);
    if (distance >= 10) distance = Math.round(distance);
    return distance;
  }

  // useEffect(() => {
  //   getCurrentLocation();
  // }, [])

  return (
    <div className="listing-detail">
      <header className="listing-header">
        <h1>{studySpot.name}</h1>
        <p>{getDistance()} km</p>
      </header>

      <section className="gallery">
        {studySpot.image_links.map((image_link) => {
          return <img src={getImage(image_link)} alt="Gallery Image" />
        })}
      </section>

      <section className="details">
        <h2>About this space</h2>
        <p>
          {studySpot.description}
        </p>
      </section>

      <section className="amenities">
        <h2>Amenities</h2>
        <ul>
          {filterOptions.map((filter) => {
            if (studySpot.features.includes(filter.value)) return(<span>{filter.icon} {filter.label}</span>)
          })}
        </ul>
      </section>
    </div>
  )
}

export default SpotDetailpage;