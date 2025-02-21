import { getClient } from "@/lib/apollo_client";
import { GET_STATES_PREVIEW } from "@/graphql/queries";
import { 
    StatePreview,
    StateBase,
    SubareaBase
 } from "@/graphql/types";

export async function fetchStatesWithSubareas(): Promise<StatePreview[]> {
    const client = getClient();
    const { data } = await client.query({ query: GET_STATES_PREVIEW });
    const subareasData = data.subarea || [];

    return data.states.map((state: StateBase) => ({
        ...state,
        subareas: subareasData.filter((subarea: SubareaBase) => subarea.state_id === state.id),
    }));
};
