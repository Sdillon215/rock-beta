import Link from "next/link";

type SubNavPageProps = {
    parentPaths?: { pathName: string; path: string }[];
    currentName: string;
};

export default function SubNav({ parentPaths, currentName }: SubNavPageProps) {
    return (
        <span className="flex flex-row flex-wrap">
        <Link href={`/state`}>
            <p className="pr-1 text-blue-900 hover:text-blue-700 text-nowrap">All Areas &gt;</p>
        </Link>
        {parentPaths && parentPaths.length > 0 && (
            <>
                {parentPaths.map((parent) => (
                    <Link href={parent.path} key={parent.path}>
                        <p className="pr-1 text-blue-900 hover:text-blue-700 text-nowrap">{parent.pathName} &gt;</p>
                    </Link>
                ))}
            </>
        )}
        <p className="pr-1">{currentName}</p>
    </span>
    );
};