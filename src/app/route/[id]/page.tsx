import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchRouteDetails } from '@/lib/data/queries';
import { StarIcon } from "@heroicons/react/16/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
    ChevronDownIcon,
    PencilIcon,
} from '@heroicons/react/16/solid'
import { PhotoIcon } from '@heroicons/react/24/outline';
import Carousel from '@/components/carousel/Carousel';
import ClassicClimbsList from '@/components/classic_climbs_list/ClassicClimbsList';
import Link from 'next/link';
import SubNav from '@/components/sub_nav/SubNav';

export const metadata: Metadata = {
    title: 'Route Page',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const route = await fetchRouteDetails(id);
    if (!route) {
        return notFound();
    }

    return (
        <main className="grid gap-4 max-w-screen-xl mx-auto md:py-4">
            <section className="grid md:grid-flow-col gap-4 md:grid-cols-12">
                <div className="hidden md:grid gap-4 md:col-span-3 content-start h-fit bg-gray-200">
                    {route.crag.routes.length > 0 && (
                        <div>
                            <div className="border-b-4 border-blue-900">
                                <h1 className="text-lg font-bold pl-2">Routes in {route.crag.name}</h1>
                            </div>
                            {route.crag.routes.map((cragRoute) => (
                                <div key={cragRoute.id} className="flex flex-row items-end justify-between p-2">
                                    <Link href={`/route/${cragRoute.id}`} className="text-blue-900 hover:text-blue-700">
                                        <h4 className="font-bold">{cragRoute.name}</h4>
                                    </Link>
                                    <p className="text-xs">{cragRoute.grade}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="grid md:grid-cols-2 md:col-span-9 md:row-span-1 gap-4">
                    <div className="grid md:col-span-1 h-fit gap-8">
                        <div className="px-4">
                            <SubNav
                                currentName={route.name}
                                parentPaths={
                                    [
                                        {
                                            pathName: route.state.name,
                                            path: `/state/${route.state.id}`
                                        },
                                        {
                                            pathName: route.subarea.name,
                                            path: `/subarea/${route.subarea.id}`
                                        },
                                        {
                                            pathName: route.crag.name,
                                            path: `/crag/${route.crag.id}`
                                        }
                                    ]
                                }
                            />
                            <h1 className="text-2xl md:text-4xl font-bold">{route.name}</h1>
                            <div className="flex flex-row items-center px-4">
                                <p className="pr-4">Grade:</p>
                                <p>{route.grade}</p>
                            </div>
                            <div className="flex flex-row items-center px-4">
                                <p className="pr-4">Rating:</p>
                                <div className="flex">
                                    {Array.from({ length: route.star_rating }, (_, index) => (
                                        <StarIcon key={index * 20} className="h-5 w-5 text-yellow-500" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-row items-center px-4">
                                <p className="pr-4">Style:</p>
                                <p>{route.discipline}</p>
                            </div>
                            <div className="flex flex-row items-center px-4">
                                <p className="pr-4">Pitches:</p>
                                <p>{route.pitches.toString()}</p>
                            </div>
                            <div className="flex flex-row items-center px-4">
                                <p className="pr-4">Length:</p>
                                <p>{route.length}ft</p>
                            </div>
                        </div>
                        <div className="px-4">
                            <h1 className="text-2xl md:text-4xl font-bold">Description</h1>
                            <p>{route.description}</p>
                        </div>
                        {"location" in route && (
                            <div className="px-4">
                                <h1 className="text-2xl md:text-4xl font-bold">Location</h1>
                                <p>{route.location}</p>
                            </div>
                        )}
                        <div className="px-4">
                            <h1 className="text-2xl md:text-4xl font-bold">Protection</h1>
                            <p>{route.protection}</p>
                        </div>
                    </div>
                    <div className="grid gap-4 grid-flow-row justify-items-end content-start md:col-span-1 p-4">
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
        </main>
    );
};