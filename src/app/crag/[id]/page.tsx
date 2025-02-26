import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchCragDetails } from '@/lib/data/queries';
import AreaPage from '@/components/area_page/AreaPage';
import path from 'path';

export const metadata: Metadata = {
    title: 'Crag Page',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const cragDetails = await fetchCragDetails(id);
    if (!cragDetails) {
        return notFound();
    }

    console.log("Subarea", cragDetails);

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
            />
        </main>
    );
};