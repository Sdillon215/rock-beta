import { gql } from "@apollo/client";


export const INSERT_SUBAREA = gql`
  mutation InsertSubarea($object: subarea_insert_input!) {
    insert_subarea(objects: [$object]) {
      returning {
        id
      }
    }
  }
`;