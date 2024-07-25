"use client";
import { IconPlus } from "@/app/components/icon/icon";
import {
  Bars4Icon,
  HeartIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import { TabMenu } from "@/app/components/tabmenu";
import { MenuCards } from "@/app/components/menucards";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

const page = "Order";

const menusType = [
  "All",
  "Coffee",
  "Tea",
  "Dessert",
  "Manual Brew",
  "Water",
  "Foods",
];

export default function Order() {
  const [itemsOrder, setItemsOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState({amount: 0, length: 0});
  const [menuCards, setMenuCards] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getDataMenu = async () => {
    const request = await fetch(`http://localhost:4000/menu`);
    const response = await request.json();

    setItemsOrder(response);
    setIsLoading(false);
  };

  useEffect(() => {
    getDataMenu();
  }, []);

  const tabMenu = (e) => {
    e.preventDefault();
    setMenuCards(e.target.id);
  };

  const plusButtonHandler = (e) => {
    e.preventDefault();
    const filteredItems = itemsOrder.map((data, idx) => {
      if (data.id == e.target.id) {
        setTotalPrice({amount: totalPrice.amount + data.price, length: totalPrice.length + 1});
        return { ...data, amount: data.amount + 1 };
      }
      return data;
    });

    setItemsOrder(filteredItems);
  };

  const minusButtonHandler = (e) => {
    e.preventDefault();
    const filteredItems = itemsOrder.map((data, idx) => {
      if (data.id == e.target.id && data.amount > 0) {
        setTotalPrice({amount: totalPrice.amount - data.price, length: totalPrice.length - 1});
        return { ...data, amount: data.amount - 1 };
      }
      return data;
    });
    setItemsOrder(filteredItems);
  };

  console.log("itemsOrder =>", itemsOrder);

  return (
    <>
      <title>Coffee Ordering Mobile Web by Hassan Kaeru</title>
      <div className="flex w-full justify-center">
        <div className="flex max-w-[414px] justify-center font-sans">
          {/* ============ HEADER ============ */}
          <Header page={page} />
          <div className="w-full  min-h-screen  p-3 mt-[51px] pb-[52px] bg-[#FFFFFF] space-y-3">
            {/* =========== Menus Type ========= */}
            <TabMenu
              menusType={menusType}
              menuCards={menuCards}
              onClick={(e) => tabMenu(e)}
            />
            {/* ====== FOOTER (Total Price) ===== */}
            <div className="z-50 flex justify-center fixed left-0 right-0 bottom-0 font-semibold">
              <button className="w-[414px] flex justify-around items-center p-2 rounded-t-lg bg-green-600 text-center">
                <span className=" bg-green-500 rounded-full w-6 h-6 duration-400 animate-pulse">{totalPrice.length}</span>
                <span className="animate-pulse">
                  Total Rp{" "}
                  {totalPrice.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </span>
                <span className="flex justify-center items-center">
                  <HiOutlineChevronDoubleRight className="flex w-5 h-5 duration-400 animate-pulse" />
                </span>
              </button>
            </div>
            {/* <div className="grid gap-2 p-3 fixed w-full max-w-[414px] justify-self-center justify-center left-0 right-0 bottom-0">
            <button className="z-50 flex justify-center left-0 right-0 bottom-0 font-semibold">
              <span className="w-[414px] p-2 rounded-t-lg bg-green-600 text-center">
                Total Rp{" "}
                {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </span>
            </button>
            {itemsOrder?.map((data, idx) => {
              if (data.amount != 0) {
                const total = data.price * data.amount;
                return (
                  <div
                    key={idx}
                    className="p-2 grid grid-cols-6 gap-3 rounded-md bg-slate-900 "
                  >
                    <div className="col-span-2">{data.name}</div>
                    <div className="col-span-2">x {data.amount}</div>
                    <div className="text-center col-span-2">
                      Rp{" "}
                      {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </div>
                  </div>
                );
              }
            })}
          </div> */}
            {/* ===== Order Section ===== */}
            <div className="z-10 grid grid-cols-1 gap-2 ">
              <div className="grid grid-cols-2 gap-3">
                {/* ===== Order Cards ===== */}
                {isLoading && <h1 className=" text-black">Loading...</h1>}
                {itemsOrder.map((data, idx) => {
                  return menuCards == 0 ? (
                    <MenuCards
                      key={idx}
                      id={data.id}
                      onClickMinus={minusButtonHandler}
                      onClickPlus={plusButtonHandler}
                      src={data.pic}
                      dataFavorite={data.favorite}
                      dataName={data.name}
                      dataPrice={data.price}
                      dataAmount={data.amount}
                    />
                  ) : menuCards == data.type ? (
                    <MenuCards
                      key={idx}
                      id={data.id}
                      onClickMinus={minusButtonHandler}
                      onClickPlus={plusButtonHandler}
                      src={data.pic}
                      dataFavorite={data.favorite}
                      dataName={data.name}
                      dataPrice={data.price}
                      dataAmount={data.amount}
                    />
                  ) : (
                    ""
                  );
                })}
              </div>
              {itemsOrder?.map((data, idx) => {
                return (
                  <div
                    key={idx}
                    className="grid grid-cols-3 p-2 rounded-md bg-[#FFFFFF] text-[#333736] shadow-lg"
                  >
                    <p className=" col-span-2">
                      {data.name} {data.price}
                    </p>
                    <div className="flex justify-between col-span-1 rounded-xl bg-slate-950 text-white">
                      <button
                        id={data.id}
                        onClick={minusButtonHandler}
                        className="px-2 rounded-xl transition bg-red-600 hover:bg-red-500 active:bg-red-400"
                      >
                        -
                      </button>
                      <p>{data.amount}</p>
                      <button
                        id={data.id}
                        onClick={plusButtonHandler}
                        className="px-2 rounded-xl transition bg-green-600 hover:bg-green-500 active:bg-green-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-[#333736] font-bold">Order List:</div>
            <div className="space-y-3">
              {itemsOrder?.map((data, idx) => {
                if (data.amount != 0) {
                  const total = data.price * data.amount;
                  return (
                    <div
                      key={idx}
                      className="p-2 sr grid grid-cols-6 gap-3 rounded-md bg-slate-900 "
                    >
                      <div className="col-span-2">{data.name}</div>
                      <div className="col-span-2">x {data.amount}</div>
                      <div className="text-center col-span-2">
                        Rp{" "}
                        {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
