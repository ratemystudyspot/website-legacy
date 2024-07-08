import React, { useState, useRef } from 'react';
import "./RecommendSpotsForms.scss";
import UBCMap from "../../UBCMap/UBCMap";
import Input from '../../Input/Input';
import { getLocationsFromAddress } from '../../../Services/Utils/location';
import SubmitButtons from './SubmitButtons';

const stateAbbreviations = {
  "Alberta": "AB",
  "British Columbia": "BC",
  "Manitoba": "MB",
  "New Brunswick": "NB",
  "Newfoundland and Labrador": "NL",
  "Northwest Territories": "NT",
  "Nova Scotia": "NS",
  "Nunavut": "NU",
  "Ontario": "ON",
  "Prince Edward Island": "PE",
  "Quebec": "QC",
  "Saskatchewan": "SK",
  "Yukon": "YT",
};

const cityRenaming = {
  "Electoral Area A": "Vancouver"
}

// TODO: save user input
function LocationForm({ setPrevPage, setCurrPage, setNextPage, formInformation, setFormInformation, saved, setSaved }) {
  const [locationAddress, setLocationAddress] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const mapRef = useRef(null);
  const [map, setMap] = useState(<UBCMap
    mapZoom={13.5}
    mapHeight="100%"
    mapWidth="100%"
    disableScrollZoom={true}
    enableCenterMarker={true}
    enableNavigationControl={true}
    ref={mapRef}
  />);

  const handleSubmitQuery = async (e) => {
    e.preventDefault();
    try {
      const locations = await getLocationsFromAddress(locationAddress, 2);
      setLocationSuggestions(locations.data.features);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeQuery = async (e) => {
    e.preventDefault();
    setLocationAddress(e.target.value);
  }

  const recenterMarker = (coordinates) => {
    setMap(<UBCMap
      mapZoom={13.5}
      mapCenter={coordinates}
      mapHeight="100%"
      mapWidth="100%"
      disableScrollZoom={true}
      enableCenterMarker={true}
      enableNavigationControl={true}
      ref={mapRef}
    />)
  }

  const goBack = () => { return setCurrPage(false), setPrevPage(true) };
  const goNext = () => { return setCurrPage(false), setNextPage(true) };

  return (
    <div className="recommendspots-form">
      <button onClick={() => console.log(mapRef.current.getCenter())}>
        test button
      </button>
      <div className="recommendspots-form__header">
        <h3 className="recommendspots-form__title">Where is the study spot located?</h3>
        <p className="recommendspots-form__subtitle">
          Please be as accurate as possible, this address will be shared with your fellow students. If no results shows up, no results were found.
        </p>
      </div>
      <form className="recommendspots-form__map-form" onSubmit={handleSubmitQuery}>
        <div className="recommendspots-form__input">
          <Input
            placeholder="Enter address..."
            type="text"
            changeAction={handleChangeQuery}
          />
        </div>
        <ul className="recommendspots-form__suggestions-list">
          {locationSuggestions
            && locationSuggestions.map(suggestion =>
              <li className="recommendspots-form__suggestions-item" onClick={() => recenterMarker(suggestion.geometry.coordinates)}>
                {suggestion.properties.address?.house_number || suggestion.properties.name}
                {suggestion.properties.address?.house_number
                  ? " "
                  : suggestion.properties.name
                    ? ", "
                    : null}

                {suggestion.properties.address?.road}
                {suggestion.properties.address?.road ? ", " : null}

                {cityRenaming[suggestion.properties.address?.city] || suggestion.properties.address?.city}
                {cityRenaming[suggestion.properties.address?.city] || suggestion.properties.address?.city ? ", " : null}

                {stateAbbreviations[suggestion.properties.address?.state]}
                {stateAbbreviations[suggestion.properties.address?.state] ? ", " : null}

                {suggestion.properties.address?.country}
              </li>
            )
          }
        </ul>
      </form>
      <div className="recommendspots-form__ubc-map">
        {map}
      </div>
      <SubmitButtons
        goBack={goBack}
        goNext={goNext}
      />
    </div>
  )
}

export default LocationForm;