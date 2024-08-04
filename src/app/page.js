"use client";
import Image from "next/image";
import Link from "next/link";
import { BiSolidShoppingBag } from "react-icons/bi";
import { SiAdblock } from "react-icons/si";

export default function Home() {
  return (
    <>
      <title>Coffee Ordering Mobile Web by Hassan Kaeru</title>
      <div className=" w-full flex justify-center">
        <div className="flex flex-col justify-center min-h-screen w-[414px] bg-green-500 content-center">
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
          <div className="flex flex-col items-center justify-center mt-[90px]">
            <Link
              href={"./pages/order"}
              className="p-5 bg-black text-black font-bold hover:bg-[#EAB968] hover:scale-110 active:scale-110 rounded-full transition-all duration-300"
            >
              <h1 className="bg-white hover:text-white hover:bg-black rounded-full p-2 transition-all duration-300">
                <BiSolidShoppingBag className="h-[40px] w-[40px]" />
              </h1>
            </Link>
          </div>
          <div className="fixed flex w-full max-w-[414px] justify-end bottom-0">
            <button className="flex justify-center items-center px-3 py-1.5 font-bold space-x-2 bg-[#EAB968] hover:bg-[#e1ac57] active:scale-110 rounded-tl-xl transition-all">
              <SiAdblock/>
              <h1>Admin</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
