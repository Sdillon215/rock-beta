type SubArea = {
    name: string;
    numberOfRoutes: number;
};

type Area = {
    name: string;
    numberOfRoutes: number;
    subAreas: SubArea[];
};

const climbingAreas: Area[] = [
    {
        name: "Alabama",
        numberOfRoutes: 2215,
        subAreas: [
            { name: "Cherokee Rock Village (Sand Rock)", numberOfRoutes: 234 },
            { name: "Jamestown", numberOfRoutes: 50 },
            { name: "Palisades Park", numberOfRoutes: 61 },
            { name: "Horse Pens 40", numberOfRoutes: 396 },
        ],
    },
    {
        name: "Alaska",
        numberOfRoutes: 2575,
        subAreas: [
            { name: "Anchorage & South Central Alaska Ice", numberOfRoutes: 233 },
            { name: "Denali National Park", numberOfRoutes: 85 },
            { name: "Seward Highway", numberOfRoutes: 352 },
        ],
    },
    {
        name: "Arizona",
        numberOfRoutes: 13953,
        subAreas: [
            { name: "Cochise Stronghold", numberOfRoutes: 769 },
            { name: "Sedona Area", numberOfRoutes: 588 },
            { name: "Paradise Forks", numberOfRoutes: 153 },
            { name: "Winslow Wall", numberOfRoutes: 118 },
            { name: "Mount Lemmon (Santa Catalina Mountains)", numberOfRoutes: 3182 },
        ],
    },
    {
        name: "Arkansas",
        numberOfRoutes: 3374,
        subAreas: [
            { name: "Sam's Throne & Surroundings", numberOfRoutes: 501 },
            { name: "Horseshoe Canyon Ranch", numberOfRoutes: 749 },
        ],
    },
    {
        name: "California",
        numberOfRoutes: 44323,
        subAreas: [
            { name: "Joshua Tree National Park", numberOfRoutes: 7583 },
            { name: "Lover's Leap", numberOfRoutes: 199 },
            { name: "Tahquitz & Suicide Rocks", numberOfRoutes: 671 },
            { name: "High Sierra", numberOfRoutes: 601 },
            { name: "Eastern Sierra", numberOfRoutes: 6522 },
            { name: "Lake Tahoe", numberOfRoutes: 4196 },
            { name: "Yosemite National Park", numberOfRoutes: 2936 },
            { name: "Southern Sierra - The Needles, Kern River, Domelands, etc.", numberOfRoutes: 561 },
            { name: "Owens River Gorge", numberOfRoutes: 1056 },
            { name: "Southern-Western Sierra", numberOfRoutes: 1655 },
        ],
    },
    {
        name: "Colorado",
        numberOfRoutes: 36268,
        subAreas: [
            { name: "Boulder Canyon", numberOfRoutes: 1897 },
            { name: "Lumpy Ridge", numberOfRoutes: 414 },
            { name: "Eldorado Canyon State Park", numberOfRoutes: 1272 },
            { name: "Shelf Road", numberOfRoutes: 1292 },
            { name: "Rifle Mountain Park", numberOfRoutes: 486 },
            { name: "RMNP - Rock", numberOfRoutes: 624 },
            { name: "Alpine Rock", numberOfRoutes: 1358 },
            { name: "Flatirons", numberOfRoutes: 1427 },
            { name: "South Platte", numberOfRoutes: 3586 },
            { name: "Grand Junction Area", numberOfRoutes: 3945 },
        ],
    },
];

export default function AreaListSection() {
    return (
        <section className="max-w-screen-xl md:mx-auto w-full">
            <div className="border-b-4 border-blue-900">
                <h1 className="text-lg font-bold pl-2">Climbing Areas</h1>
            </div>
            <div className="grid md:grid-cols-3">
                {climbingAreas.map((area) => (
                    <div key={area.name} className="col-span-1 flex flex-col p-2 bg-gray-200">
                        <div className="flex flex-row justify-between border-b-2 border-blue-900">
                            <h3 className="font-bold">{area.name}</h3>
                            <p>{area.numberOfRoutes}</p>
                        </div>
                        <div className="flex flex-col">
                            {area.subAreas.map((subArea) => (
                                <div key={subArea.name} className="flex justify-between">
                                    <p>{subArea.name}</p>
                                    <p>{subArea.numberOfRoutes}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}