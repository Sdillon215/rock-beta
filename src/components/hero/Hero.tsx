import Carousel from "@/components/carousel/Carousel";
import RouteFinder from "@/components/route_finder/RouteFinder";
export default function Hero() {
    return (
        <section className="bg-gray-800">
            <div className="grid grid-rows-10 md:grid-rows-3 md:grid-cols-7 gap-4 h-screen md:h-[65vh] p-4 max-w-screen-2xl mx-auto">
                <div className="row-span-5 md:col-span-4 md:row-span-3">
                    <Carousel />
                </div>
                <div className="flex items-center justify-center row-span-1 md:col-span-3 border-b-[1px]">
                    <div className="text-center">
                        <h1 className=" text-2xl md:text-4xl font-bold text-white">Beta For Any Route</h1>
                        <p className=" text-white">123,456 routes and counting</p>
                    </div>
                </div>
                <div className="row-span-4 md:col-span-3 md:row-span-2">
                    <RouteFinder />
                </div>
            </div>
        </section>
    );
}