"use client";

import { useSearchParams } from "next/navigation";

export default function RouteFinderResults() {
    const searchParams = useSearchParams();

    console.log(searchParams.toString());
    // Get query params
    const grade = searchParams.get("grade") || "5.10";
    const pitches = searchParams.get("pitches") || "1";
    const rating = searchParams.get("rating") || "3";
    const trad = searchParams.get("trad") === "true";
    const sport = searchParams.get("sport") === "true";
    const toprope = searchParams.get("toprope") === "true";

    // Simulated API call (replace with actual API request)
    const filteredRoutes = [
        { id: 1, name: "Super Crack", grade: "5.10", pitches: "1", rating: "3", type: "Trad" },
        { id: 2, name: "Sporty Route", grade: "5.11", pitches: "2", rating: "4", type: "Sport" },
    ].filter(route => 
        route.grade === grade &&
        route.pitches === pitches &&
        route.rating === rating &&
        ((trad && route.type === "Trad") || (sport && route.type === "Sport") || (toprope && route.type === "Toprope"))
    );

    return (
        <div>
            <h1>Search Results</h1>
            {filteredRoutes.length > 0 ? (
                <ul>
                    {filteredRoutes.map((route) => (
                        <li key={route.id}>{route.name} - {route.grade} ({route.type})</li>
                    ))}
                </ul>
            ) : (
                <p>No routes found matching your criteria.</p>
            )}
        </div>
    );
}