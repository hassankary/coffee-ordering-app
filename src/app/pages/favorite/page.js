"use client";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import {
  HeartIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const page = "Favorite";

export default function Favorite() {
  const [dataMenu, setDataMenu] = useState([]);

  const getDataMenu = async () => {
    const request = await fetch(`http://localhost:4000/menu`);
    const response = await request.json();

    setDataMenu(response);
  };

  useEffect(() => {
    getDataMenu();
  }, []);

  console.log({ dataMenu });

  return (
    <div className="flex w-full justify-center">
      <div className="w-[414px] font-sans">
        {/* ============ HEADER ============ */}
        <Header page={page} />
        <div className="w-full p-3 mt-[51px] pb-[52px] bg-[#FFFFFF] space-y-3">
          <div className="z-10 grid grid-cols-1 gap-2 ">
            <div className="grid grid-cols-2 gap-3">
              {/* ===== Order Cards ===== */}
              {dataMenu.map((data, idx) => {
                return data.favorite ? (
                  <div
                    key={idx}
                    className="flex flex-col bg-[#FFFFFF] rounded-md shadow-lg"
                  >
                    <div
                      className={
                        data.favorite
                          ? "z-10 p-2 -mb-10"
                          : "hidden z-10 p-2 -mb-10"
                      }
                    >
                      <HeartIcon className="float-right w-6 h-6 fill-red-600" />
                    </div>
                    <div>
                      <Image
                        className="rounded-t-xl"
                        src={data.pic}
                        width={200}
                        height={200}
                        alt="product image"
                        quality={100}
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <h1 className="text-[#333736]">{data.name}</h1>
                      <div className="flex flex-row justify-between">
                        <h1 className="flex text-sm items-center text-[#008C4D]">
                          Rp{" "}
                          {data.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </h1>
                        <div className="flex flex-row space-x-2">
                          <button
                            id={data.id}
                            // onClick={reduceItem}
                            className="flex w-[25px] h-[25px] justify-center items-center"
                          >
                            <MinusCircleIcon className=" fill-[#EAB968] hover:fill-[#e4ad54] transition" />
                          </button>
                          <p className="flex text-sm text-black items-center">
                            {data.amount}
                          </p>
                          <button
                            id={data.id}
                            // onClick={addItem}
                            className="flex w-[25px] h-[25px] justify-center items-center rounded-full transition "
                          >
                            <PlusCircleIcon className=" fill-[#EAB968] hover:fill-[#e4ad54] transition" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
