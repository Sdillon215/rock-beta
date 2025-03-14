'use client';

import React, { useState, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    insertRouteImage,
    insertCragImage,
    insertSubareaImage,
    insertStateImage,
} from '@/lib/data/mutations';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const photoSchema = z.object({
    image: z
        .instanceof(FileList, { message: 'Image is required' })
        .refine((files) => files.length > 0, { message: 'You must upload an image' })
        .refine((files) => files[0]?.size <= MAX_FILE_SIZE, {
            message: 'File size must be less than 1MB',
        }),
    caption: z.string().nonempty('Caption is required'),
});

type PhotoFormData = z.infer<typeof photoSchema>;

type AddPhotoModalProps = {
    parentId: string;
    parentName: string;
    parentType: string;
    onClose: () => void;
};

const AddPhotoModal = forwardRef<HTMLDivElement, AddPhotoModalProps>(({ parentId, parentName, parentType, onClose }, ref) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PhotoFormData>({
        resolver: zodResolver(photoSchema),
    });

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleClose = () => {
        reset();
        setSuccessMessage(null);
        onClose();
    };

    const onSubmit = async (formData: PhotoFormData) => {
        try {
            const imageData = {
                image: formData.image[0],
                caption: formData.caption,
                parent_id: parentId,
            };

            if (parentType === 'route') {
                await insertRouteImage(imageData);
            } else if (parentType === 'crags') {
                await insertCragImage(imageData);
            } else if (parentType === 'subarea') {
                await insertSubareaImage(imageData);
            } else if (parentType === 'states') {
                await insertStateImage(imageData);
            }

            setSuccessMessage('Photo added successfully!');
            reset();
            router.refresh();
            setTimeout(() => {
                handleClose();
            }, 500);
        } catch (error) {
            console.error(error);
            setSuccessMessage('Error adding photo.');
        }
    };

    return (
        <div ref={ref} className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4 z-50">
            <div className="grid gap-4 bg-white rounded-md p-6 max-w-2xl w-full text-left">
                <h2 className="text-2xl font-semibold">Add photo to {parentName}</h2>
                {successMessage && <p className="text-green-600">{successMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid justify-items-start">
                    <div>
                        <label htmlFor="image">Image </label>
                        <input type="file" id="image" {...register('image')} />
                        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                    </div>
                    <div className="w-full">
                        <label htmlFor="caption">Caption</label>
                        <input
                            id="caption"
                            {...register('caption')}
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Enter image caption"
                        />
                        {errors.caption && <p className="text-red-500">{errors.caption.message}</p>}
                    </div>
                    <div className="flex gap-4">
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            {isSubmitting ? 'Uploading...' : 'Upload'}
                        </button>
                        <button onClick={handleClose} type="button" className="px-4 py-2 bg-red-500 text-white rounded-md">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

AddPhotoModal.displayName = 'AddPhotoModal';

export default AddPhotoModal;
