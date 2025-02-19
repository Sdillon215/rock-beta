import { gql } from "@apollo/client";

export const GET_CLASSICS = gql`
query GetClassicClimbs {
  areas_classic_climbs {
    routeName
		area
		subArea
		grade
		starRating
		rank
		id
  }
}`;