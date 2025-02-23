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
  }
  subarea(where: {state_id: {_is_null: false}}) {
    id
    name
    state_id
  }
}`;

export const GET_STATE_DETAILS = gql`
  query GetStateDetails($stateId: uuid!) {
    states_by_pk(id: $stateId) {
      id
      name
      gps
      description
    }
    subarea(where: { state_id: { _eq: $stateId } }) {
      id
      name
    }
  }
`;

export const GET_SUBAREA_DETAILS = gql`
  query GetSubareaDetails($subareaId: uuid!) {
    subarea_by_pk(id: $subareaId) {
      id
      name
      gps
      description
      location
      state_id
    }
    crags(where: { parent_subarea_id: { _eq: $subareaId } }) {
      id
      name
    }
  }`