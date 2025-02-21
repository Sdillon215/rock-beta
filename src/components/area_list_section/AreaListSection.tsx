import { Suspense } from "react";
import { getClient } from "@/lib/apollo_client";
import { GET_STATES_PREVIEW } from "@/graphql/queries";
import { StatePreview, StateBase, SubareaBase } from "@/graphql/types";


export default async function AreaListSection() {
    const client = getClient();
    const { data } = await client.query({ query: GET_STATES_PREVIEW });
    const subareas = data.subarea || [];

    const climbingAreas: StatePreview[] = data.states.map((state: StateBase) => ({
        ...state,
        subareas: subareas.filter((subarea: SubareaBase) => subarea.state_id === state.id),
    }));

    return (
        <section className="max-w-screen-xl md:mx-auto w-full mb-4">
            <div className="border-b-4 border-blue-900">
                <h1 className="text-lg font-bold pl-2">Climbing Areas</h1>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
        </section>
    );
}