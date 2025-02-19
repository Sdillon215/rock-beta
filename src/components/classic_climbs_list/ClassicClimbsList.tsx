import { StarIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

type ClassicRoute = {
    rank: number;
    routeName: string;
    area: string;
    subArea: string;
    starRating: number;
    grade: string;
};

const topClassicRoutes: ClassicRoute[] = [
    { rank: 1, routeName: "Epinephrine", area: "Nevada", subArea: "Red Rocks", grade: "5.9", starRating: 4 },
    { rank: 2, routeName: "Scarface", area: "Utah", subArea: "Indian Creek", grade: "5.11a/b", starRating: 4 },
    { rank: 3, routeName: "Corrugation Corner", area: "California", subArea: "Lover's Leap", grade: "5.7", starRating: 4 },
    { rank: 4, routeName: "Illusion Dweller", area: "California", subArea: "Joshua Tree NP", grade: "5.10b", starRating: 4 },
    { rank: 5, routeName: "Incredible Hand Crack", area: "Utah", subArea: "Indian Creek", grade: "5.10", starRating: 4 },
    { rank: 6, routeName: "Central Pillar of Frenzy", area: "California", subArea: "Yosemite NP", grade: "5.9", starRating: 4 },
    { rank: 7, routeName: "Southeast Buttress", area: "California", subArea: "Yosemite NP", grade: "5.6", starRating: 4 },
    { rank: 8, routeName: "Triassic Sands", area: "Nevada", subArea: "Red Rocks", grade: "5.10", starRating: 4 },
    { rank: 9, routeName: "High Exposure", area: "New York", subArea: "Gunks", grade: "5.6", starRating: 4 },
    { rank: 10, routeName: "Supercrack of the Desert", area: "Utah", subArea: "Indian Creek", grade: "5.10", starRating: 4 },
    { rank: 11, routeName: "The Yellow Spur", area: "Colorado", subArea: "Eldorado Canyon SP", grade: "5.9+", starRating: 3 },
    { rank: 12, routeName: "Levitation 29", area: "Nevada", subArea: "Red Rocks", grade: "5.11b/c", starRating: 3 },
    { rank: 13, routeName: "Fine Jade", area: "Utah", subArea: "Castle Valley", grade: "5.11a", starRating: 3 },
    { rank: 14, routeName: "Rewritten", area: "Colorado", subArea: "Eldorado Canyon SP", grade: "5.7", starRating: 3 },
    { rank: 15, routeName: "Outer Space", area: "Washington", subArea: "Central-E Cascades", grade: "5.9", starRating: 3 },
    { rank: 16, routeName: "Regular Route", area: "California", subArea: "Yosemite NP", grade: "5.9", starRating: 3 },
    { rank: 17, routeName: "Exum Ridge", area: "Wyoming", subArea: "Grand Teton NP", grade: "5.5", starRating: 3 },
    { rank: 18, routeName: "Dark Shadows", area: "Nevada", subArea: "Red Rocks", grade: "5.8", starRating: 3 },
    { rank: 19, routeName: "Outer Space", area: "Colorado", subArea: "Eldorado Canyon SP", grade: "5.10b/c R", starRating: 3 },
    { rank: 20, routeName: "Snake Dike", area: "California", subArea: "Yosemite NP", grade: "5.7 R", starRating: 3 }
];

export default function ClassicClimbsList() {
    return (
        <>
            <div className="border-b-4 border-blue-900">
                <h1 className="text-lg font-bold pl-2">Top 20 Classic Climbs</h1>
            </div>
            {topClassicRoutes.map((route, index) => (
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