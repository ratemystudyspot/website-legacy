import React, { useEffect, useRef, useImperativeHandle } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './UBCMap.scss';

// TODO: map doesn't re-render all of its tiles while user scrolling down (reference: LocationForm.jsx)
const UBCMap = React.forwardRef(({ markers, mapWidth = '500px', mapHeight = '500px', mapCenter = [-123.2460, 49.2626], mapZoom = 13, enableNavigationControl = false, disableScrollZoom = false, enableCenterMarker = false }, ref) => {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const centerMarkerRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getCenter() {
            return mapRef.current.getCenter();
        },
        setCenter(coordinates) {
            return mapRef.current.setCenter(coordinates);
        }
    }))

    useEffect(() => {
        // map init
        mapRef.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json', // DARK THEME: https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json 
            center: mapCenter,
            zoom: mapZoom,
        });

        // map's navigation controls and markers
        // navigation control
        if (enableNavigationControl) mapRef.current.addControl(new maplibregl.NavigationControl());
        // disable scroll zoom
        if (disableScrollZoom) mapRef.current.scrollZoom.disable();
        // enable marker always at the center
        if (enableCenterMarker) {
            centerMarkerRef.current = new maplibregl.Marker({ className: "ubc-map__center-marker" })
                .setLngLat(mapRef.current.getCenter())
                .addTo(mapRef.current);

            mapRef.current.on('move', () => {
                centerMarkerRef.current.setLngLat(mapRef.current.getCenter());
            });
        }
        // place marker(s) onto the map (with a popup if necessary)
        if (markers) {
            markers.forEach(marker => {
                const popup = marker.label ? new maplibregl.Popup({ className: "ubc-map__popup", closeButton: false }).setText(marker.label) : null;

                new maplibregl.Marker({ className: "ubc-map__marker" })
                    .setLngLat(marker.coordinates)
                    .setPopup(popup)
                    .addTo(mapRef.current);
            });
        }
    }, []);

    return (
        <div
            className='ubc-map'
            ref={mapContainer}
            style={{ width: mapWidth, height: mapHeight, borderRadius: "20px", position: 'relative' }}
        />
    );
});

export default UBCMap;
