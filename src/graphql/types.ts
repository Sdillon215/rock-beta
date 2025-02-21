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

// partial types
export type StatePreview = StateBase & {
    subareas: SubareaBase[];
}