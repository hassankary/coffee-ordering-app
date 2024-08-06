"use client";
import { motion as m } from "framer-motion";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

export const Footer = ({ onClick, totalPrice, page }) => {
  return (
    <div className="z-50 flex justify-center fixed left-0 right-0 bottom-0 font-semibold active:-translate-y-[2px] transition-all">
      <m.button
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.2, ease: "easeIn" }}
        onClick={onClick}
        className="w-[414px] flex justify-around items-center p-3 rounded-t-full overflow-hidden bg-green-600 hover:bg-green-700 active:bg-green-500 text-center transition-all"
      >
        {page == 2 && totalPrice.length != 0 ? (
          <>
            <span className="w-5">{""}</span>
            <m.span
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-row items-center text-white animate-pulse transition-all"
            >
              Checkout Now!
            </m.span>
            <span className="">
              <HiOutlineChevronDoubleRight className="flex w-5 h-5 text-white fill-white duration-400 animate-pulse" />
            </span>
          </>
        ) : (
          <div className="flex justify-around w-full">
            <m.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className=" bg-green-500 rounded-full w-6 h-6 text-white fill-white duration-400 animate-pulse"
            >
              {totalPrice.length}
            </m.span>
            <m.span
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className=""
            >
              Total Rp{" "}
              {totalPrice.amount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </m.span>
            <span className="flex justify-center items-center">
              <HiOutlineChevronDoubleRight className="flex w-5 h-5 duration-400 animate-pulse" />
            </span>
          </div>
        )}
      </m.button>
    </div>
  );
};
