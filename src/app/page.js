"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  
  return (
    <div className=" w-full flex justify-center">
      <div className="min-h-screen w-[414px] bg-[#008C4D] content-center">
        <div className="flex justify-center ">
          <Image
                src={"/./logo.svg"}
                width={200}
                height={200}
                alt="coffee company logo"
                quality={100}
                unoptimized
              />
        </div>
        <div className="flex justify-center mt-[90px]">
          <Link href={"./order"} className="px-3 py-2 bg-[#EAB968] hover:font-bold hover:bg-[#e9ae50] rounded-lg transition">Login</Link>
        </div>
      </div>
    </div>
  );
}
