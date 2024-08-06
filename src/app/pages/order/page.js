"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import { TabMenu } from "@/app/components/tabmenu";
import { MenuCards } from "@/app/components/menucards";
import { Button, Modal, Spinner } from "flowbite-react";
import { Footer } from "@/app/components/footer";
import { ModalCard } from "@/app/components/modalcard";
import { PaymentCard } from "@/app/components/paymentcard";
import { useRouter } from "next/navigation";
import { RiDiscountPercentFill } from "react-icons/ri";
import { TbCircleArrowRightFilled } from "react-icons/tb";
import { VoucherPromo } from "@/app/components/voucherpromo";
import Link from "next/link";
import { Done } from "@/app/components/done";
import { OrderCart } from "@/app/components/ordercart";
import { motion as m } from "framer-motion";

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
    payment: "",
  }); //this must be for Redux, but not now
  const [radioChekced, setRadioChecked] = useState("gopay");
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
          if (data.amount === 1) {
            return { ...data, amount: data.amount - 1, notes: "" };
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
          return { ...data, amount: data.amount - data.amount, notes: "" };
        }
      }
      return data;
    });
    setItemsOrder(filteredItems);
  };

  const showModal = (e, dataId) => {
    e.preventDefault();
    setOpenModal(true);
    itemsOrder.map((data, idx) => {
      if (data.id == e.target.id) {
        setDetailModal(data);
      }
      if (data.id == dataId) {
        setDetailModal(data);
      }
    });
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


  const handleChange = (event) => {
    setRadioChecked(event.target.value);
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
        payment: radioChekced,
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
  
  // console.log("checkout ===>", checkout )

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
        <div className=" z-30 flex w-full justify-center">
          <m.div className="flex max-w-[414px] justify-center font-sans">
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
            <div className="w-screen min-h-screen mt-[51px] bg-[#FFFFFF]">
              {/* ========== SPA Render Components ========= */}
              <div className="w-full max-w-[414px] p-3 pb-[62px] h-full space-y-3 overflow-hidden">
                {currentPage == 0 ? (
                  <>
                    <TabMenu
                      menusType={menusType}
                      menuCards={menuCards}
                      onClick={(e) => tabMenuHandler(e)}
                    />
                    {/* ===== Order Section ===== */}
                    {isLoading && (
                      <m.div>
                        <div className=" flex h-screen -mt-[108px] w-full justify-center items-center">
                          <Spinner
                            color="success"
                            aria-label="Success spinner example"
                            className=""
                          />
                        </div>
                      </m.div>
                    )}
                    <m.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="z-10 grid grid-cols-1 gap-2 "
                    >
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
                    </m.div>
                  </>
                ) : currentPage == 1 ? (
                  <m.div
                    initial={{ x: "100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="grid grid-cols-2 gap-3"
                  >
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
                  </m.div>
                ) : (
                  currentPage == 2 && (
                    // ====================== PAGE CART ===================
                    <div className="flex flex-col">
                      <m.div
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-col"
                      >
                        {totalPrice?.amount !== 0 ? (
                          <>
                            <OrderCart
                              itemsOrder={itemsOrder}
                              minusButtonHandler={minusButtonHandler}
                              plusButtonHandler={plusButtonHandler}
                              setCurrentPage={setCurrentPage}
                              deleteItemHandler={deleteItemHandler}
                              showModal={showModal}
                            />
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
                      </m.div>
                      <m.div
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <PaymentCard
                          radioChekced={radioChekced}
                          setRadioChecked={setRadioChecked}
                          handleChange={handleChange}
                          totalPrice={totalPrice}
                          onChange={(e) => toggleHandler(e)}
                          checked={approved.value}
                          showAlertBuy={approved.alertBuy}
                          showAlertChekout={approved.alertChekout}
                          onClickToMenu={() => setCurrentPage(0)}
                          discountAmount={discountAmount}
                        />
                      </m.div>
                    </div>
                  )
                )}
              </div>
              {/* ======= MODAL ======= */}
              <ModalCard
                detailModal={detailModal}
                show={openModal}
                setDetailModal={setDetailModal}
                onClick={(e) => closeModal(e, detailModal?.id)}
                onClose={(e) => closeModal(e, detailModal?.id)}
                autoFocus={false}
              />
            </div>
          </m.div>
        </div>
      )}
    </>
  );
}
