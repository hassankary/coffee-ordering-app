"use client";
import {
  HeartIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

export const MenuCards = ({
  onClickMinus,
  onClickPlus,
  data
}) => {
  return (
    <div className="flex flex-col bg-[#FFFFFF] rounded-xl shadow-lg">
      {data.favorite && (
        <div className="z-10 p-2 -mb-10">
          <HeartIcon className="float-right w-6 h-6 fill-red-600" />
        </div>
      )}
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
      <div className="p-4 font-medium">
        <h1 className="text-[#333736]">{data.name}</h1>
        <div className="flex flex-row flex-wrap justify-between">
          <h1 className="flex text-sm items-center text-[#008C4D]">
            Rp {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </h1>
          <div className="flex flex-row space-x-1.5">
            <button
              id={data.id}
              onClick={onClickMinus}
              className="flex w-[25px] h-[25px] bg-[#EAB968] justify-center items-center rounded-full transition"
            >
              <HiOutlineMinus />
            </button>
            <p className="flex text-sm text-black items-center">{data.amount}</p>
            <button
              id={data.id}
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
