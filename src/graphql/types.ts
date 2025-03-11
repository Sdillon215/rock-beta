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

export type StateId = {
    state_id: string;
};

export type CragParentIds = {
    subarea_id: string;
    state_id: string;
};

export type RouteBase = {
    id: string;
    name: string;
    grade: string;
    star_rating: number;
};

export type AreaFormData = {
    name: string;
    description: string;
    gps: string;
    location: string;
};

export type RouteFormData = {
    name: string;
    grade: string;
    star_rating: number;
    pitches: number;
    length: number;
    discipline: string;
    description: string;
    location: string;
    protection: string;
    crag_id: string;
};

export type RouteFinderFormData = {
    grade: string;
    pitches: number;
    star_rating: number;
    discipline: string[];
}

export type ImageFormData = {
    image: File;
    parent_id: string;
    caption: string;
};

export type BlobImageData = {
    id: string;
    caption: string;
    image_url: string;
}

// partial types
export type StatePreview = AreaBase & {
    subareas: AreaBase[];
};

export type StateDetails = AreaBase & {
    gps: string;
    description: string;
    subareas: AreaBase[];
    state_images: BlobImageData[];
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
    subarea_images: BlobImageData[];
};

export type CragDetails = AreaBase & {
    description: string;
    location: string;
    gps: string;
    routes: RouteBase[];
    state: AreaBase;
    subarea: AreaBase;
    crag_images: BlobImageData[];
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
    route_images: BlobImageData[];
};

export type SearchRoutes = RouteBase & {
    discipline: string;
    state: {
        id: string;
        name: string;
    }
    crag: {
        id: string;
        name: string;
    }
};

export type SubareaFormData = AreaFormData & {
    state_id: string;
};

export type CragFormData = AreaFormData & {
    parent_subarea_id: string;
};

// Union types
export type AreaDetails = StateDetails | SubareaDetails | CragDetails;

// Enum types
export enum ClimbingGrades {
    '5_5' = '5.5',
    '5_6' = '5.6',
    '5_7' = '5.7',
    '5_8' = '5.8',
    '5_9' = '5.9',
    '5_10' = '5.10',
    '5_10a' = '5.10a',
    '5_10b' = '5.10b',
    '5_10c' = '5.10c',
    '5_10d' = '5.10d',
    '5_11' = '5.11',
    '5_11a' = '5.11a',
    '5_11b' = '5.11b',
    '5_11c' = '5.11c',
    '5_11d' = '5.11d',
    '5_12' = '5.12',
    '5_12a' = '5.12a',
    '5_12b' = '5.12b',
    '5_12c' = '5.12c',
    '5_12d' = '5.12d',
};

export enum ClimbingDisciplines {
    trad = 'Trad',
    sport = 'Sport',
    toprope = 'Toprope',
};