import React, { useEffect, useState, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './UBCMap.scss';

const UBCMap = ({ markers, mapWidth = '500px', mapHeight = '500px', mapCenter = [-123.2460, 49.2626], mapZoom = 13 }) => {
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

        if (markers) {
            markers.forEach((marker) => { // loop through all markers and place onto map (with popup if needed)
                const popup = (marker?.label)
                    ? new maplibregl.Popup({
                        className: "ubc-map__popup",
                        closeButton: false,
                    })
                        .setText(marker.label)
                    : null;

                new maplibregl.Marker({ className: "ubc-map__marker" })
                    .setLngLat(marker.coordinates)
                    .setPopup(popup)
                    .addTo(map);
            })
        }

    }, []);


    return (
        <div
            className='ubc-map'
            ref={mapContainer}
            style={{ width: mapWidth, height: mapHeight, borderRadius: "20px" }}
        />
    )

}

export default UBCMap;