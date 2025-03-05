"use server";

import { getClient } from '@/lib/apollo_client';
import {
  INSERT_SUBAREA,
  INSERT_CRAG,
 } from '@/graphql/mutations';
import {
  SubareaFormData,
  CragFormData,
} from '@/graphql/types';
import { fetchSubareaParentId } from './queries';


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
  const id  = crag.parent_subarea_id;
    try {
      const state_id = await fetchSubareaParentId(id);
      const cragData = {...crag, state_id: state_id!};
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