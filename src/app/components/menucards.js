"use client";

import { HeartIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export const MenuCards = ({key, onClickMinus, onClickPlus, id, dataFavorite, src, dataPrice, dataName, dataAmount}) => {
  return (
    <div key={key} className="flex flex-col bg-[#FFFFFF] rounded-md shadow-lg">
      <div
        className={{dataFavorite} ? "z-10 p-2 -mb-10" : "hidden z-10 p-2 -mb-10"}
      >
        <HeartIcon className="float-right w-6 h-6 fill-red-600" />
      </div>
      <div>
        <Image
          className="rounded-t-xl"
          src={src}
          width={200}
          height={200}
          alt="product image"
          quality={100}
          unoptimized
        />
      </div>
      <div className="p-4 font-medium">
        <h1 className="text-[#333736]">{dataName}</h1>
        <div className="flex flex-row justify-between">
          <h1 className="flex text-sm items-center text-[#008C4D]">
            Rp {dataPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </h1>
          <div className="flex flex-row space-x-2">
            <button
              id={id}
              onClick={onClickMinus}
              className="flex w-[25px] h-[25px] fill-[#EAB968] justify-center items-center"
            >
              <MinusCircleIcon className=" fill-[#EAB968] hover:fill-[#e4ad54] transition" />
            </button>
            <p className="flex text-sm text-black items-center">
              {dataAmount}
            </p>
            <button
              id={id}
              onClick={onClickPlus}
              className="flex w-[25px] h-[25px] fill-[#EAB968] justify-center items-center rounded-full transition "
            >
              <PlusCircleIcon className=" fill-[#EAB968] hover:fill-[#e4ad54] transition" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
