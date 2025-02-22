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
};

export type SubareaBase = {
    id: string;
    name: string;
    state_id: string;
};

export type RouteBase = {
    id: string;
    name: string;
    grade: string;
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
    parent_subarea_id: string;
    routes: RouteBase[];
    subareas: SubareaBase[];
};