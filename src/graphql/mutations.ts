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

export const INSERT_CRAG = gql`
  mutation InsertCrag($object: crags_insert_input!) {
    insert_crags_one(object: $object) {
      id
    }
  }
`;

export const INSERT_ROUTE = gql`
  mutation InsertRoute($object: routes_insert_input!) {
    insert_routes_one(object: $object) {
      id
    }
  }
`;

export const INSERT_ROUTE_IMAGE = gql`
  mutation InsertRouteImage($object: route_images_insert_input!) {
    insert_route_images_one(object: $object) {
      id
      image_url
      caption
    }
  }
`;

export const INSERT_CRAG_IMAGE = gql`
  mutation InsertCragImage($object: crag_images_insert_input!) {
    insert_crag_images_one(object: $object) {
      id
      image_url
      caption
    }
  }
`;

export const INSERT_SUBAREA_IMAGE = gql`
  mutation InsertCragImage($object: subarea_images_insert_input!) {
    insert_subarea_images_one(object: $object) {
      id
      image_url
      caption
    }
  }
`;