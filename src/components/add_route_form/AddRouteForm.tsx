'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addRoute } from '@/lib/data/mutations';
import { useRouter } from 'next/navigation';
import { StarIcon } from '@heroicons/react/16/solid';
import {
    ClimbingGrades,
    ClimbingDisciplines
} from '@/graphql/types';

const climbingGradeSchema = z.enum(
    Object.values(ClimbingGrades) as [ClimbingGrades, ...ClimbingGrades[]]
).refine(value => Object.values(ClimbingGrades).includes(value), {
    message: "Invalid grade selected. Please choose a valid grade.",
});

const routeSchema = z.object({
    name: z.string().min(2, 'Route name is required'),
    grade: climbingGradeSchema,
    star_rating: z.number().int().min(1, 'Star rating must be at least 1').max(4, 'Star rating must be at most 4'),
    pitches: z.string().min(1, 'Pitches must be at least 1'),
    length: z.string().min(2, 'Length is required').max(4, 'Length must be at most 4 chars'),
    discipline: z.enum(
        Object.values(ClimbingDisciplines) as [ClimbingDisciplines, ...ClimbingDisciplines[]]
    ).refine(value => Object.values(ClimbingDisciplines).includes(value), {
        message: "Invalid discipline selected. Please choose a valid discipline.",
    }),
    description: z.string().min(5, 'Description must be at least 5 characters'),
    location: z.string().nonempty('Location is required'),
    protection: z.string().min(4, 'Protection must be at least 5 characters'),
});

type RouteFormValues = z.infer<typeof routeSchema>;

export default function AddRouteForm({ id }: { id: string }) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<RouteFormValues>({
        resolver: zodResolver(routeSchema),
    });

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (star: number) => {
        setRating(star);
        setValue('star_rating', star); // Update form value
    };

    const onSubmit = async (data: RouteFormValues) => {
        const transformedData = {
            ...data,
            length: Number(data.length), // Convert length to number
            pitches: Number(data.pitches), // Convert pitches to number
        };
        const routeData = { ...transformedData, crag_id: id };

        try {
            const newRouteId = await addRoute(routeData);

            setSuccessMessage('Route added successfully!');
            reset();
            router.push(`/route/${newRouteId}`);
        } catch (error) {
            console.error(error); 
            setSuccessMessage('Error adding route.');
        }
    };

    return (
        <div className="my-auto rounded-lg">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Add Route</h2>
            {successMessage && (
                <p className="text-sm text-green-600">{successMessage}</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-xl font-bold text-gray-700">Route Name</label>
                    <input
                        {...register('name')}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter route name"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>
                <div className="flex flex-row flex-wrap gap-4 min-w-full">
                    <div className="flex items-center space-x-2">
                        <label className="block text-xl font-bold text-gray-700">Grade:</label>
                        <select className="w-24 text-center border rounded-md p-1" {...register('grade')}>
                            {Object.values(ClimbingGrades).map((grade) => (
                                <option key={grade} value={grade}>
                                    {grade}
                                </option>
                            ))}
                        </select>
                        {errors.grade && <p className="text-red-500 text-xs">{errors.grade.message}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="block text-xl font-bold text-gray-700">Style:</label>
                        <select className="w-24 text-center border rounded-md p-1" {...register('discipline')}>
                            {Object.values(ClimbingDisciplines).map((style) => (
                                <option key={style} value={style}>
                                    {style}
                                </option>
                            ))}
                        </select>
                        {errors.discipline && <p className="text-red-500 text-xs">{errors.discipline.message}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="block text-xl font-bold text-gray-700">Length:</label>
                        <input
                            {...register('length')}
                            type='number'
                            className="mt-1 block w-24 p-2 border rounded-md"
                            placeholder="Length in ft"
                        />
                        {errors.length && <p className="text-red-500 text-xs">{errors.length.message}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="block text-xl font-bold text-gray-700">Pitches:</label>
                        <select className="w-24 text-center border rounded-md p-1" {...register('pitches')}>
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((pitch) => (
                                <option key={pitch * 7} value={pitch}>
                                    {pitch}
                                </option>
                            ))}
                        </select>
                        {errors.pitches && <p className="text-red-500 text-xs">{errors.pitches.message}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="text-xl font-bold text-gray-700">Rating:</label>
                        <div className="flex space-x-2" {...register('star_rating')}>
                            {[1, 2, 3, 4].map((star) => (
                                <StarIcon
                                    key={star}
                                    className={`h-8 w-8 cursor-pointer transition-colors ${(hover >= star || rating >= star) ? "text-yellow-400" : "text-gray-400"
                                        }`}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => handleClick(star)}
                                />
                            ))}
                            {errors.star_rating && <p className="text-red-500 text-xs">{errors.star_rating.message}</p>}
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-xl font-bold text-gray-700">Description</label>
                    <textarea
                        {...register('description')}
                        className="mt-1 block w-full h-36 p-2 border rounded-md"
                        placeholder="Enter description"
                    />
                    {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                </div>
                <div>
                    <label className="block text-xl font-bold text-gray-700">Location</label>
                    <textarea
                        {...register('location')}
                        className="mt-1 block w-full h-36 p-2 border rounded-md"
                        placeholder="Describe location and how to get there"
                    />
                    {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
                </div>
                <div>
                    <label className="block text-xl font-bold text-gray-700">Protection</label>
                    <textarea
                        {...register('protection')}
                        className="mt-1 block w-full h-36 p-2 border rounded-md"
                        placeholder="Describe protection. i.e. # of draws, sizes of gear, etc."
                    />
                    {errors.protection && <p className="text-red-500 text-xs">{errors.protection.message}</p>}
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-64 bg-gray-800 text-white p-2 rounded-md hover:bg-blue-500"
                    >
                        {isSubmitting ? 'Adding...' : 'Add Route'}
                    </button>
                </div>
            </form>
        </div>
    );
};