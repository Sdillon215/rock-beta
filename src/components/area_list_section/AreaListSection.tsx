import { Suspense } from "react";
import AreaList from "@/components/area_list/AreaList";

export default async function AreaListSection() {

    return (
        <section className="max-w-screen-xl md:mx-auto w-full mb-4">
            <div className="border-b-4 border-blue-900">
                <h1 className="text-lg font-bold pl-2">Climbing Areas</h1>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <AreaList />
            </Suspense>
        </section>
    );
}