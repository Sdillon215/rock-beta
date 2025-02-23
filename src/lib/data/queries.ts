import { getClient } from "@/lib/apollo_client";
import {
    GET_STATES_PREVIEW,
    GET_STATE_DETAILS,
    GET_SUBAREA_DETAILS
} from "@/graphql/queries";
import {
    StatePreview,
    StateBase,
    SubareaBase,
    StateDetails,
    SubareaDetails
} from "@/graphql/types";

export async function fetchStatesPreviews(): Promise<StatePreview[]> {
    const client = getClient();
    const { data } = await client.query({ query: GET_STATES_PREVIEW });
    const subareasData = data.subarea || [];

    return data.states.map((state: StateBase) => ({
        ...state,
        subareas: subareasData.filter((subarea: SubareaBase) => subarea.state_id === state.id),
    }));
};

export async function fetchStateDetails(stateId: string): Promise<StateDetails | null> {
    const client = getClient();
    const { data } = await client.query({
        query: GET_STATE_DETAILS,
        variables: { stateId },
    });

    if (!data.states_by_pk) return null; // Return null if state doesn't exist

    return {
        ...data.states_by_pk,
        subareas: data.subarea || [], // Ensure subareas is always an array
    };
};

export async function fetchSubareaDetails(subareaId: string): Promise<SubareaDetails | null> {
    const client = getClient();
    const { data } = await client.query({
        query: GET_SUBAREA_DETAILS,
        variables: { subareaId },
    });

    if (!data.subarea_by_pk) return null; // Return null if subarea doesn't exist

    return {
        ...data.subarea_by_pk,
        crags: data.crags || [], // Ensure crags is always an array
    };
}