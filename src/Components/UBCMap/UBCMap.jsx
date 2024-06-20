import React, { useEffect, useState, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const UBCMap = ({ markerCoordinates = [-123.2460, 49.2606], mapWidth = '600px', mapHeight = '400px', mapCenter = [-123.2460, 49.2626], mapZoom = 13 }) => {
    const mapContainer = useRef(null);
    const [viewState, setViewState] = useState({
        center: mapCenter,
        zoom: mapZoom
    })

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json', // DARK THEME: https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json 
            ...viewState,
        })
        map.addControl(new maplibregl.NavigationControl())

        if (markerCoordinates) new maplibregl.Marker().setLngLat(markerCoordinates).addTo(map)
    }, []);


    return (
        <div
            ref={mapContainer}
            style={{ width: mapWidth, height: mapHeight, position: 'absolute' }}
        />
    )

}

export default UBCMap;