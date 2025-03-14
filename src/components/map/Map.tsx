"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapboxArea } from "@/graphql/types";
import { parseGeoJsonData } from "@/lib/utils";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

// Sample Data
const unParsedGeoJsonData: MapboxArea[] = [
    { id: "1", name: "Area 1", gps: "37.7749,-122.4194" },
    { id: "2", name: "Area 2", gps: "34.0522,-118.2437" },
    { id: "3", name: "Area 3", gps: "40.7128,-74.0060" },
];

const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [geoJsonData, setGeoJsonData] = useState<GeoJSON.FeatureCollection | null>(null);

    useEffect(() => {
        setGeoJsonData(parseGeoJsonData(unParsedGeoJsonData));
    }, []);

    useEffect(() => {
        if (!mapContainerRef.current || !geoJsonData) return;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/standard-satellite",
            center: [-100.486052, 37.830348], // Default center
            zoom: 3,
        });

        mapRef.current.on("load", () => {
            mapRef.current!.addSource("climbing-areas", {
                type: "geojson",
                data: geoJsonData, // Use parsed GeoJSON data
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
    }, [geoJsonData]);

    return <div ref={mapContainerRef} className="absolute top-0 bottom-0 left-0 right-0 w-full h-full" />;
};

export default Map;