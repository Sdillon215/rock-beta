import { fetchStatesPreviews } from "@/lib/data/queries";
import Link from "next/link";


export default async function AreaList() {
    const climbingAreas = await fetchStatesPreviews();

    return (
        <div className="grid md:grid-cols-3">
            {climbingAreas.map((area) => (
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