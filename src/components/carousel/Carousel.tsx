'use client';

import { useState, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import Scarface from '../../../public/hero_images/scarface_indian_creek.jpg';
import KnottyTower from '../../../public/hero_images/knotty_tower.jpg';
import Ballad from '../../../public/hero_images/country_western_ballad.jpg';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { BlobImageData } from '@/graphql/types';

type Slide = {
    caption: string;
    image_url: StaticImageData;
    linkUrl: string;
};

const defaultSlides: Slide[] = [
    {
        caption: "Scarface 5.11a/b",
        image_url: Scarface,
        linkUrl: "#"
    },
    {
        caption: "Knotty Tower 5.9",
        image_url: KnottyTower,
        linkUrl: "#"
    },
    {
        caption: "Country Western Ballad 5.11c",
        image_url: Ballad,
        linkUrl: "#"
    }
];

export default function Carousel({ imageData }: { imageData?: BlobImageData[] }) {
    const slides = imageData && imageData.length > 0 ? imageData : defaultSlides;
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

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
                    className={`absolute h-full w-full transition-opacity duration-1000 ${index === currentSlide ? 'z-10 opacity-100' : 'z-0 opacity-0'
                        }`}
                >
                    <Image
                        src={slide.image_url}
                        alt={slide.caption}
                        fill={true}
                        placeholder='blur'
                        blurDataURL='https://iqps8tvf9cebkyhe.public.blob.vercel-storage.com/blur-Hu2CtV1lHj0PnWysockJBg5neVL7Xx.png'
                        sizes="(max-width: 768px) 100vw, (max-width: 1000px) 60vw, 33vw"
                        className="object-cover object-center"
                    />
                    <div className="absolute left-2 bottom-2 rounded-md bg-gray-800 py-1 px-2">
                        <h4 className="text-sm text-white">{slide.caption}</h4>
                    </div>
                </div>
            ))}
            {slides.length > 1 && (
                <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2 transform">
                    <button
                        onClick={goToPreviousSlide}
                        className="rounded-md bg-gray-800 p-2 backdrop-blur hover:bg-opacity-75"
                    >
                        <ArrowLeftIcon className="h-5 text-white" />
                    </button>
                </div>
            )}
            {slides.length > 1 && (
                <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2 transform">
                    <button
                        onClick={goToNextSlide}
                        className="rounded-md bg-gray-800 p-2 backdrop-blur hover:bg-opacity-75"
                    >
                        <ArrowRightIcon className="h-5 text-white" />
                    </button>
                </div>
            )}
        </div>
    );
}