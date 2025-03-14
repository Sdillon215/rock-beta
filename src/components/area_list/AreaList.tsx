import { fetchStatesPreviews } from "@/lib/data/queries";
import Link from "next/link";

export default async function AreaList() {
    // Fetch the climbing areas and create a shallow copy to prevent direct mutation
    const unSortedClimbingAreas = await fetchStatesPreviews();

    // Create a new sorted array by making a copy of the original array and sorting it
    const climbingAreas = [...unSortedClimbingAreas].sort((a, b) => a.name.localeCompare(b.name));

    // Sort the subareas for each area (without directly modifying the original object)
    const sortedClimbingAreas = climbingAreas.map((area) => {
        return {
            ...area, // Spread the existing area properties
            subareas: [...area.subareas].sort((a, b) => a.name.localeCompare(b.name)), // Create a new subareas array
        };
    });

    return (
        <div className="grid md:grid-cols-3">
            {sortedClimbingAreas.map((area) => (
                <div key={area.id} className="col-span-1 flex flex-col p-2 bg-gray-200">
                    <div className="flex flex-row items-end justify-between border-b-2 border-blue-900">
                        <Link href={`/state/${area.id}`} className="text-blue-900 hover:text-blue-700">
                            <h3 className="font-bold">{area.name}</h3>
                        </Link>
                        <p className="text-xs">{area.routes_aggregate.aggregate.count.toString()} routes</p>
                    </div>
                    <div className="flex flex-col">
                        {area.subareas.map((subarea) => (
                            <div key={subarea.id} className="flex flex-row items-end justify-between">
                                <Link href={`/subarea/${subarea.id}`} className="text-blue-900 hover:text-blue-700">
                                    <h4>{subarea.name}</h4>
                                </Link>
                                <p className="text-xs">{subarea.routes_aggregate.aggregate.count.toString()} routes</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}