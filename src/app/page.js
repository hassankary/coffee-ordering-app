"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiSolidShoppingBag } from "react-icons/bi";
import { SiAdblock } from "react-icons/si";

export default function Home() {
  const [alert, setAlert] = useState(false);

  const modalRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        setAlert(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <>
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
            <div
              ref={modalRef}
              className="flex flex-col justify-end items-end space-y-2"
            >
              {alert && (
                <div className="px-2 py-1 mr-1 text-xs text-center rounded-lg text-red-700 font-bold bg-black transition-all">
                  <h1 className="animate-pulse">Administrator page is currently under maintenance.</h1>
                </div>
              )}
              <button
                onClick={() => setAlert(true)}
                className="flex w-fit justify-center items-center px-3 py-1.5 font-bold space-x-2 bg-[#EAB968] hover:bg-[#e1ac57] active:scale-110 rounded-tl-xl transition-all"
              >
                <SiAdblock />
                <h1>Admin</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
