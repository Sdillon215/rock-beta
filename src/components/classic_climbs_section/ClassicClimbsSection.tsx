import ClassicClimbsList from "@/components/classic_climbs_list/ClassicClimbsList";

export default function ClassicClimbsSection() {
    return (
        <section className="max-w-screen-xl md:mx-auto w-full grid grid-cols-2 md:grid-cols-3 gap-y-4 md:gap-4">
            <div className="col-span-2">
                <ClassicClimbsList />
            </div>
            <div className="grid grid-cols-1 gap-y-4 place-content-start col-span-2 md:col-span-1">
                <div>
                    <div className="border-b-4 border-blue-900">
                        <h1 className="text-lg font-bold pl-2">Latest Climbing News</h1>
                    </div>
                    <div className="flex flex-row bg-gray-200 p-2">
                        <h4 className="">Jan 14</h4>
                        <h4 className="pl-2 font-semibold">New route in Yosemite</h4>
                    </div>
                    <div className="flex flex-row bg-gray-200 p-2">
                        <h4 className="">Jan 20</h4>
                        <h4 className="pl-2 font-semibold">Local dirtbag crushes proj</h4>
                    </div>
                    <div className="flex flex-row bg-gray-200 p-2">
                        <h4 className="">Dec 12</h4>
                        <h4 className="pl-2 font-semibold">Are your climbing shoes to tight? YES!</h4>
                    </div>
                    <div className="flex flex-row bg-gray-200 p-2">
                        <h4 className="">Feb 1</h4>
                        <h4 className="pl-2 font-semibold">Climbers stop mining landgrabs</h4>
                    </div>
                </div>
                <div>
                    <div className="border-b-4 border-blue-900">
                        <h1 className="text-lg font-bold pl-2">Trending Forums</h1>
                    </div>
                    <div className="flex flex-row items-center bg-gray-200 p-2">
                        <p className="text-sm">Oct 17</p>
                        <h4 className="px-2 font-semibold">Chopped bolts on classic</h4>
                        <p className="text-xs">87 posts</p>
                    </div>
                    <div className="flex flex-row items-center bg-gray-200 p-2">
                        <h4 className="text-sm">Aug 25</h4>
                        <h4 className="px-2 font-semibold">Educate yourselves gym climbers!</h4>
                    </div>
                    <div className="flex flex-row items-center bg-gray-200 p-2">
                        <h4 className="text-sm">May 8</h4>
                        <h4 className="px-2 font-semibold">Is #vanlife killing dirtbag culture</h4>
                        <p className="text-xs">364 posts</p>
                    </div>
                    <div className="flex flex-row items-center bg-gray-200 p-2">
                        <h4 className="text-sm">Jun 29</h4>
                        <h4 className="px-2 font-semibold">Please don&apos;t play music at the crag</h4>
                        <p className="text-xs">947 posts</p>
                    </div>
                </div>
            </div>
        </section>
    );
}