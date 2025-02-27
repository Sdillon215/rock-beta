import { getClient } from "@/lib/apollo_client";
import {
    GET_STATES_PREVIEW,
    GET_STATE_DETAILS,
    GET_SUBAREA_DETAILS,
    GET_CRAG_DETAILS
} from "@/graphql/queries";
import {
    StatePreview,
    StateDetails,
    SubareaDetails,
    CragDetails
} from "@/graphql/types";

export async function fetchStatesPreviews(): Promise<StatePreview[]> {
    const client = await getClient();
    const { data } = await client.query({ query: GET_STATES_PREVIEW });

    return data.states;
};

export async function fetchStateDetails(stateId: string): Promise<StateDetails | null> {
    const client = await getClient();
    const { data } = await client.query({
        query: GET_STATE_DETAILS,
        variables: { stateId },
    });

    if (!data.states_by_pk) return null; // Return null if state doesn't exist

    return data.states_by_pk;
};

export async function fetchSubareaDetails(subareaId: string): Promise<SubareaDetails | null> {
    const client = await getClient();
    const { data } = await client.query({
        query: GET_SUBAREA_DETAILS,
        variables: { subareaId },
    });

    if (!data.subarea_by_pk) return null; // Return null if subarea doesn't exist

    return data.subarea_by_pk;
};

export async function fetchCragDetails(cragId: string): Promise<CragDetails | null> {
    const client = await getClient();
    const { data } = await client.query({
        query: GET_CRAG_DETAILS,
        variables: { cragId: cragId },
    });

    if (!data.crags_by_pk) return null; // Return null if subarea doesn't exist

    return data.crags_by_pk;
};