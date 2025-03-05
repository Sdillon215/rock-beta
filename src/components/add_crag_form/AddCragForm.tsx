'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addCrag } from '@/lib/data/mutations';
import { useRouter } from 'next/navigation';

const cragSchema = z.object({
    name: z.string().min(2, 'Crag name must be at least 2 characters'),
    description: z.string().min(5, 'Description must be at least 25 characters'),
    gps: z
    .string()
    .regex(
      /^-?\d{1,3}(\.\d+)?,\s*-?\d{1,3}(\.\d+)?$/,
      'Invalid GPS coordinates (format: "latitude,longitude")'
    ),
    location: z.string().min(10, 'Location must be at least 2 characters'),
});

type CragFormValues = z.infer<typeof cragSchema>;

export default function AddCragForm({ id }: { id: string }) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CragFormValues>({
        resolver: zodResolver(cragSchema),
    });

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onSubmit = async (data: CragFormValues) => {
        console.log('Form submitted:', data);
        try {
            const cragData = { ...data, parent_subarea_id: id };
            const newCragId = await addCrag(cragData);

            setSuccessMessage('Crag added successfully!');
            reset();
            router.push(`/crag/${newCragId}`);
        } catch (error) {
            console.error(error);
            setSuccessMessage('Error adding crag.');
        }
    };

    return (
        <div className="my-auto rounded-lg">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Add Crag</h2>

            {successMessage && (
                <p className="text-sm text-green-600">{successMessage}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-xl font-bold text-gray-700">Crag Name</label>
                    <input
                        {...register('name')}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter subarea name"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="block text-xl font-bold text-gray-700">Description</label>
                    <textarea
                        {...register('description')}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter description"
                    />
                    {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                </div>
                <div>
                    <label className="block text-xl font-bold text-gray-700">GPS</label>
                    <textarea
                        {...register('gps')}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter description"
                    />
                    {errors.gps && <p className="text-red-500 text-xs">{errors.gps.message}</p>}
                </div>
                <div>
                    <label className="block text-xl font-bold text-gray-700">Location</label>
                    <textarea
                        {...register('location')}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter description"
                    />
                    {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
                </div>
                <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-64 bg-gray-800 text-white p-2 rounded-md hover:bg-blue-500"
                >
                    {isSubmitting ? 'Adding...' : 'Add Crag'}
                </button>
                    </div>
            </form>
        </div>
    );
}