import Image from "next/image";

export default function Home() {
  return (
    <section className="grid grid-flow-col grid-rows-3 gap-4 h-screen p-4">
      <div className="bg-red-800 row-span-3">01</div>
      <div className="bg-blue-700 col-span-2 row-span-2">02</div>
      <div className="bg-green-800 col-span-2">03</div>
    </section>
  );
}
