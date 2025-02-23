export type ClassicRoute = {
    rank: number;
    routeName: string;
    area: string;
    subArea: string;
    starRating: number;
    grade: string;
};

export type StateBase = {
    id: string;
    name: string;
    routes_aggregate: {
        aggregate: {
            count: number;
        };
    };
};

export type SubareaBase = {
    id: string;
    name: string;
    routes_aggregate: {
        aggregate: {
            count: number;
        };
    };
};

export type CragBase = {
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
export type StatePreview = StateBase & {
    subareas: SubareaBase[];
};

export type StateDetails = StateBase & {
    gps: string;
    description: string;
    subareas: SubareaBase[];
};

export type SubareaDetails = SubareaBase & {
    gps: string;
    description: string;
    location: string;
    crags: CragBase[];
};

export type CragDetails = CragBase & {
    description: string;
    location: string;
    gps: string;
    routes: RouteBase[];
    state: StateBase;
    subarea: SubareaBase;
};