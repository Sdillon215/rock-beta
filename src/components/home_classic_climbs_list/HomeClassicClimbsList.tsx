import { fetchTopClassics } from "@/lib/data/queries";
import ClassicClimbListItem from "@/components/classic_climb_list_item/ClassicClimbListItem";


export default async function HomeClassicClimbsList() {
    const topClassicRoutes = await fetchTopClassics();

    return (
        <>
            <div className="border-b-4 border-blue-900">
                <h1 className="text-lg font-bold pl-2">Top Classic Climbs</h1>
            </div>
            {topClassicRoutes.map((route, index) => (
                <ClassicClimbListItem key={route.id} route={route} index={index} />
            ))}
        </>
    );
};