import { StarIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { getClient } from "@/lib/apollo_client";
import { GET_CLASSICS } from "@/graphql/queries";
import { ClassicRoute } from "@/graphql/types";


export default async function ClassicClimbsList() {
    const client = getClient();
    const { data } = await client.query({ query: GET_CLASSICS });
    const classicRoutes: ClassicRoute[] = data.areas_classic_climbs;
    const sortedClassicRoutes = [...classicRoutes].sort((a, b) => a.rank - b.rank);

    return (
        <>
            <div className="border-b-4 border-blue-900">
                <h1 className="text-lg font-bold pl-2">Top 20 Classic Climbs</h1>
            </div>
            {sortedClassicRoutes.map((route, index) => (
                <div key={route.rank} className={clsx("grid grid-cols-2 md:grid-cols-3 place-content-between p-2", index % 2 === 0 ? "bg-gray-300" : "bg-gray-200")}>
                    <div className="flex flex-col md:col-span-2 md:flex-row md:justify-between">
                        <h4 className="font-semibold">{route.rank.toString()}. {route.routeName}</h4>
                        <p className="text-xs text-left">{route.area} &gt; {route.subArea}</p>
                    </div>
                    <div className="flex flex-col md:col-span-1 md:flex-row-reverse items-end md:items-center">
                        <h4 className="font-semibold md:pl-4">{route.grade}</h4>
                        <div className="flex">
                            {Array.from({ length: route.starRating }, (_, index) => (
                                <StarIcon key={index * 5} className="h-5 w-5 text-yellow-500" />
                            ))}
                        </div>
                        <div className="hidden md:block"></div>
                    </div>
                </div>
            ))}
        </>
    );
}