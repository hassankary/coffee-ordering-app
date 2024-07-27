"use client";
import {
  ArrowLeftIcon,
  Bars4Icon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Dropdown } from "flowbite-react";
import {
  HiHeart,
  HiLogout,
  HiShoppingCart,
  HiViewGrid,
} from "react-icons/hi";

export default function Header({
  page,
  onClickOrder,
  onClickFavorite,
  onClickCart,
}) {
  const router = useRouter();

  const buttonMenu = [
    { icon: <HeartIcon />, function: onClickFavorite },
    { icon: <ShoppingCartIcon />, function: onClickCart },
  ];

  const buttonDropdown = [
    { name: "Order", icon: HiViewGrid, function: onClickOrder },
    { name: "Favorite", icon: HiHeart, function: onClickFavorite },
    { name: "Cart", icon: HiShoppingCart, function: onClickCart },
    { name: "Divider", icon: "", function: "" },
    { name: "Logout", icon: HiLogout, function: () => router.push("/") },
  ];

  return (
    <div className="z-50 top-0 fixed w-full max-w-[414px] h-[52px] grid grid-cols-3 px-3 py-3 justify-between text-[#333736] text-lg font-semibold bg-[#FFFFFF] shadow-sm">
      <div className="flex items-center ">
        {page == "Order" ? (
          <Dropdown
            placement="bottom"
            renderTrigger={() => (
              <span>
                <Bars4Icon className="h-[26px] w-[26px] fill-[#333736] transition-all" />
              </span>
            )}
          >
            {buttonDropdown.map((data, idx) => {
              if (data.name !== "Divider") {
                return (
                  <Dropdown.Item
                    key={idx}
                    icon={data.icon}
                    as="button"
                    onClick={data.function}
                  >
                    {data.name}
                  </Dropdown.Item>
                );
              } else {
                return <Dropdown.Divider key={idx} />;
              }
            })}
          </Dropdown>
        ) : (
          <button
            onClick={onClickOrder}
            className="h-[26px] w-[26px] fill-[#333736]"
          >
            <ArrowLeftIcon className="fill-[#333736] transition-all" />
          </button>
        )}
      </div>
      <button className="flex justify-center" onClick={onClickOrder}>
        {page}
      </button>
      <div className="flex justify-end items-center space-x-5">
        {buttonMenu.map((data, idx) => {
          return (
            <button
              key={idx}
              onClick={data.function}
              className="h-[25px] w-[25px] "
            >
              {data.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}
