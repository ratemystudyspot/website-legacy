import { useState } from 'react';
import Map from 'react-map-gl';

const mapApiKey = process.env.REACT_APP_MAPBOX_API_KEY;

const UBCMap = () => {

    const [viewState, setViewState] = useState({
        longitude: -123.2460,
        latitude: 49.2606,
        zoom: 12})

    return <Map
        mapboxAccessToken={mapApiKey}
        {... viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: 600, height: 400, marginBottom:50}}
        mapStyle="mapbox://styles/tangman/clvrlyodq01i001q128b9dagu"
        />

}

export default UBCMap;