import { gql } from "@apollo/client";

// export const GET_CLASSICS = gql`
// query GetClassicClimbs {
//   areas_classic_climbs {
//     routeName
// 		area
// 		subArea
// 		grade
// 		starRating
// 		rank
// 		id
//   }
// }`;

export const GET_STATES_PREVIEW = gql`
query GetStatesPreview {
  states {
    id
    name
    routes_aggregate {
      aggregate {
        count(distinct: false)
      }
    }
    subareas {
      id
      name
      routes_aggregate {
        aggregate {
          count(distinct: false)
        }
      }
    }
  }
}`;

export const GET_STATE_DETAILS = gql`
  query GetStateDetails($stateId: uuid!) {
    states_by_pk(id: $stateId) {
    id
    name
    gps
    description
    subareas {
      id
      name
      routes_aggregate {
        aggregate {
          count(distinct: false)
        }
      }
    }
    state_images {
      id
      caption
      image_url
    }
    routes(where: {star_rating: {_eq: 4}}) {
      id
      name
      star_rating
      grade
      discipline
      state {
        id
        name
      }
      subarea {
        id
        name
      }
    }
  }
}`;

export const GET_SUBAREA_DETAILS = gql`
  query GetSubareaDetails($subareaId: uuid!) {
    subarea_by_pk(id: $subareaId) {
    id
    name
    gps
    location
    description
    state {
      id
      name
    }
    crags {
      id
      name
      routes_aggregate {
        aggregate {
          count(distinct: false)
        }
      }
    }
    subarea_images {
      id
      caption
      image_url
    }
    routes(where: {star_rating: {_eq: 4}}) {
      id
      name
      star_rating
      grade
      discipline
      state {
        id
        name
      }
      subarea {
        id
        name
      }
    }
  }
}`;

export const GET_SUBAREA_PARENT_ID = gql`
  query GetSubareaParentId($subareaId: uuid!) {
    subarea_by_pk(id: $subareaId) {
    state {
      id
    }
  }
}`;

export const GET_CRAG_DETAILS = gql`
  query GetCragDetails($cragId: uuid!) {
    crags_by_pk(id: $cragId) {
    id
    name
    description
    gps
    location
    routes {
      id
      name
      star_rating
      grade
      discipline
      state {
        id
        name
      }
      subarea {
        id
        name
      }
    }
    state {
      id
      name
    }
    subarea {
      id
      name
    }
    crag_images {
      id
      caption
      image_url
    }
  }
}`;

export const GET_CRAG_PARENT_IDS = gql`
  query GetCragParentIds($cragId: uuid!) {
    crags_by_pk(id: $cragId) {
    state {
      id
    }
    subarea {
      id
    }
  }
}`;

export const GET_ROUTE_DETAILS = gql`
  query GetRoutesDetails($routeId: uuid!) {
  routes_by_pk(id: $routeId) {
    id
    name
    grade
    discipline
    description
    length
    location
    pitches
    protection
    star_rating
    crag {
      id
      name
      routes {
        id
        name
        grade
        star_rating
      }
    }
    state {
      id
      name
    }
    subarea {
      id
      name
    }
    route_images {
      id
      caption
      image_url
    }
  }
}`;

export const GET_SEARCH_ROUTES = gql`
  query GetSearchRoutes($grade: String, $pitches: Int, $star_rating: Int, $discipline: [String!]) {
    routes(
      where: {
        grade: { _eq: $grade }
        pitches: { _eq: $pitches }
        star_rating: { _gte: $star_rating }
        discipline: { _in: $discipline }
      }
    ) {
      id
      name
      star_rating
      grade
      discipline
      state {
        id
        name
      }
      subarea {
        id
        name
      }
    }
  }
`;

export const GET_TOP_CLASSICS = gql`
  query GetTopClassics {
    routes(where: {star_rating: {_eq: 4}}) {
      id
      name
      star_rating
      grade
      discipline
      state {
        id
        name
      }
      subarea {
        id
        name
      }
    }
  }
`;