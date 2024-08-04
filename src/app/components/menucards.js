"use client";
import { HeartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { FaEye } from "react-icons/fa6";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { IoHeartCircleSharp } from "react-icons/io5";

export const MenuCards = ({
  onClickModal,
  onClickMinus,
  onClickPlus,
  data,
  props,
}) => {
  return (
    <div {...props} className="flex flex-col bg-[#FFFFFF] rounded-xl shadow-lg">
      <div className="flex flex-col group">
        {data?.favorite && (
          <div className="relative -mb-10 self-end w-fit z-10 p-1">
            <IoHeartCircleSharp className="float-right w-8 h-8 fill-red-600" />
          </div>
        )}
        <Image
          id={data?.id}
          onClick={onClickModal}
          className="rounded-t-xl transition-all"
          src={data?.pic}
          width={200}
          height={200}
          alt="product image"
          quality={100}
          unoptimized
        />
        <div onClick={onClickModal} className="flex opacity-0 group-hover:opacity-100 -mt-6 h-6 justify-center items-center text-white bg-black bg-opacity-60 rounded-t-xl transition-all duration-300">
          <FaEye />
        </div>
      </div>
      <div className="p-4 font-semibold overflow-hidden">
        <h1 className="text-[#333736] text-nowrap truncate">{data?.name}</h1>
        <div className="flex flex-row flex-wrap mt-2 justify-between items-center">
          <h1 className="flex text-base items-center font-bold text-green-600">
            {data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </h1>
          <div className={`w-[76px] flex flex-row transition-all`}>
            {data.amount === 0 ? (
              <button
                id={data?.id}
                onClick={(e) => onClickPlus(e, data?.id)}
                className="flex w-full h-[32.6px] border bg-green-600 hover:bg-green-500 active:bg-green-500 justify-center items-center rounded-full transition-all"
              >
                Order
              </button>
            ) : (
              <div className="flex w-full p-[3px] border justify-between rounded-full transition-all">
                <button
                  id={data?.id}
                  onClick={(e) => onClickMinus(e, data?.id)}
                  className="flex w-[25px] h-[25px] bg-green-600 hover:bg-green-500 active:bg-green-500 justify-center items-center rounded-full transition-all"
                >
                  <HiOutlineMinus />
                </button>
                <p className="flex text-sm text-black justify-center items-center">
                  {data?.amount}
                </p>
                <button
                  id={data?.id}
                  onClick={(e) => onClickPlus(e, data?.id)}
                  className="flex w-[25px] h-[25px] bg-green-600 hover:bg-green-500 active:bg-green-500 justify-center items-center rounded-full transition-all"
                >
                  <HiOutlinePlus />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
