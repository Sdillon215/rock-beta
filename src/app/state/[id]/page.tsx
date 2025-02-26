import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchStateDetails } from '@/lib/data/queries';
import AreaPage from '@/components/area_page/AreaPage';

export const metadata: Metadata = {
    title: 'State Page',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const stateDetails = await fetchStateDetails(id);
    if (!stateDetails) {
        return notFound();
    };

    return (
        <main className="grid gap-4 max-w-screen-xl mx-auto md:py-4">
            <AreaPage
                area={stateDetails}
                childAreas={stateDetails.subareas}
                childPath="/subarea"
            />
        </main>
    );
};