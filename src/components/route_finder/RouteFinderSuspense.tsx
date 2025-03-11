import { Suspense } from 'react';
import RouteFinder from '@/components/route_finder/RouteFinder';

export default function RouteFinderWithSuspense() {
    return (
        <Suspense fallback={<div>Loading Route Finder...</div>}>
            <RouteFinder />
        </Suspense>
    );
}