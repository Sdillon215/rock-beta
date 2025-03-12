import ClassicClimbListItem from "@/components/classic_climb_list_item/ClassicClimbListItem";
import { RouteListItem } from "@/graphql/types";

type AreaClassicClimbListProps = {
    areaName: string;
    classicRoutes: RouteListItem[];
};

export default function AreaClassicClimbsList({ classicRoutes, areaName }: AreaClassicClimbListProps) {
    const topClassicRoutes = classicRoutes;

    return (
        <>
            <div className="border-b-4 border-blue-900">
                <h1 className="text-lg font-bold pl-2">Classic Climbs in {areaName}</h1>
            </div>
            {topClassicRoutes.map((route, index) => (
                <ClassicClimbListItem key={route.id} route={route} index={index} />
            ))}
        </>
    );
};