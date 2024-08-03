"use client";
import Image from "next/image";
import Link from "next/link";
import { BiSolidShoppingBag } from "react-icons/bi";

export default function Home() {
  return (
    <>
      <title>Coffee Ordering Mobile Web by Hassan Kaeru</title>
      <div className=" w-full flex justify-center">
        <div className="min-h-screen w-[414px] bg-green-500 content-center">
          <div className="flex justify-center ">
            <Image
              src={"/./logo.svg"}
              width={200}
              height={200}
              alt="coffee company logo"
              quality={100}
              unoptimized
              priority
            />
          </div>
          <div className="flex justify-center mt-[90px]">
            <Link
              href={"./pages/order"}
              className="p-5 bg-black text-black font-bold hover:bg-[#EAB968] hover:scale-110 active:scale-110 rounded-full transition-all duration-300"
            >
              <h1 className="bg-white hover:text-white hover:bg-black rounded-full p-2 transition-all duration-300">
                <BiSolidShoppingBag className="h-[40px] w-[40px]" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
