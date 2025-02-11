'use client';

import { useState } from 'react'
import { Checkbox } from '@headlessui/react'
import { Select, Field, Label } from "@headlessui/react";

type RouteGrade = {
    grade: string;
    value: string;
};

type Pitches = {
    pitches: number;
    textValue: string;
};

type Rating = {
    stars: number;
    textValue: string;
};

const grades: RouteGrade[] = [
    { grade: "5.5", value: "5.5" },
    { grade: "5.6", value: "5.6" },
    { grade: "5.7", value: "5.7" },
    { grade: "5.8", value: "5.8" },
    { grade: "5.9", value: "5.9" },
    { grade: "5.10", value: "5.10" },
    { grade: "5.11", value: "5.11" },
    { grade: "5.12", value: "5.12" },
    { grade: "5.13", value: "5.13" },
    { grade: "5.14", value: "5.14" }
];

const pitches: Pitches[] = [
    { pitches: 1, textValue: "1" },
    { pitches: 2, textValue: "2" },
    { pitches: 3, textValue: "3" },
    { pitches: 4, textValue: "4" },
    { pitches: 5, textValue: "5+" }
];

const ratings: Rating[] = [
    { stars: 1, textValue: "1 Star" },
    { stars: 2, textValue: "2 Stars" },
    { stars: 3, textValue: "3 Stars" },
    { stars: 4, textValue: "4 Stars" },
];


export default function RoutFinder() {
    const [tradEnabled, setTradEnabled] = useState(false);
    const [sportEnabled, setSportEnabled] = useState(false);
    const [topropeEnabled, setTopropeEnabled] = useState(false);

    return (
        <div className="grid content-start mx-auto h-full md:w-2/3 p-4 bg-gray-700 rounded-md">
            <div className="border-b-[1px]">
                <h1 className="text-2xl font-bold text-white">Route Finder</h1>
            </div>
            <div className="flex justify-between p-2">
                <h2 className="text-xl font-bold text-white">Grade:</h2>
                <Select name="grade" aria-label="route grade" className="w-16 text-center rounded-md p-1">
                    {grades.map((grade) => (
                        <option key={grade.grade} value={grade.value}>{grade.grade}</option>
                    ))}
                </Select>
            </div>
            <div className="flex justify-between p-2">
                <h2 className="text-xl font-bold text-white">Pitches:</h2>
                <Select name="grade" aria-label="route grade" className="w-16 text-center rounded-md p-1">
                    {pitches.map((pitch) => (
                        <option key={pitch.pitches} value={pitch.textValue}>{pitch.textValue}</option>
                    ))}
                </Select>
            </div>
            <div className="flex justify-between p-2">
                <h2 className="text-xl font-bold text-white">Rating:</h2>
                <Select name="grade" aria-label="route grade" className="w-24 text-center rounded-md p-1">
                    {ratings.map((rating) => (
                        <option key={rating.textValue} value={rating.textValue}>{rating.textValue}</option>
                    ))}
                </Select>
            </div>
            <div className="flex justify-between p-2 px-12">
                <Field className="flex items-center gap-2">
                    <Checkbox
                        checked={tradEnabled}
                        onChange={setTradEnabled}
                        className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                    >
                        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Checkbox>
                    <Label className="text-white">Trad</Label>
                </Field>
                <Field className="flex items-center gap-2">
                    <Checkbox
                        checked={sportEnabled}
                        onChange={setSportEnabled}
                        className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                    >
                        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Checkbox>
                    <Label className="text-white">Sport</Label>
                </Field>
                <Field className="flex items-center gap-2">
                    <Checkbox
                        checked={topropeEnabled}
                        onChange={setTopropeEnabled}
                        className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                    >
                        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Checkbox>
                    <Label className="text-white">Toprope</Label>
                </Field>
            </div>
            <div className="flex justify-center p-2">
                <button
                    className='text-gray-800 bg-gray-200 hover:bg-gray-300 hover:text-black rounded-md px-3 py-2 text-sm font-medium w-24'

                >
                    Get Beta
                </button>
            </div>
        </div>
    );
}