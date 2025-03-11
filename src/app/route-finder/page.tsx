import RouteFinder from "@/components/route_finder/RouteFinder";
import { RouteFinderFormData } from "@/graphql/types";
import { fetchRouteFinderRoutes } from "@/lib/data/queries";

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    const urlParams = await searchParams;
    const grade = urlParams.grade;
    const pitches = urlParams.pitches;
    const rating = urlParams.star_rating;
    const discipline = [];
    if (urlParams.trad === "true") discipline.push("Trad");
    if (urlParams.sport === "true") discipline.push("Sport");
    if (urlParams.toprope === "true") discipline.push("Toprope");
    if (discipline.length === 0) discipline.push("Trad", "Sport", "Toprope");

    const variables: RouteFinderFormData = {
        grade: grade!,
        pitches: parseInt(pitches!),
        star_rating: parseInt(rating!),
        discipline: discipline,
    };

    const filteredRoutes = await fetchRouteFinderRoutes(variables);

    return (
        <main className="grid grid-cols-1 gap-4 max-w-screen-md mx-auto py-4">
            <h1 className="text-2xl md:text-4xl font-bold">Route Finder</h1>
            <div className="grid justify-items-start">
                <RouteFinder />
            </div>
            {filteredRoutes && filteredRoutes.length > 0 ? (
                <ul>
                    {filteredRoutes.map((route) => (
                        <li key={route.id}>{route.name} - {route.grade} ({route.discipline})</li>
                    ))}
                </ul>
            ) : (
                <h2 className="text-xl md:text-2xl">No routes found matching your criteria.</h2>
            )}
        </main>
    );
};