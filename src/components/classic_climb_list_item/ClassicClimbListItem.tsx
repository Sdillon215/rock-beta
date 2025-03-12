import { StarIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { RouteListItem } from "@/graphql/types";
import Link from "next/link";

type ClassicClimbListItemProps = {
    route: RouteListItem;
    index: number;
};

export default function ClassicClimbListItem({ route, index }: ClassicClimbListItemProps) {

    return (
        <div className={clsx("grid grid-cols-2 md:grid-cols-3 place-content-between p-2", index % 2 === 0 ? "bg-gray-200" : "bg-gray-300")}>
            <div className="flex flex-col md:col-span-2 md:flex-row md:justify-between">
                <Link href={`/route/${route.id}`} className="text-blue-900 hover:text-blue-700">
                    <h3 className="font-bold">{(index + 1).toString()}. {route.name}</h3>
                </Link>
                <p className="text-xs text-left">{route.state.name} &gt; {route.subarea.name}</p>
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
    );
};