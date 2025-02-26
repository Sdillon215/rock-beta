import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchSubareaDetails } from '@/lib/data/queries';
import AreaPage from '@/components/area_page/AreaPage';

export const metadata: Metadata = {
    title: 'Subarea Page',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const subareaDetails = await fetchSubareaDetails(id);
    if (!subareaDetails) {
        return notFound();
    }

    console.log("Subarea", subareaDetails);

    return (
        <main className="grid gap-4 max-w-screen-xl mx-auto md:py-4">
            <AreaPage
                area={subareaDetails}
                parentPaths={
                    [
                        {
                            pathName: subareaDetails.state.name,
                            path: `/state/${subareaDetails.state.id}`
                        }
                    ]
                }
                childAreas={subareaDetails.crags}
                childPath="/crag"
            />
        </main>
    );
};