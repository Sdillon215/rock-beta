"use server";

import { getClient } from '@/lib/apollo_client';
import { put } from '@vercel/blob';
import { getPlaiceholder } from "plaiceholder";
import {
  INSERT_SUBAREA,
  INSERT_CRAG,
  INSERT_ROUTE,
  INSERT_ROUTE_IMAGE,
  INSERT_CRAG_IMAGE,
  INSERT_SUBAREA_IMAGE,
  INSERT_STATE_IMAGE,
} from '@/graphql/mutations';
import {
  SubareaFormData,
  CragFormData,
  RouteFormData,
  ImageFormData,
} from '@/graphql/types';
import {
  fetchSubareaParentId,
  fetchCragParentIds,
} from './queries';


export const addSubarea = async (subarea: SubareaFormData) => {
  const client = getClient();
  console.log("mutation function");
  try {
    const { data } = await client.mutate({
      mutation: INSERT_SUBAREA,
      variables: { object: subarea },
    });

    console.log('Subarea inserted:', data.insert_subarea.returning[0]);
    return data.insert_subarea.returning[0]; // Return the created subarea
  } catch (error) {
    console.error('Error inserting subarea:', error);
    throw error;
  }
};

export const addCrag = async (crag: CragFormData) => {
  const client = getClient();
  const id = crag.parent_subarea_id;
  try {
    const state_id = await fetchSubareaParentId(id);
    const cragData = { ...crag, state_id: state_id! };
    const { data } = await client.mutate({
      mutation: INSERT_CRAG,
      variables: { object: cragData },
    });

    return data.insert_crags_one.id; // Return the created crag
  } catch (error) {
    console.error('Error inserting crag:', error);
    throw error;
  }
};

export const addRoute = async (route: RouteFormData) => {
  const client = getClient();
  const id = route.crag_id;
  try {
    const parent_ids = await fetchCragParentIds(id);
    const routeData = { ...route, state_id: parent_ids!.state_id, subarea_id: parent_ids!.subarea_id };
    const { data } = await client.mutate({
      mutation: INSERT_ROUTE,
      variables: { object: routeData },
    });

    return data.insert_routes_one.id; // Return the created route
  } catch (error) {
    console.error('Error inserting route:', error);
    throw error;
  }
};

export const uploadBlobImage = async (imageFile: File) => {

  const blob = await put(imageFile.name, imageFile, {
    access: 'public',
  });

  return blob.url;
};

export const insertRouteImage = async (imageData: ImageFormData) => {
  const client = getClient();
  const imageFile = imageData.image as File;

  try {
    const blobUrl = await uploadBlobImage(imageFile);

    const newImageData = {
      image_url: blobUrl,
      route_id: imageData.parent_id,
      caption: imageData.caption,
    }

    const { data } = await client.mutate({
      mutation: INSERT_ROUTE_IMAGE,
      variables: { object: newImageData },
    });

    console.log('Image uploaded:', data.insert_route_images_one);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  };

  return;
};

export const insertCragImage = async (imageData: ImageFormData) => {
  const client = getClient();
  const imageFile = imageData.image as File;

  try {
    const blobUrl = await uploadBlobImage(imageFile);

    const newImageData = {
      image_url: blobUrl,
      crag_id: imageData.parent_id,
      caption: imageData.caption,
    }

    const { data } = await client.mutate({
      mutation: INSERT_CRAG_IMAGE,
      variables: { object: newImageData },
    });

    console.log('Image uploaded:', data.insert_crag_images_one);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  };

  return;
};

export const insertSubareaImage = async (imageData: ImageFormData) => {
  const client = getClient();
  const imageFile = imageData.image as File;

  try {
    const blobUrl = await uploadBlobImage(imageFile);

    const newImageData = {
      image_url: blobUrl,
      subarea_id: imageData.parent_id,
      caption: imageData.caption,
    }

    const { data } = await client.mutate({
      mutation: INSERT_SUBAREA_IMAGE,
      variables: { object: newImageData },
    });

    console.log('Image uploaded:', data.insert_subarea_images_one);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  };

  return;
};

export const insertStateImage = async (imageData: ImageFormData) => {
  const client = getClient();
  const imageFile = imageData.image as File;

  const arrayBuffer = await imageFile.arrayBuffer();
  const { base64 } = await getPlaiceholder(Buffer.from(arrayBuffer));

  try {
    const blobUrl = await uploadBlobImage(imageFile);

    const newImageData = {
      image_url: blobUrl,
      blur_data_url: base64,
      state_id: imageData.parent_id,
      caption: imageData.caption,
    }

    const { data } = await client.mutate({
      mutation: INSERT_STATE_IMAGE,
      variables: { object: newImageData },
    });

    console.log('Image uploaded:', data.insert_state_images_one);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  };

  return;
};