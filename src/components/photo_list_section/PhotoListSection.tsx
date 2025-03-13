"use client";

import { useState } from "react";
import { BlobImageData } from "@/graphql/types";
import Image from "next/image";

interface PhotoListSectionProps {
    images: BlobImageData[];
}

export default function PhotoListSection({ images }: PhotoListSectionProps) {
    const [selectedImage, setSelectedImage] = useState<BlobImageData | null>(null);

    return (
        <section className="mx-auto">
            <div className="border-b-4 border-blue-900">
                <h1 className="text-lg font-bold pl-2">Photos</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-200">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="relative w-[35vw] h-[35vw] md:w-[25vh] md:h-[25vh] max-h-[225px] mx-2 aspect-square cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                    >
                        <Image
                            src={image.image_url}
                            alt={image.caption}
                            fill
                            placeholder="blur"
                            blurDataURL={image.blur_data_url}
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1000px) 60vw, 33vw"
                            className="object-cover object-center"
                        />
                    </div>
                ))}
            </div>
            {selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 p-4 z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative h-[35vh] md:max-w-3xl 3xl:max-w-screen-lg w-full md:h-full lg:max-h-[60vh]">
                        <Image
                            src={selectedImage.image_url}
                            alt={selectedImage.caption}
                            fill
                            placeholder="blur"
                            blurDataURL={selectedImage.blur_data_url}
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1000px) 60vw, 33vw"
                            className="object-cover w-full h-full rounded-lg"
                        />
                        <button
                            className="absolute top-4 right-4 text-white text-2xl font-bold"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </button>
                        <p className="absolute bottom-4 left-4 text-white text-center mt-2">{selectedImage.caption}</p>
                    </div>
                </div>
            )}
        </section>
    );
}