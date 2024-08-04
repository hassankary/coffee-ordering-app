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
  "Non Coffee",
  "Dessert",
  "Manual Brew",
  "Water",
  "Foods",
];

const $Page = ["Order", "Best Seller", "Cart", "Logout"];

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
    order: [],
    totalPrice: 0,
    finalPrice: 0,
  }); //this must be for Redux, but not now
  const [done, setDone] = useState(false); //this must be for Redux, but not now
  const modalRef = useRef();

  const getDataMenu = async () => {
    try {
      const request = await fetch(`https://mock-server-teal.vercel.app/menu`);
      // const request = await fetch(`http://localhost:4000/menu`);
      if (!request.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const response = await request.json();

      setItemsOrder(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const closeModal = (e, modalId) => {
    const filteredItem = itemsOrder.map((data, i) => {
      if (data.id === modalId) {
        return { ...data, notes: detailModal?.notes };
      }
      return data;
    });
    setItemsOrder(filteredItem);
    setOpenModal(false);
  };

  return (
    <>
      <title>Coffee Ordering Mobile Web by Hassankary</title>
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
                          ) : (
                            menuCards == data?.type && (
                              <MenuCards
                                key={idx}
                                onClickModal={showModal}
                                data={data}
                                onClickMinus={minusButtonHandler}
                                onClickPlus={plusButtonHandler}
                              />
                            )
                          );
                        })}
                      </div>
                    </div>
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
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      {totalPrice?.amount !== 0 ? (
                        <>
                          {itemsOrder?.map((data, idx) => {
                            if (data.amount != 0) {
                              const total = data.price * data.amount;
                              return (
                                <div
                                  key={idx}
                                  className="flex w-full justify-between px-2 py-3 bg-[#FFFFFF] text-black border-b space-x-3"
                                >
                                  <div className="flex flex-auto flex-col justify-between overflow-hidden">
                                    <div className="flex font-semibold">
                                      <p className="">{data.name}</p>
                                    </div>
                                    <div className="flex ">
                                      Rp{" "}
                                      {total
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                    </div>
                                    <div className="flex w-[80px] mt-1 justify-between col-span-1 rounded-full bg-transparent text-white">
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
                                  <div className="flex flex-col justify-center items-center space-y-2">
                                    <Image
                                      id={data.id}
                                      onClick={showModal}
                                      className="max-w-[80px] max-h-[80px] border hover:border-green-400 rounded-xl transition-all"
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
                          <div className="flex px-2 py-3 mt-4 text-black border-t border-b justify-between">
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
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* ======= MODAL ======= */}
              <ModalCard
                detailModal={detailModal}
                show={openModal}
                setDetailModal={setDetailModal}
                onClick={(e) => closeModal(e, detailModal?.id)}
                onClose={(e) => closeModal(e, detailModal?.id)}
                autoFocus = {false}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
