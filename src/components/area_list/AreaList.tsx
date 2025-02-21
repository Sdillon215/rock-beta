import { fetchStatesWithSubareas } from "@/lib/data/queries";


export default async function AreaList() {
    const climbingAreas = await fetchStatesWithSubareas();

    return (
        <div className="grid md:grid-cols-3">
            {climbingAreas.map((area) => (
                <div key={area.id} className="col-span-1 flex flex-col p-2 bg-gray-200">
                    <div className="flex flex-row justify-between border-b-2 border-blue-900">
                        <h3 className="font-bold">{area.name}</h3>
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