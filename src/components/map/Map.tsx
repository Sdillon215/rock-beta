"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapboxArea } from "@/graphql/types";
import { parseGeoJsonData } from "@/lib/utils";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const Map = ({ unParsedGeoJsonData }: { unParsedGeoJsonData: MapboxArea[] }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [geoJsonData, setGeoJsonData] = useState<GeoJSON.FeatureCollection | null>(null);

    useEffect(() => {
        setGeoJsonData(parseGeoJsonData(unParsedGeoJsonData));
    }, [unParsedGeoJsonData]);

    useEffect(() => {
        if (!mapContainerRef.current || !geoJsonData) return;

        const firstArea = unParsedGeoJsonData[0];
        const [lat, lng] = firstArea.gps.split(",").map(coord => parseFloat(coord.trim()));


        if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            console.error("Invalid GPS coordinates:", firstArea.gps);
            return;
        }

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/standard-satellite",
            center: [lng, lat],
            zoom: 5,
        });

        mapRef.current.on("load", () => {
            mapRef.current!.addSource("climbing-areas", {
                type: "geojson",
                data: geoJsonData,
            });

            mapRef.current!.addLayer({
                id: "climbing-pins",
                type: "circle",
                source: "climbing-areas",
                paint: {
                    "circle-radius": 6,
                    "circle-color": "#2589BD",
                },
            });

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
    }, [geoJsonData, unParsedGeoJsonData]);

    return <div ref={mapContainerRef} className="absolute top-0 bottom-0 left-0 right-0 w-full h-full" />;
};

export default Map;