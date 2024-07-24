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

const page = "Order";

const coffeeMenu = [
  {
    id: 0,
    type: 1,
    name: "Espresso",
    price: 16000,
    amount: 0,
    favorite: false,
    pic: "/./product/espresso.jpg",
  },
  {
    id: 1,
    type: 1,
    name: "Ice Americano",
    price: 20000,
    amount: 0,
    favorite: false,
    pic: "/./product/americano.jpg",
  },
  {
    id: 2,
    type: 1,
    name: "Es Kopi Susu",
    price: 23000,
    amount: 0,
    favorite: true,
    pic: "/./product/eskopisusu.jpeg",
  },
  {
    id: 3,
    type: 1,
    name: "Ice Cafe Latte",
    price: 28000,
    amount: 0,
    favorite: false,
    pic: "/./product/icelatte.jpg",
  },
  {
    id: 4,
    type: 1,
    name: "Ice Black Lime",
    price: 28000,
    amount: 0,
    favorite: true,
    pic: "/./product/iceblacklime.jpg",
  },
  {
    id: 5,
    type: 1,
    name: "Hot Americano",
    price: 28000,
    amount: 0,
    favorite: false,
    pic: "/./product/hotamericano.jpg",
  },
  {
    id: 6,
    type: 1,
    name: "Hot Cafe Latte",
    price: 28000,
    amount: 0,
    favorite: true,
    pic: "/./product/latte.jpg",
  },
  {
    id: 7,
    type: 1,
    name: "Hot Cappucino",
    price: 28000,
    amount: 0,
    favorite: false,
    pic: "/./product/cappucino.jpg",
  },
  {
    id: 8,
    type: 4,
    name: "V60",
    price: 30000,
    amount: 0,
    favorite: false,
    pic: "/./product/v60.jpg",
  },
  {
    id: 9,
    type: 4,
    name: "Japanese Ice Coffee",
    price: 32000,
    amount: 0,
    favorite: false,
    pic: "/./product/japanese.jpg",
  },
  {
    id: 10,
    type: 2,
    name: "Tea",
    price: 20000,
    amount: 0,
    favorite: false,
    pic: "/./product/icetea.jpg",
  },
  {
    id: 11,
    type: 2,
    name: "Lemon Tea",
    price: 20000,
    amount: 0,
    favorite: true,
    pic: "/./product/lemontea.jpg",
  },
  {
    id: 12,
    type: 5,
    name: "Mineral Water",
    price: 10000,
    amount: 0,
    favorite: false,
    pic: "/./product/mineralwater.jpg",
  },
  {
    id: 13,
    type: 3,
    name: "Ice Cream",
    price: 10000,
    amount: 0,
    favorite: true,
    pic: "/./product/icecream.jpg",
  },
];

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
  const [itemsOrder, setItemsOrder] = useState(coffeeMenu);
  const [dataMenu, setDataMenu] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [menuCards, setMenuCards] = useState(0);

  const getDataMenu = async () => {
    const request = await fetch(`http://localhost:4000/menu`);
    const response = await request.json();

    setDataMenu(response);
  };

  useEffect(() => {
    getDataMenu();
  }, []);

  const plusButtonHandler = (e) => {
    e.preventDefault();
    const filteredItems = itemsOrder.map((data, idx) => {
      if (data.id == e.target.id) {
        setTotalPrice(totalPrice + data.price);
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
        setTotalPrice(totalPrice - data.price);
        return { ...data, amount: data.amount - 1 };
      }
      return data;
    });
    setItemsOrder(filteredItems);
  };

  console.log("itemsOrder =>", itemsOrder);

  const tabMenu = (e) => {
    e.preventDefault();
    setMenuCards(e.target.id);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex max-w-[414px] justify-center font-sans">
        {/* ============ HEADER ============ */}
        <Header page={page} />
        <div className="w-full p-3 mt-[51px] pb-[52px] bg-[#FFFFFF] space-y-3">
          {/* =========== Menus Type ========= */}
          <div className="grid max-h-[36px]">
            <div className="flex text-[#878988] text-xs font-medium max-h-[36px] space-x-3 overflow-scroll no-scrollbar">
              {menusType.map((data, idx) => {
                return (
                  <button
                    key={idx}
                    id={idx}
                    className={
                      menuCards == idx
                        ? "px-[14px] py-[10px] max-h-[36px] whitespace-nowrap text-white bg-[#008C4D] rounded-lg transition-all"
                        : "px-[14px] py-[10px] max-h-[36px] whitespace-nowrap hover:text-white hover:bg-[#008C4D] active:bg-[#008C4D] bg-[#F2F1F1] rounded-lg transition-all"
                    }
                    onClick={(e) => tabMenu(e)}
                  >
                    {data}
                  </button>
                );
              })}
            </div>
          </div>
          {/* ====== FOOTER (Total Price) ===== */}
          <button className="z-50 flex justify-center fixed left-0 right-0 bottom-0 font-semibold">
            <span className="w-[414px] p-2 rounded-t-lg bg-green-600 text-center">
              Total Rp{" "}
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </span>
          </button>
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
              {itemsOrder.map((data, idx) => {
                return menuCards == 0 ? (
                  <div
                    key={idx}
                    className="flex flex-col bg-[#FFFFFF] rounded-md shadow-lg"
                  >
                    <div
                      className={
                        data.favorite
                          ? "z-10 p-2 -mb-10"
                          : "hidden z-10 p-2 -mb-10"
                      }
                    >
                      <HeartIcon className="float-right w-6 h-6 fill-red-600" />
                    </div>
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
                      <div className="flex flex-row justify-between">
                        <h1 className="flex text-sm items-center text-[#008C4D]">
                          Rp{" "}
                          {data.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </h1>
                        <div className="flex flex-row space-x-2">
                          <button
                            id={data.id}
                            onClick={minusButtonHandler}
                            className="flex w-[25px] h-[25px] justify-center items-center"
                          >
                            <MinusCircleIcon className=" fill-[#EAB968] hover:fill-[#e4ad54] transition" />
                          </button>
                          <p className="flex text-sm text-black items-center">
                            {data.amount}
                          </p>
                          <button
                            id={data.id}
                            onClick={plusButtonHandler}
                            className="flex w-[25px] h-[25px] justify-center items-center rounded-full transition "
                          >
                            <PlusCircleIcon className=" fill-[#EAB968] hover:fill-[#e4ad54] transition" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={idx}
                    className={
                      menuCards == data.type
                        ? "flex flex-col bg-[#FFFFFF] rounded-md shadow-lg"
                        : "hidden "
                    }
                  >
                    <div
                      className={
                        data.favorite
                          ? "z-10 p-2 -mb-10"
                          : "hidden z-10 p-2 -mb-10"
                      }
                    >
                      <HeartIcon className="float-right w-6 h-6 fill-red-600" />
                    </div>
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
                      <div className="flex flex-row justify-between">
                        <h1 className="flex text-sm items-center text-[#008C4D]">
                          Rp{" "}
                          {data.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </h1>
                        <div className="flex flex-row space-x-2">
                          <button
                            id={data.id}
                            onClick={minusButtonHandler}
                            className="flex w-[25px] h-[25px] justify-center items-center"
                          >
                            <MinusCircleIcon className=" fill-[#EAB968] hover:fill-[#e4ad54] transition" />
                          </button>
                          <p className="flex text-sm text-black items-center">
                            {data.amount}
                          </p>
                          <button
                            id={data.id}
                            onClick={plusButtonHandler}
                            className="flex w-[25px] h-[25px] justify-center items-center"
                          >
                            <PlusCircleIcon className=" fill-[#EAB968] hover:fill-[#e4ad54] transition" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
