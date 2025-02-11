'use client';

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import Scarface from '../../../public/hero_images/scarface_indian_creek.jpg';
import KnottyTower from '../../../public/hero_images/knotty_tower.jpg';
import Ballad from '../../../public/hero_images/country_western_ballad.jpg';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

type Slide = {
    title: string;
    description: string;
    // TODO: change to imageUrl type once images are pulled from google storage
    imageData: StaticImageData;
    linkUrl: string;
};

const slides: Slide[] = [
    {
        title: "Scarface 5.11a/b",
        description: "Climber on Scarface",
        imageData: Scarface,
        linkUrl: "#"
    },
    {
        title: "Knotty Tower 5.9",
        description: "Climber on desert tower",
        imageData: KnottyTower,
        linkUrl: "#"
    },
    {
        title: "Country Western Ballad 5.11c",
        description: "Climber on granite arete",
        imageData: Ballad,
        linkUrl: "#"
    }
];

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const goToPreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    return (
        <div className="relative h-full overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute left-0 top-0 h-full w-full transition-opacity duration-1000 ${index === currentSlide ? 'z-10 opacity-100' : 'z-0 opacity-0'
                        }`}
                >
                    <Image
                        src={slide.imageData}
                        alt={slide.title}
                        fill={true}
                        placeholder="blur"
                        className="object-cover object-center"
                    />
                    <div className="absolute left-2 bottom-2 rounded-md bg-gray-800 py-1 px-2">
                        <h4 className="text-sm text-white">{slide.title}</h4>
                    </div>
                </div>
            ))}
            <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2 transform">
                <button
                    onClick={goToPreviousSlide}
                    className="rounded-md bg-gray-800 p-2 backdrop-blur hover:bg-opacity-75"
                >
                    <ArrowLeftIcon className="h-5 text-white" />
                </button>
            </div>
            <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2 transform">
                <button
                    onClick={goToNextSlide}
                    className="rounded-md bg-gray-800 p-2 backdrop-blur hover:bg-opacity-75"
                >
                    <ArrowRightIcon className="h-5 text-white" />
                </button>
            </div>
        </div>
    );
}