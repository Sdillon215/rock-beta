import Carousel from '@/components/carousel/Carousel';
import SubNav from '@/components/sub_nav/SubNav';
import ContributeMenu from '@/components/contribute_menu/ContributeMenu';
import AreaClassicClimbList from '@/components/area_classic_climb_list/AreaClassicClimbList';
import Map from '@/components/map/Map';
import Link from 'next/link';
import { AreaDetails, BlobImageData, RouteListItem, MapboxArea } from '@/graphql/types';
import PhotoListSection from '@/components/photo_list_section/PhotoListSection';

type AreaPageProps<T extends AreaDetails> = {
    area: T;
    parentPaths?: { pathName: string; path: string }[];
    childAreas?: { id: string; name: string; routes_aggregate: { aggregate: { count: number } } }[];
    childPath?: string;
    images: BlobImageData[];
    classicClimbs: RouteListItem[];
};

export default function AreaPage<T extends AreaDetails>({
    area,
    parentPaths,
    childAreas,
    childPath,
    images,
    classicClimbs,
}: AreaPageProps<T>) {
    const areaGeoData: MapboxArea[] = [
        {
            id: area.id,
            name: area.name,
            gps: area.gps
        }
    ];
    return (
        <section className="grid md:grid-flow-col gap-4 md:grid-cols-12">
            <div className="grid gap-4 md:col-span-3 content-start h-fit bg-gray-200">
                <div className="md:hidden px-4">
                    <SubNav parentPaths={parentPaths} currentName={area.name} />
                    <div className="flex flex-row justify-between items-center pb-4">
                        <h1 className="text-2xl md:text-4xl font-bold">{area.name}</h1>
                        <div className="md:hidden w-52 text-right">
                            <ContributeMenu area={area} parentId={area.id} parentName={area.name} />
                        </div>
                    </div>
                    {"gps" in area && area.gps && (
                        <div className="flex flex-row items-center px-4">
                            <p className="pr-4">GPS:</p>
                            <p>{area.gps}</p>
                        </div>
                    )}
                </div>
                <div className="relative h-[30vh] overflow-clip">
                    <Map unParsedGeoJsonData={areaGeoData} />
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
                {area.__typename === "crags" && area.routes.length > 0 && (
                    <div>
                        <div className="border-b-4 border-blue-900">
                            <h1 className="text-lg font-bold pl-2">Routes in {area.name}</h1>
                        </div>
                        {area.routes.length > 0 && (
                            <>
                                {area.routes.map((route) => (
                                    <div key={route.id} className="flex flex-row items-end justify-between p-2">
                                        <Link href={`/route/${route.id}`} className="text-blue-900 hover:text-blue-700">
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
                    <div className="hidden md:block w-52 text-right">
                        <ContributeMenu area={area} parentId={area.id} parentName={area.name} />
                    </div>
                    <div className="relative aspect-square w-full">
                        {images.length > 0 ? (
                            <Carousel imageData={images} />
                        ) :
                            (
                                <div className="w-full bg-gray-200 h-full flex items-center justify-center">
                                    <h3>There are no photos yet</h3>
                                </div>
                            )}
                    </div>
                </div>
                {classicClimbs && classicClimbs.length > 0 && (
                    <div className="md:col-span-2">
                        <AreaClassicClimbList areaName={area.name} classicRoutes={classicClimbs} />
                    </div>
                )}
                {images && images.length > 0 && (
                    <div className="md:col-span-2">
                        <PhotoListSection images={images} />
                    </div>
                )}
            </div>
        </section>
    );
};