"use client";
import {
  HeartIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

export const MenuCards = ({
  onClickMinus,
  onClickPlus,
  id,
  dataFavorite,
  src,
  dataPrice,
  dataName,
  dataAmount,
}) => {
  return (
    <div className="flex flex-col bg-[#FFFFFF] rounded-md shadow-lg">
      {dataFavorite && (
        <div className="z-10 p-2 -mb-10">
          <HeartIcon className="float-right w-6 h-6 fill-red-600" />
        </div>
      )}
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
              className="flex w-[25px] h-[25px] bg-[#EAB968] justify-center items-center rounded-full transition"
            >
              <HiOutlineMinus />
            </button>
            <p className="flex text-sm text-black items-center">{dataAmount}</p>
            <button
              id={id}
              onClick={onClickPlus}
              className="flex w-[25px] h-[25px] bg-[#EAB968] justify-center items-center rounded-full transition"
            >
              <HiOutlinePlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
