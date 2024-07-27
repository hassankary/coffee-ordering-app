"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import { TabMenu } from "@/app/components/tabmenu";
import { MenuCards } from "@/app/components/menucards";
import { Spinner } from "flowbite-react";
import { Footer } from "@/app/components/footer";

const menusType = [
  "All",
  "Coffee",
  "Tea",
  "Dessert",
  "Manual Brew",
  "Water",
  "Foods",
];

const $Page = ["Order", "Favorite", "Cart", "Logout"];

export default function Order() {
  const [itemsOrder, setItemsOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState({ amount: 0, length: 0 });
  const [currentPage, setCurrentPage] = useState(0);
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
        setTotalPrice({
          amount: totalPrice.amount + data.price,
          length: totalPrice.length + 1,
        });
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
        setTotalPrice({
          amount: totalPrice.amount - data.price,
          length: totalPrice.length - 1,
        });
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
          <Header
            page={$Page[currentPage]}
            onClickOrder={() => setCurrentPage(0)}
            onClickFavorite={() => setCurrentPage(1)}
            onClickCart={() => setCurrentPage(2)}
          />
          {/* ====== FOOTER (Total Price) ===== */}
          <Footer
            totalPrice={totalPrice}
            onClick={() => {
              setCurrentPage(2);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
          <div className="w-screen min-h-screen p-3 mt-[51px] pb-[52px] bg-[#FFFFFF] space-y-3">
            {/* ========== SPA TEST ========= */}
            <div className="tokay w-full max-w-[414px] min-h-screen space-y-3">
              {/* <div className="grid overflow-hidden max-h-[36px]">
                <div className="flex text-[#878988] text-xs font-medium max-h-[36px] space-x-3 overflow-scroll no-scrollbar">
                  {$Page.map((data, idx) => {
                    return (
                      <button
                        key={idx}
                        id={idx}
                        className={
                          menuCards == idx
                            ? "px-[14px] py-[10px] max-h-[36px] whitespace-nowrap text-white bg-[#008C4D] rounded-lg transition-all"
                            : "px-[14px] py-[10px] max-h-[36px] whitespace-nowrap hover:text-white hover:bg-[#008C4D] active:bg-[#008C4D] bg-[#F2F1F1] rounded-lg transition-all"
                        }
                        onClick={(e) => currentPageHandler(e)}
                      >
                        {data}
                      </button>
                    );
                  })}
                </div>
              </div> */}
              {currentPage == 0 ? (
                <>
                  <TabMenu
                    menusType={menusType}
                    menuCards={menuCards}
                    onClick={(e) => tabMenu(e)}
                  />
                  {/* ===== Order Section ===== */}
                  <div className="z-10 grid grid-cols-1 gap-2 ">
                    {isLoading && (
                      <div className=" flex h-screen -mt-[90px] w-full justify-center items-center">
                        <Spinner
                          color="success"
                          aria-label="Success spinner example"
                          className=""
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      {/* ===== Order Cards ===== */}
                      {itemsOrder?.map((data, idx) => {
                        return menuCards == 0 ? (
                          <MenuCards
                            data={data}
                            onClickMinus={minusButtonHandler}
                            onClickPlus={plusButtonHandler}
                          />
                        ) : menuCards == data.type ? (
                          <MenuCards
                            data={data}
                            onClickMinus={minusButtonHandler}
                            onClickPlus={plusButtonHandler}
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
                </>
              ) : currentPage == 1 ? (
                <div className="grid grid-cols-2 gap-3">
                  {itemsOrder.map((data, idx) => {
                    return (
                      <>
                        {data.favorite && (
                          <MenuCards
                            data={data}
                            onClickMinus={minusButtonHandler}
                            onClickPlus={plusButtonHandler}
                          />
                        )}
                      </>
                    );
                  })}
                </div>
              ) : currentPage == 2 ? (
                <div className="flex flex-col space-y-3">
                  {itemsOrder?.map((data, idx) => {
                    if (data.amount != 0) {
                      const total = data.price * data.amount;
                      return (
                        <div
                          key={idx}
                          className="flex w-full justify-between p-2 gap-3 rounded-2xl bg-slate-200 text-black"
                        >
                          <div className="flex flex-col justify-between">
                            <div className="flex font-semibold">
                              {data.name}
                            </div>
                            <div className="flex ">
                              Rp{" "}
                              {total
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </div>
                            <div className="flex w-[80px] justify-between col-span-1 rounded-xl bg-transparent text-white">
                              <button
                                id={data.id}
                                onClick={minusButtonHandler}
                                className="px-2 rounded-xl transition bg-red-600 hover:bg-red-500 active:bg-red-400"
                              >
                                -
                              </button>
                              <p className="text-black font-medium">
                                {data.amount}
                              </p>
                              <button
                                id={data.id}
                                onClick={plusButtonHandler}
                                className="px-2 rounded-xl transition bg-green-600 hover:bg-green-500 active:bg-green-400"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <Image
                              className="rounded-xl "
                              src={data.pic}
                              width={80}
                              height={80}
                              alt="product image"
                              quality={100}
                              unoptimized
                            />
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
