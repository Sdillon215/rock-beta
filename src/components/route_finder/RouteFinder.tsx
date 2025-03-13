'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Checkbox } from '@headlessui/react';
import { Select, Field, Label } from '@headlessui/react';
import { ClimbingGrades } from '@/graphql/types';
import { useRouter } from 'next/navigation';

const pitches = [
    { pitches: 1, textValue: '1' },
    { pitches: 2, textValue: '2' },
    { pitches: 3, textValue: '3' },
    { pitches: 4, textValue: '4' },
    { pitches: 5, textValue: '5+' }
];

const ratings = [
    { stars: 1, textValue: '1 Star' },
    { stars: 2, textValue: '2 Stars' },
    { stars: 3, textValue: '3 Stars' },
    { stars: 4, textValue: '4 Stars' }
];

export default function RouteFinder() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getParam = useCallback((key: string, defaultValue: string) => searchParams.get(key) ?? defaultValue, [searchParams]);

    const [selectedGrade, setSelectedGrade] = useState(getParam('grade', '5.1'));
    const [selectedPitches, setSelectedPitches] = useState(getParam('pitches', '1'));
    const [selectedRating, setSelectedRating] = useState(getParam('star_rating', '0'));
    const [tradEnabled, setTradEnabled] = useState(getParam('trad', 'false') === 'true');
    const [sportEnabled, setSportEnabled] = useState(getParam('sport', 'false') === 'true');
    const [topropeEnabled, setTopropeEnabled] = useState(getParam('toprope', 'false') === 'true');

    useEffect(() => {
        setSelectedGrade(getParam('grade', '5.1'));
        setSelectedPitches(getParam('pitches', '1'));
        setSelectedRating(getParam('star_rating', '0'));
        setTradEnabled(getParam('trad', 'false') === 'true');
        setSportEnabled(getParam('sport', 'false') === 'true');
        setTopropeEnabled(getParam('toprope', 'false') === 'true');
    }, [searchParams, getParam]);

    const handleSearch = () => {
        const queryParams = new URLSearchParams({
            grade: selectedGrade,
            pitches: selectedPitches,
            star_rating: selectedRating,
            trad: tradEnabled.toString(),
            sport: sportEnabled.toString(),
            toprope: topropeEnabled.toString()
        }).toString();

        router.push(`/route-finder?${queryParams}`);
    };

    return (
        <div className="grid content-start h-fit w-full md:w-2/3 p-4 bg-gray-700 rounded-md">
            <div className="border-b-[1px]">
                <h1 className="text-2xl font-bold text-white">Route Finder</h1>
            </div>
            <div className="flex justify-between p-2">
                <h2 className="text-xl font-bold text-white">Grade:</h2>
                <Select
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    value={selectedGrade}
                    className="w-16 text-center rounded-md p-1"
                >
                    {Object.values(ClimbingGrades).map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                    ))}
                </Select>
            </div>
            <div className="flex justify-between p-2">
                <h2 className="text-xl font-bold text-white">Pitches:</h2>
                <Select
                    value={selectedPitches}
                    onChange={(e) => setSelectedPitches(e.target.value)}
                    className="w-16 text-center rounded-md p-1"
                >
                    {pitches.map((pitch) => (
                        <option key={pitch.textValue} value={pitch.pitches}>{pitch.textValue}</option>
                    ))}
                </Select>
            </div>
            <div className="flex justify-between p-2">
                <h2 className="text-xl font-bold text-white">Rating:</h2>
                <Select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-24 text-center rounded-md p-1"
                >
                    {ratings.map((rating) => (
                        <option key={rating.textValue} value={rating.stars}>{rating.textValue}</option>
                    ))}
                </Select>
            </div>
            <div className="flex flex-wrap justify-between p-2">
                {[
                    ['Trad', tradEnabled, setTradEnabled],
                    ['Sport', sportEnabled, setSportEnabled],
                    ['Toprope', topropeEnabled, setTopropeEnabled]
                ].map(([label, checked, setChecked]) => (
                    <Field key={label as string} className="flex items-center gap-2">
                        <Checkbox
                            checked={Boolean(checked)} // Ensures boolean type
                            onChange={setChecked as (value: boolean) => void} // Type assertion
                            className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                        >
                            <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Checkbox>
                        <Label className="text-white">{label as string}</Label>
                    </Field>
                ))}
            </div>
            <div className="flex justify-center p-2">
                <button
                    className='text-gray-800 bg-gray-200 hover:bg-gray-300 hover:text-black rounded-md px-3 py-2 text-sm font-medium w-24'
                    onClick={handleSearch}
                >
                    Get Beta
                </button>
            </div>
        </div>
    );
};
