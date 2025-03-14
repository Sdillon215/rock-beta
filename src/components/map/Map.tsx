import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const Map = ({ climbingAreas }: { climbingAreas: { id: string; name: string; latitude: number; longitude: number }[] }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/outdoors-v11", // You can change the map style
            center: [-100.486052, 37.830348], // Default center
            zoom: 3,
        });

        // Add Source & Layer for Pins
        mapRef.current.on("load", () => {
            mapRef.current!.addSource("climbing-areas", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: climbingAreas.map(area => ({
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [area.longitude, area.latitude],
                        },
                        properties: {
                            id: area.id,
                            name: area.name,
                        },
                    })),
                },
            });

            mapRef.current!.addLayer({
                id: "climbing-pins",
                type: "circle",
                source: "climbing-areas",
                paint: {
                    "circle-radius": 6,
                    "circle-color": "#FF5733",
                },
            });

            // Click event for popups
            mapRef.current!.on("click", "climbing-pins", (e) => {
                const feature = e.features![0];
                const geometry = feature.geometry as GeoJSON.Point;
                const coordinates = geometry.coordinates as [number, number];
                const name = feature.properties!.name;

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`<h3>${name}</h3>`)
                    .addTo(mapRef.current!);
            });
        });

        return () => mapRef.current?.remove();
    }, [climbingAreas]);

    return <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />;
};

export default Map;