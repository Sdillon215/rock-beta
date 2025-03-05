"use server";

import { getClient } from '@/lib/apollo_client';
import { INSERT_SUBAREA } from '@/graphql/mutations';
import { SubareaFormData } from '@/graphql/types';


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