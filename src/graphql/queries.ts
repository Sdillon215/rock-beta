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