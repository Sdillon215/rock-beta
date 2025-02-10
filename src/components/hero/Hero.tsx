import Carousel from "@/components/carousel/Carousel";

export default function Hero() {
    return (
        <section className="grid grid-col-3 md:grid-flow-col md:grid-rows-4 gap-4 h-screen md:h-[65vh] p-4">
            <div className="col-span-3 row-span-2 md:row-span-4">
                <Carousel />
            </div>
            <div className="bg-blue-700 col-span-3 md:row-span-1">02</div>
            <div className="bg-green-800 col-span-3 md:row-span-3">03</div>
        </section>
    );
}