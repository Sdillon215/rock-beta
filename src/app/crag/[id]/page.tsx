import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchCragDetails } from '@/lib/data/queries';
import AreaPage from '@/components/area_page/AreaPage';

export const metadata: Metadata = {
    title: 'Crag Page',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const cragDetails = await fetchCragDetails(id);
    
    if (!cragDetails) {
        return notFound();
    }
    
    const classicRoutes = cragDetails?.routes.filter(route => route.star_rating === 4);
    
    return (
        <main className="grid gap-4 max-w-screen-xl mx-auto md:py-4">
            <AreaPage
                area={cragDetails}
                parentPaths={
                    [
                        {
                            pathName: cragDetails.state.name,
                            path: `/state/${cragDetails.state.id}`
                        },
                        {
                            pathName: cragDetails.subarea.name,
                            path: `/subarea/${cragDetails.subarea.id}`
                        }
                    ]
                }
                images={cragDetails.crag_images}
                classicClimbs={classicRoutes}
            />
        </main>
    );
};