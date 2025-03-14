import { CustomGeoJsonFeature, MapboxArea } from "@/graphql/types";

export const parseGeoJsonData = (areas: MapboxArea[]): GeoJSON.FeatureCollection<GeoJSON.Geometry> => {
    return {
        type: "FeatureCollection",
        features: areas
            .map(area => {
                const [lat, lon] = area.gps
                    .trim()
                    .split(",")
                    .map(coord => parseFloat(coord.trim()));

                if (isNaN(lat) || isNaN(lon)) {
                    console.error("Invalid GPS coordinates for:", area);
                    return null; // Skip invalid entries
                }

                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [lon, lat], // GeoJSON expects [longitude, latitude]
                    },
                    properties: {
                        id: area.id,
                        name: area.name,
                    },
                } as CustomGeoJsonFeature;
            })
            .filter((feature): feature is CustomGeoJsonFeature => feature !== null), // Remove null values
    };
};