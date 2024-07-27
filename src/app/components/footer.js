"use client";
import {
  HeartIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  HiOutlineChevronDoubleRight,
  HiOutlineMinus,
  HiOutlinePlus,
} from "react-icons/hi";

export const Footer = ({onClick, totalPrice }) => {
  return (
    <div className="z-50 flex justify-center fixed left-0 right-0 bottom-0 font-semibold">
      <button
        onClick={onClick}
        className="w-[414px] flex justify-around items-center p-2 rounded-t-lg bg-green-600 text-center"
      >
        <span className=" bg-green-500 rounded-full w-6 h-6 duration-400 animate-pulse">
          {totalPrice.length}
        </span>
        <span className="animate-pulse">
          Total Rp{" "}
          {totalPrice.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        </span>
        <span className="flex justify-center items-center">
          <HiOutlineChevronDoubleRight className="flex w-5 h-5 duration-400 animate-pulse" />
        </span>
      </button>
    </div>
  );
};
