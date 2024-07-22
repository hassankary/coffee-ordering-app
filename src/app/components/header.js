"use client";
import {
  ArrowLeftIcon,
  Bars4Icon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function Header({ page }) {
  const router = useRouter();

  return (
    <div className="z-50 fixed w-[414px] h-[52px] grid grid-cols-3 px-3 py-3 justify-between text-[#333736] text-lg font-semibold bg-[#FFFFFF] shadow-sm">
      <div className="flex items-center ">
        <button
          onClick={
            page == "Order"
              ? () => router.push("/")
              : () => router.push("/pages/order")
          }
          className="h-[26px] w-[26px] fill-[#333736] "
        >
          {page == "Order" ? (
            <Bars4Icon className="fill-[#333736]" />
          ) : (
            <ArrowLeftIcon className="fill-[#333736]" />
          )}
        </button>
      </div>
      <h1 className="flex justify-center">{page}</h1>
      <div className="flex justify-end items-center space-x-5">
        <button
          onClick={() => router.push("/pages/favorite")}
          className="h-[25px] w-[25px] "
        >
          <HeartIcon className="fill-[#333736]" />
        </button>
        <button
          onClick={() => router.push("/pages/cart")}
          className="h-[25px] w-[25px]"
        >
          <ShoppingCartIcon className="fill-[#333736]" />
        </button>
      </div>
    </div>
  );
}
