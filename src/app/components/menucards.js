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
  props
}) => {
  return (
    <div {...props} className="flex flex-col bg-[#FFFFFF] rounded-xl shadow-lg">
      {data?.favorite && (
        <div className="z-10 p-1 -mb-10">

          <IoHeartCircleSharp className="float-right w-8 h-8 fill-red-600" />
          {/* <BsFillBookmarkHeartFill className="float-right w-8 h-8 fill-red-700" /> */}
          {/* <HeartIcon className="float-right w-6 h-6 fill-red-600" /> */}
        </div>
      )}
      <div className="flex flex-col group">
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
        <div className="flex opacity-0 group-hover:opacity-100 -mt-6 h-6 justify-center items-center text-white bg-black bg-opacity-60 rounded-t-xl transition-all duration-300">
          <FaEye />
        </div>
      </div>
      <div className="p-4 font-medium">
        <h1 className="text-[#333736]">{data?.name}</h1>
        <div className="flex flex-row flex-wrap justify-between items-center">
          <h1 className="flex text-sm items-center text-[#008C4D]">
            Rp {data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </h1>
          <div className=" w-[70px] flex flex-row justify-between">
            <button
              id={data?.id}
              onClick={(e) => onClickMinus(e, data?.id)}
              className="flex w-[25px] h-[25px] bg-[#EAB968] hover:bg-[#f5c16f] active:bg-[#cda15a] justify-center items-center rounded-full transition-all"
            >
              <HiOutlineMinus />
            </button>
            <p className="flex text-sm text-black justify-center items-center">
              {data?.amount}
            </p>
            <button
              id={data?.id}
              onClick={(e) => onClickPlus(e, data?.id)}
              className="flex w-[25px] h-[25px] bg-[#EAB968] hover:bg-[#f5c16f] active:bg-[#cda15a] justify-center items-center rounded-full transition-all"
            >
              <HiOutlinePlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
