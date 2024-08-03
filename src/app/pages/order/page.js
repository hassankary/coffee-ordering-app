"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import { TabMenu } from "@/app/components/tabmenu";
import { MenuCards } from "@/app/components/menucards";
import { Button, Modal, Spinner } from "flowbite-react";
import { Footer } from "@/app/components/footer";
import { ModalCard } from "@/app/components/modalcard";
import {
  HiOutlineChevronRight,
  HiOutlineMinus,
  HiOutlinePlus,
  HiTrash,
} from "react-icons/hi";
import { PaymentCard } from "@/app/components/paymentcard";
import { useRouter } from "next/navigation";
import { RiDiscountPercentFill } from "react-icons/ri";
import { TbCircleArrowRightFilled } from "react-icons/tb";
import { VoucherPromo } from "@/app/components/voucherpromo";
import Link from "next/link";
import { Done } from "@/app/components/done";

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
  const [totalPrice, setTotalPrice] = useState({
    amount: 0,
    length: 0,
    discounted: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [menuCards, setMenuCards] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [detailModal, setDetailModal] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [approved, setApproved] = useState({
    value: false,
    alertBuy: false,
    alertChekout: false,
  });
  const [discountAmount, setDiscountAmount] = useState(0);
  const [checkout, setCheckout] = useState({
    //this must be for Redux, but not now
    order: [],
    totalPrice: 0,
    finalPrice: 0,
  });
  const [done, setDone] = useState(false); //this must be for Redux, but not now
  const modalRef = useRef();

  const getDataMenu = async () => {
    // const request = await fetch(`https://mock-server-teal.vercel.app/menu`);
    const request = await fetch(`http://localhost:4000/menu`);
    const response = await request.json();

    setItemsOrder(response);
    setIsLoading(false);
  };

  console.log("totalPrice ===>", totalPrice);
  console.log("approved ===>", approved);

  useEffect(() => {
    getDataMenu();
  }, []);

  useEffect(() => {
    if (currentPage === 0 || currentPage === 1) {
      setApproved({ value: false, alertBuy: false, alertChekout: false });
    }
  }, [currentPage]);

  useEffect(() => {
    setTotalPrice((t) => ({ ...t, discounted: totalPrice.amount }));
  }, [totalPrice.amount]);

  useEffect(() => {
    const discountedPrice = (totalPrice.amount * discountAmount) / 100;
    console.log("discountedPrice", discountedPrice);
    setTotalPrice({
      ...totalPrice,
      discounted: totalPrice.amount - discountedPrice,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountAmount]);

  const tabMenuHandler = (e) => {
    e.preventDefault();
    setMenuCards(e.target.id);
  };

  const plusButtonHandler = (e, idButton = null) => {
    e.preventDefault();
    const filteredItems = itemsOrder?.map((data, idx) => {
      if (idButton) {
        if (data.id === idButton) {
          setTotalPrice({
            ...totalPrice,
            amount: totalPrice.amount + data.price,
            length: totalPrice.length + 1,
          });
          setApproved({ ...approved, value: false });
          setDiscountAmount(0);
          return { ...data, amount: data.amount + 1 };
        }
      }
      if (data.id === e.target.id) {
        setTotalPrice({
          ...totalPrice,
          amount: totalPrice.amount + data.price,
          length: totalPrice.length + 1,
        });
        setApproved({ ...approved, alertChekout: false });
        setDiscountAmount(0);
        return { ...data, amount: data.amount + 1 };
      }
      return data;
    });
    setItemsOrder(filteredItems);
  };

  const minusButtonHandler = (e, idButton = null) => {
    e.preventDefault();
    const filteredItems = itemsOrder?.map((data, idx) => {
      if (idButton) {
        if (data.id === idButton && data.amount > 0) {
          setTotalPrice({
            ...totalPrice,
            amount: totalPrice.amount - data.price,
            length: totalPrice.length - 1,
          });
          setApproved({ ...approved, value: false });
          setDiscountAmount(0);
          if (totalPrice.length === 1 && currentPage === 2) {
            setCurrentPage(0);
            setMenuCards(0);
          }
          return { ...data, amount: data.amount - 1 };
        }
      }
      if (data.id === e.target.id && data.amount > 0) {
        setTotalPrice({
          ...totalPrice,
          amount: totalPrice.amount - data.price,
          length: totalPrice.length - 1,
        });
        setDiscountAmount(0);
        return { ...data, amount: data.amount - 1 };
      }
      return data;
    });
    setItemsOrder(filteredItems);
  };

  const deleteItemHandler = (e, idButton = null) => {
    e.preventDefault();
    const filteredItems = itemsOrder?.map((data, idx) => {
      if (idButton) {
        if (data.id == idButton && data.amount > 0) {
          const dataPrice = data.amount * data.price;
          setTotalPrice({
            ...totalPrice,
            amount: totalPrice.amount - dataPrice,
            length: totalPrice.length - data.amount,
          });
          setApproved({ ...approved, value: false });
          setDiscountAmount(0);
          if (totalPrice.length === data.amount) {
            setCurrentPage(0);
            setMenuCards(0);
          }
          return { ...data, amount: data.amount - data.amount };
        }
      }
      return data;
    });
    setItemsOrder(filteredItems);
  };

  const showModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
    itemsOrder.map((data, idx) => {
      if (data.id == e.target.id) {
        setDetailModal(data);
      }
    });
  };

  const toggleHandler = (e) => {
    if (totalPrice.length !== 0) {
      setApproved({ ...approved, value: !approved.value, alertChekout: false });
    } else {
      setApproved({ ...approved, alertBuy: true });
    }
  };

  const router = useRouter();

  const footerHandler = () => {
    if (approved.value) {
      const updatedCheckout = itemsOrder.filter((item) => item.amount !== 0);
      setCheckout({
        order: updatedCheckout,
        totalPrice: totalPrice.amount,
        finalPrice: totalPrice.discounted,
      });
      setDone(true);
    } else {
      setCurrentPage(2);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (currentPage === 2 && approved.value === false) {
      setApproved({ ...approved, alertChekout: true });
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
    }
  };

  // ========= generate random number ==========

  // const [newNumber, SetNewNumber] = useState([]);
  // const [currentTime, setCurrentTime] = useState(
  //   new Date().toLocaleTimeString()
  // );

  // const generateRandomNumbers = (length) => {
  //   const numbers = [];
  //   for (let i = 0; i < length; i++) {
  //     // Menghasilkan angka integer antara 0 dan 9
  //     const randomNumber = Math.floor(Math.random() * 10);
  //     numbers.push(randomNumber);
  //   }
  //   return numbers;
  // };

  // const generateSixNumber = () => {
  //   const randomNumbers = generateRandomNumbers(6);
  //   SetNewNumber(randomNumbers);
  //   setCurrentTime(new Date().toLocaleTimeString());
  // };

  // console.log("itemsOrder =>", itemsOrder);
  // console.log("detailModal =>", detailModal);

  const checkoutHandler = () => {
    if (approved.value) {
      const updatedCheckout = itemsOrder.filter((item) => item.amount !== 0);
      setCheckout({
        order: updatedCheckout,
        totalPrice: totalPrice.amount,
        finalPrice: totalPrice.discounted,
      });
      setDone(true);
    } else {
      setApproved({ ...approved, alertChekout: true });
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
    }
  };

  console.log("checkout ==>", checkout);

  return (
    <>
      <title>Coffee Ordering Mobile Web by Hassan Kaeru</title>
      {done ? (
        <Done
          checkout={checkout}
          discountAmount={discountAmount}
          totalPrice={totalPrice}
        />
      ) : (
        <div className="flex w-full justify-center">
          <div className="flex max-w-[414px] justify-center font-sans">
            {/* ============ HEADER ============ */}
            <Header
              page={$Page[currentPage]}
              onClickOrder={() => {
                setCurrentPage(0);
                setMenuCards(0);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              onClickFavorite={() => {
                setCurrentPage(1);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              onClickCart={() => {
                setCurrentPage(2);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            />
            {/* ====== FOOTER (Total Price) ===== */}
            {totalPrice.length !== 0 && (
              <Footer
                page={currentPage}
                totalPrice={totalPrice}
                onClick={footerHandler}
              />
            )}
            <div className="w-screen min-h-screen p-3 mt-[51px] pb-[52px] bg-[#FFFFFF]">
              {/* ========== SPA Render Components ========= */}
              <div className="w-full max-w-[414px] h-full space-y-3">
                {currentPage == 0 ? (
                  <>
                    <TabMenu
                      menusType={menusType}
                      menuCards={menuCards}
                      onClick={(e) => tabMenuHandler(e)}
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
                              key={idx}
                              onClickModal={showModal}
                              data={data}
                              onClickMinus={minusButtonHandler}
                              onClickPlus={plusButtonHandler}
                            />
                          ) : menuCards == data?.type ? (
                            <MenuCards
                              key={idx}
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
                      {/* {itemsOrder?.map((data, idx) => {
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
                    })} */}
                    </div>
                    {/* ======= Nomor Pesanan ===== */}
                    {/* <div className="text-black">Nomor Pesanan = #{newNumber}</div>
                  <div className="text-black">
                    Waktu Pesanan = {currentTime}
                  </div>
                  <button
                    onClick={generateSixNumber}
                    className=" text-black bg-red-500 px-2 py-1"
                  >
                    Generate
                  </button> */}
                  </>
                ) : currentPage == 1 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {itemsOrder?.map((data, idx) => {
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
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-4">
                      {totalPrice?.amount !== 0 ? (
                        <>
                          {itemsOrder?.map((data, idx) => {
                            if (data.amount != 0) {
                              const total = data.price * data.amount;
                              return (
                                <div
                                  key={idx}
                                  className="flex w-full justify-between p-2 bg-[#FFFFFF] text-black border-b space-x-3"
                                >
                                  <div className="flex flex-auto flex-col justify-between">
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
                                        onClick={(e) =>
                                          minusButtonHandler(e, data.id)
                                        }
                                        className="flex w-[25px] h-[25px] justify-center items-center rounded-full bg-red-600 hover:bg-red-500 active:bg-red-400 transition-all"
                                      >
                                        <HiOutlineMinus />
                                      </button>
                                      <p className="text-black font-medium">
                                        {data.amount}
                                      </p>
                                      <button
                                        id={data.id}
                                        onClick={(e) =>
                                          plusButtonHandler(e, data.id)
                                        }
                                        className="flex w-[25px] h-[25px] justify-center items-center rounded-full bg-green-600 hover:bg-green-500 active:bg-green-400 transition-all"
                                      >
                                        <HiOutlinePlus />
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
                                  <div className="flex flex-none justify-center items-center">
                                    <button
                                      onClick={(e) =>
                                        deleteItemHandler(e, data.id)
                                      }
                                      className="flex p-1 -mr-2 justify-center items-center rounded-xl transition text-white bg-red-600 hover:bg-red-500 active:bg-red-400"
                                    >
                                      <HiTrash />
                                    </button>
                                  </div>
                                </div>
                              );
                            }
                          })}
                          <div className="flex px-2 py-3 text-black border-t border-b justify-between">
                            <div className="flex flex-col">
                              <h1 className=" font-semibold">
                                Ada lagi yang mau dibeli?
                              </h1>
                              <h1>bisa nambah menu lain ya...</h1>
                            </div>
                            <div className="flex items-center px-3">
                              <button
                                onClick={() => {
                                  setCurrentPage(0);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                                className="px-4 py-2 text-white font-semibold bg-green-600 hover:bg-green-700 active:bg-green-500 rounded-xl transition-all"
                              >
                                Tambah
                              </button>
                            </div>
                          </div>
                          {/* <button
                          onClick={() =>
                            setTotalPrice({
                              ...totalPrice,
                              amount:
                                totalPrice.amount - totalPrice.amount * 0.1,
                            })
                          }
                          className="flex px-3 py-2 text-sm  text-black justify-between rounded-xl hover:bg-green-100 transition-all"
                        >
                          <h1>Voucher 10%</h1>
                          <span>Apply</span>
                        </button> */}
                          <VoucherPromo
                            totalPrice={totalPrice}
                            setTotalPrice={setTotalPrice}
                            discountAmount={discountAmount}
                            setDiscountAmount={setDiscountAmount}
                            onClick={() => {
                              setCurrentPage(2);
                              window.scrollTo({
                                top: 1000,
                                behavior: "smooth",
                              });
                              console.log("masuk");
                            }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <PaymentCard
                      totalPrice={totalPrice}
                      onChange={(e) => toggleHandler(e)}
                      checked={approved.value}
                      showAlertBuy={approved.alertBuy}
                      showAlertChekout={approved.alertChekout}
                      onClickToMenu={() => setCurrentPage(0)}
                      discountAmount={discountAmount}
                    />
                    {/* <div className=" flex justify-center">
                      <button
                        onClick={checkoutHandler}
                        className="px-3 py-1 text-white font-bold bg-red-500 hover:bg-red-600 rounded-xl transition-all"
                      >
                        Checkout
                      </button>
                    </div> */}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* ======= MODAL ======= */}
              <ModalCard
                detailModal={detailModal}
                show={openModal}
                onClick={() => setOpenModal(false)}
                onClose={() => setOpenModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
