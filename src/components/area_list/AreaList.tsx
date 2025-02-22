import { fetchStatesPreviews } from "@/lib/data/queries";
import Link from "next/link";


export default async function AreaList() {
    const climbingAreas = await fetchStatesPreviews();

    return (
        <div className="grid md:grid-cols-3">
            {climbingAreas.map((area) => (
                <div key={area.id} className="col-span-1 flex flex-col p-2 bg-gray-200">
                    <div className="flex flex-row justify-between border-b-2 border-blue-900">
                        <Link href={`/state/${area.id}`} className="text-blue-900 hover:text-blue-700">
                            <h3 className="font-bold">{area.name}</h3>
                        </Link>
                    </div>
                    <div className="flex flex-col">
                        {area.subareas.map((subarea) => (
                            <div key={subarea.id} className="flex justify-between">
                                <p>{subarea.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}