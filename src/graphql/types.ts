export type ClassicRoute = {
    rank: number;
    routeName: string;
    area: string;
    subArea: string;
    starRating: number;
    grade: string;
};

export type AreaBase = {
    __typename: string;
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
    star_rating: number;
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

export type RouteDetails = RouteBase & {
    discipline: string;
    length: string;
    pitches: number;
    protection: string;
    description: string;
    location: string;
    crag: {
        id: string;
        name: string;
        routes: {
            id: string;
            name: string;
            grade: string;
            star_rating: number;
        }[];
    };
    state: {
        id: string;
        name: string;
    };
    subarea: {
        id: string;
        name: string;
    };
}

// Union types
export type AreaDetails = StateDetails | SubareaDetails | CragDetails;