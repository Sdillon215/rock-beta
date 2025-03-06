'use client';

import { useState } from 'react';
import { ChevronDownIcon, PencilIcon, Square2StackIcon } from '@heroicons/react/16/solid';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import AddPhotoModal from '@/components/add_photo_modal/AddPhotoModal';
import { AreaDetails } from '@/graphql/types';

export default function ContributeMenu({ area, parentId, parentName }: { area?: AreaDetails, parentId: string; parentName: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let imageParentType;

    if (area) {
        imageParentType = area.__typename;
    } else {
        imageParentType = "route";
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700"
            >
                Contribute Beta
                <ChevronDownIcon className="size-4 fill-white/60" />
            </button>

            {isOpen && (
                <div className="absolute z-40 right-0 mt-2 w-52 origin-top-right rounded-xl bg-gray-200 p-1 text-sm text-black shadow-lg">
                    {area && (<Link
                        href={
                            area.__typename === "states" ?
                                `/add/subarea/${area.id}` :
                                area.__typename === "subarea" ?
                                    `/add/crag/${area.id}` :
                                    `/add/route/${area.id}`
                        }
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                        <Square2StackIcon className="size-4 " />
                        {
                            area.__typename === "states" ?
                                "Add Subarea" :
                                area.__typename === "subarea" ?
                                    "Add Crag" :
                                    "Add Route"
                        }
                    </Link>)}
                    <div className="my-1 h-px bg-gray-300" />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100"
                    >
                        <PhotoIcon className="size-4" />
                        Add Photo
                    </button>
                </div>
            )}

            {isModalOpen && (
                <AddPhotoModal
                    parentId={parentId}
                    parentName={parentName}
                    parentType={imageParentType}
                    onClose={() => setIsModalOpen(false)} // Pass a close handler
                />
            )}
        </div>
    );
}