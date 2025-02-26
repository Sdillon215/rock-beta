export type ClassicRoute = {
    rank: number;
    routeName: string;
    area: string;
    subArea: string;
    starRating: number;
    grade: string;
};

export type AreaBase = {
    id: string;
    name: string;
    routes_aggregate: {
        aggregate: {
            count: number;
        };
    };
};

export type RouteBase = {
    id: string;
    name: string;
    grade: string;
    starRating: number;
};

// partial types
export type StatePreview = AreaBase & {
    subareas: AreaBase[];
};

export type StateDetails = AreaBase & {
    gps: string;
    description: string;
    subareas: AreaBase[];
};

export type SubareaDetails = AreaBase & {
    gps: string;
    description: string;
    location: string;
    state: {
        id: string;
        name: string;
    };
    crags: AreaBase[];
};

export type CragDetails = AreaBase & {
    description: string;
    location: string;
    gps: string;
    routes: RouteBase[];
    state: AreaBase;
    subarea: AreaBase;
};

// Union types
export type AreaDetails = StateDetails | SubareaDetails | CragDetails;