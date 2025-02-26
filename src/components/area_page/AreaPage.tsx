import Image from 'next/image';
import MapFiller from '../../../public/map_filler.png';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
    ChevronDownIcon,
    PencilIcon,
    Square2StackIcon,
} from '@heroicons/react/16/solid'
import { PhotoIcon } from '@heroicons/react/24/outline';
import Carousel from '@/components/carousel/Carousel';
import ClassicClimbsList from '@/components/classic_climbs_list/ClassicClimbsList';
import Link from 'next/link';
import { AreaDetails } from '@/graphql/types';

type AreaPageProps<T extends AreaDetails> = {
    area: T;
    parentPaths?: { pathName: string; path: string }[];
    childAreas?: { id: string; name: string; routes_aggregate: { aggregate: { count: number } } }[];
    childPath?: string;
};

export default function AreaPage<T extends AreaDetails>({
    area,
    parentPaths,
    childAreas,
    childPath
}: AreaPageProps<T>) {

    return (
        <section className="grid md:grid-flow-col gap-4 md:grid-cols-12">
            <div className="grid gap-4 md:col-span-3 content-start h-fit bg-gray-200">
                <div className="md:hidden px-4">
                    <span className="flex flex-row">
                        <Link href={`/state`}>
                            <p className="pr-1 text-blue-900 hover:text-blue-700">All Areas &gt;</p>
                        </Link>
                        {parentPaths && parentPaths.length > 0 && (
                            <>
                                {parentPaths.map((parent) => (
                                    <Link href={parent.path} key={parent.path}>
                                        <p className="pr-1 text-blue-900 hover:text-blue-700">{parent.pathName} &gt;</p>
                                    </Link>
                                ))}
                            </>
                        )}
                        <p className="pr-1">{area.name}</p>
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold">{area.name}</h1>
                    {"gps" in area && area.gps && (
                        <div className="flex flex-row items-center px-4">
                            <p className="pr-4">GPS:</p>
                            <p>{area.gps}</p>
                        </div>
                    )}
                </div>
                <div className="relative h-[25vh] mx-2">
                    <Image
                        src={MapFiller}
                        alt="State Image"
                        fill={true}
                        placeholder="blur"
                        className="object-contain object-center"
                    />
                </div>
                {childAreas && childAreas.length > 0 && (
                    <div>
                        <div className="border-b-4 border-blue-900">
                            <h1 className="text-lg font-bold pl-2">Areas in {area.name}</h1>
                        </div>
                        {childAreas.map((child) => (
                            <div key={child.id} className="flex flex-row items-end justify-between p-2">
                                <Link href={`${childPath}/${child.id}`} className="text-blue-900 hover:text-blue-700">
                                    <h4 className="font-bold">{child.name}</h4>
                                </Link>
                                <p className="text-xs">{child.routes_aggregate.aggregate.count} routes</p>
                            </div>
                        ))}
                    </div>
                )}
                {"routes" in area && area.routes.length > 0 && (
                    <div>
                        <div className="border-b-4 border-blue-900">
                            <h1 className="text-lg font-bold pl-2">Routes in {area.name}</h1>
                        </div>
                        {area.routes.length > 0 && (
                            <>
                                {area.routes.map((route) => (
                                    <div key={route.id} className="flex flex-row items-center p-2">
                                        <Link href={`/subarea/${route.id}`} className="text-blue-900 hover:text-blue-700">
                                            <h4 className="font-bold">{route.name}</h4>
                                        </Link>
                                        <p className="text-xs">{route.grade}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className="grid md:grid-cols-2 md:col-span-9 md:row-span-1 gap-4">
                <div className="grid md:col-span-1 h-fit gap-8">
                    <div className="hidden md:block px-4">
                        <span className="flex flex-row">
                            <Link href={`/state`}>
                                <p className="pr-1 text-blue-900 hover:text-blue-700">All Areas &gt;</p>
                            </Link>
                            {parentPaths && parentPaths.length > 0 && (
                                <>
                                    {parentPaths.map((parent) => (
                                        <Link href={parent.path} key={parent.path}>
                                            <p className="pr-1 text-blue-900 hover:text-blue-700">{parent.pathName} &gt;</p>
                                        </Link>
                                    ))}
                                </>
                            )}
                            <p className="pr-1">{area.name}</p>
                        </span>
                        <h1 className="text-2xl md:text-4xl font-bold">{area.name}</h1>
                    </div>
                    {"gps" in area && area.gps && (
                        <div className="hidden md:flex flex-row items-center px-4">
                            <p className="pr-4">GPS:</p>
                            <p>{area.gps}</p>
                        </div>
                    )}
                    <div className="px-4">
                        <h1 className="text-2xl md:text-4xl font-bold">Description</h1>
                        <p>{area.description}</p>
                    </div>
                    {"location" in area && (
                        <div className="px-4">
                            <h1 className="text-2xl md:text-4xl font-bold">Location</h1>
                            <p>{area.location}</p>
                        </div>
                    )}
                </div>
                <div className="grid gap-4 grid-flow-row justify-items-end content-between md:col-span-1 p-4">
                    <div className="w-52 text-right">
                        <Menu>
                            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                                Contribute Beta
                                <ChevronDownIcon className="size-4 fill-white/60" />
                            </MenuButton>

                            <MenuItems
                                transition
                                anchor="bottom end"
                                className="w-52 origin-top-right rounded-xl bg-gray-200 p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                            >
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                                        <PencilIcon className="size-4 " />
                                        Edit Details
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                                        <Square2StackIcon className="size-4 " />
                                        Add Subarea
                                    </button>
                                </MenuItem>
                                <div className="my-1 h-px bg-white/5" />
                                <MenuItem>
                                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                                        <PhotoIcon className="size-4 " />
                                        Add Photo
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                    <div className="relative aspect-square w-full">
                        <Carousel />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <ClassicClimbsList />
                </div>
            </div>
        </section>
    );
};