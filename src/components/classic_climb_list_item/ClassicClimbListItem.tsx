import { ClassicRoute } from "@/components/home_classic_climbs_list/HomeClassicClimbsList";
import { StarIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

type ClassicClimbListItemProps = {
    route: ClassicRoute;
    index: number;
};

export default function ClassicClimbListItem({ route, index }: ClassicClimbListItemProps) {

    return (
        <div key={route.rank} className={clsx("grid grid-cols-2 md:grid-cols-3 place-content-between p-2", index % 2 === 0 ? "bg-gray-200" : "bg-gray-300")}>
        <div className="flex flex-col md:col-span-2 md:flex-row md:justify-between">
            <h4 className="font-semibold">{(index + 1).toString()}. {route.routeName}</h4>
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
    );
}