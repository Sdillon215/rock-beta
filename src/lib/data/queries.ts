import { getClient } from "@/lib/apollo_client";
import {
    GET_STATES_PREVIEW,
    GET_STATE_DETAILS,
    GET_SUBAREA_DETAILS,
    GET_CRAG_DETAILS,
    GET_ROUTE_DETAILS,
    GET_SUBAREA_PARENT_ID,
    GET_CRAG_PARENT_IDS,
    GET_SEARCH_ROUTES,
    GET_TOP_CLASSICS
} from "@/graphql/queries";
import {
    StatePreview,
    StateDetails,
    SubareaDetails,
    CragDetails,
    RouteDetails,
    StateId,
    CragParentIds,
    RouteFinderFormData,
    RouteListItem,
} from "@/graphql/types";

export async function fetchStatesPreviews(): Promise<StatePreview[]> {
    const client = getClient();
    const { data } = await client.query({ query: GET_STATES_PREVIEW });

    return data.states;
};

export async function fetchStateDetails(stateId: string): Promise<StateDetails | null> {
    const client = getClient();
    const { data } = await client.query({
        query: GET_STATE_DETAILS,
        variables: { stateId },
    });

    if (!data.states_by_pk) return null;

    return data.states_by_pk;
};

export async function fetchSubareaDetails(subareaId: string): Promise<SubareaDetails | null> {
    const client = getClient();
    const { data } = await client.query({
        query: GET_SUBAREA_DETAILS,
        variables: { subareaId },
    });

    if (!data.subarea_by_pk) return null;

    return data.subarea_by_pk;
};

export async function fetchSubareaParentId(subareaId: string): Promise<StateId | null> {
    const client = getClient();
    const { data } = await client.query({
        query: GET_SUBAREA_PARENT_ID,
        variables: { subareaId },
    });

    if (!data.subarea_by_pk) return null;

    return data.subarea_by_pk.state.id;
};

export async function fetchCragDetails(cragId: string): Promise<CragDetails | null> {
    const client = getClient();
    const { data } = await client.query({
        query: GET_CRAG_DETAILS,
        variables: { cragId: cragId },
    });

    if (!data.crags_by_pk) return null;

    return data.crags_by_pk;
};

export async function fetchRouteDetails(routeId: string): Promise<RouteDetails | null> {
    const client = getClient();
    const { data } = await client.query({
        query: GET_ROUTE_DETAILS,
        variables: { routeId },
    });

    if (!data.routes_by_pk) return null;

    return data.routes_by_pk;
};

export async function fetchCragParentIds(cragId: string): Promise<CragParentIds | null> {
    const client = getClient();
    const { data } = await client.query({
        query: GET_CRAG_PARENT_IDS,
        variables: { cragId },
    });

    if (!data.crags_by_pk) return null;

    return {
        state_id: data.crags_by_pk.state.id,
        subarea_id: data.crags_by_pk.subarea.id
    };
};


export async function fetchRouteFinderRoutes(variables: RouteFinderFormData): Promise<RouteListItem[]> {
    const client = getClient();
    const { data } = await client.query({
        query: GET_SEARCH_ROUTES,
        variables: {
            grade: variables.grade,
            pitches: variables.pitches,
            star_rating: variables.star_rating,
            discipline: variables.discipline
        }
    });

    return data.routes;
};

export async function fetchTopClassics(): Promise<RouteListItem[]> {
    const client = getClient();
    const { data } = await client.query({ query: GET_TOP_CLASSICS });

    return data.routes;
};