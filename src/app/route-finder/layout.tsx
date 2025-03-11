import { Suspense } from 'react';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Suspense fallback={<div className="mx-auto my-auto">Loading...</div>}>
                {children}
            </Suspense>
        </main>
    );
}
