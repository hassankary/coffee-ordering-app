"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import { TabMenu } from "@/app/components/tabmenu";
import { MenuCards } from "@/app/components/menucards";
import { Button, Modal, Spinner } from "flowbite-react";
import { Footer } from "@/app/components/footer";
import { ModalCard } from "@/app/components/modalcard";

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
  const [detailModal, setDetailModal] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef();

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

  const showModal = (e) => {
    e.preventDefault();
    console.log("masuk data modal =>", e.target.id);
    setOpenModal(true);
    itemsOrder.map((data, idx) => {
      if (data.id == e.target.id) {
        setDetailModal(data);
      }
    });
  };

  console.log("itemsOrder =>", itemsOrder);
  console.log("detailModal =>", detailModal);

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
            onClickCart={() => {
              setCurrentPage(2);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
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
          <div className="w-screen min-h-screen p-3 mt-[51px] pb-[52px] bg-[#FFFFFF]">
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
                            onClickModal={showModal}
                            data={data}
                            onClickMinus={minusButtonHandler}
                            onClickPlus={plusButtonHandler}
                          />
                        ) : menuCards == data.type ? (
                          <MenuCards
                            onClickModal={showModal}
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
                            onClickModal={showModal}
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
                <div className="flex flex-col">
                  {itemsOrder?.map((data, idx) => {
                    if (data.amount != 0) {
                      const total = data.price * data.amount;
                      return (
                        <div
                          key={idx}
                          className="flex w-full justify-between p-2 bg-[#FFFFFF] text-black border-b "
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
                              id={data.id}
                              onClick={showModal}
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
            {/* ======= MODAL ======= */}
            {/* <div className="fixed z-50 flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-slate-700 bg-opacity-80">
              <div className="flex w-full max-w-[414px] px-5  justify-center bg-transparent">
                <div className="flex w-full max-w-[414px] p-6 justify-center rounded-2xl bg-slate-50">
                  <div className="flex-col space-y-5">
                    <Image
                      className="rounded-2xl"
                      src={"/./product/americano.jpg"}
                      width={330}
                      height={330}
                      alt="product image"
                      quality={100}
                      unoptimized
                    />
                    <div className="flex-col text-black font-semibold space-y-2">
                      <div className="">Americano</div>
                      <div className="font-normal">
                        Espresso + Ice + Water
                      </div>
                      <div className=" text-green-500">50.000</div>
                      <div className="flex justify-center">
                        <button className="px-5 py-3 bg-red-600 text-white rounded-xl">
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <ModalCard
              detailModal={detailModal}
              show={openModal}
              onClick={() => setOpenModal(false)}
              onClose={() => setOpenModal(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
