import RouteFinder from "@/components/route_finder/RouteFinder";
import { RouteFinderFormData } from "@/graphql/types";
import { fetchRouteFinderRoutes } from "@/lib/data/queries";
import { StarIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import Link from "next/link";

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
            <div className="border-b-4 border-blue-900">
                <h1 className="text-lg font-bold pl-2">Routes</h1>
            </div>
            {filteredRoutes && filteredRoutes.length > 0 ? (
                <ul>
                    {filteredRoutes.map((route, index) => (
                        <div key={route.id} className={clsx("grid grid-cols-2 md:grid-cols-3 place-content-between p-2", index % 2 === 0 ? "bg-gray-300" : "bg-gray-200")}>
                            <div className="flex flex-col md:col-span-2 md:flex-row md:justify-between">
                                <Link href={`/route/${route.id}`} className="text-blue-900 hover:text-blue-700">
                                    <h3 className="font-bold">{route.name}</h3>
                                </Link>
                                <p className="text-xs text-left">{route.state.name} &gt; {route.crag.name}</p>
                            </div>
                            <div className="flex flex-col md:col-span-1 md:flex-row-reverse items-end md:items-center">
                                <h4 className="font-semibold md:pl-4">{route.grade}</h4>
                                <div className="flex">
                                    {Array.from({ length: route.star_rating }, (_, index) => (
                                        <StarIcon key={index * 5} className="h-5 w-5 text-yellow-500" />
                                    ))}
                                </div>
                                <div className="hidden md:block"></div>
                            </div>
                        </div>
                    ))}
                </ul>
            ) : (
                <h2 className="text-xl md:text-2xl">No routes found matching your criteria.</h2>
            )}
        </main>
    );
};