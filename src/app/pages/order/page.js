"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import { TabMenu } from "@/app/components/tabmenu";
import { MenuCards } from "@/app/components/menucards";
import { Button, Modal, Spinner } from "flowbite-react";
import { Footer } from "@/app/components/footer";
import { ModalCard } from "@/app/components/modalcard";
import { HiOutlineMinus, HiOutlinePlus, HiTrash } from "react-icons/hi";
import { PaymentCard } from "@/app/components/paymentcard";
import { useRouter } from "next/navigation";

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
  const [approved, setApproved] = useState({ value: false, alert: false });
  const modalRef = useRef();

  const getDataMenu = async () => {
    const request = await fetch(`https://mock-server-teal.vercel.app/menu`);
    // const request = await fetch(`http://localhost:4000/menu`);
    const response = await request.json();

    setItemsOrder(response);
    setIsLoading(false);
  };

  console.log("approved? ===>", approved);

  useEffect(() => {
    getDataMenu();
  }, []);

  useEffect(() => {
    if (currentPage === 0 || currentPage === 1) {
      setApproved({ value: false, alert: false });
    }
  }, [currentPage]);

  const tabMenu = (e) => {
    e.preventDefault();
    setMenuCards(e.target.id);
  };

  const plusButtonHandler = (e, idButton = null) => {
    e.preventDefault();
    const filteredItems = itemsOrder?.map((data, idx) => {
      if (idButton) {
        if (data.id === idButton) {
          setTotalPrice({
            amount: totalPrice.amount + data.price,
            length: totalPrice.length + 1,
          });
          return { ...data, amount: data.amount + 1 };
        }
      }
      if (data.id === e.target.id) {
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

  const minusButtonHandler = (e, idButton = null) => {
    e.preventDefault();
    const filteredItems = itemsOrder?.map((data, idx) => {
      if (idButton) {
        if (data.id === idButton && data.amount > 0) {
          setTotalPrice({
            amount: totalPrice.amount - data.price,
            length: totalPrice.length - 1,
          });
          if (totalPrice.length === 1 && currentPage === 2) {
            setCurrentPage(0);
            setMenuCards(0);
          }
          return { ...data, amount: data.amount - 1 };
        }
      }
      if (data.id === e.target.id && data.amount > 0) {
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

  const deleteItemHandler = (e, idButton = null) => {
    e.preventDefault();
    const filteredItems = itemsOrder?.map((data, idx) => {
      if (idButton) {
        if (data.id == idButton && data.amount > 0) {
          const dataPrice = data.amount * data.price;
          setTotalPrice({
            amount: totalPrice.amount - dataPrice,
            length: totalPrice.length - data.amount,
          });
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
    // console.log("masuk data modal =>", e.target.id);
    setOpenModal(true);
    itemsOrder.map((data, idx) => {
      if (data.id == e.target.id) {
        setDetailModal(data);
      }
    });
  };

  const toggleHandler = (e) => {
    if (totalPrice.length !== 0) {
      setApproved({ value: !approved.value, alert: approved.alert });
    } else {
      setApproved({ value: approved.value, alert: true });
      // console.log("approved.alert nyala");
    }
  };

  const router = useRouter();

  const footerHandler = () => {
    if (approved.value) {
      router.push("/pages/succes");
    } else {
      setCurrentPage(2);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // console.log("itemsOrder =>", itemsOrder);
  // console.log("detailModal =>", detailModal);

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
          {totalPrice.length !== 0 && (
            <Footer
              page={currentPage}
              totalPrice={totalPrice}
              onClick={footerHandler}
            />
          )}
          <div className="w-screen min-h-screen p-3 mt-[51px] pb-[52px] bg-[#FFFFFF]">
            {/* ========== SPA Render Components ========= */}
            <div className="tokay w-full max-w-[414px] min-h-screen space-y-3">
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
                        ) : menuCards == data?.type ? (
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
                                      className="flex w-[25px] h-[25px] justify-center items-center rounded-full transition bg-red-600 hover:bg-red-500 active:bg-red-400"
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
                                      className="flex w-[25px] h-[25px] justify-center items-center rounded-full transition bg-green-600 hover:bg-green-500 active:bg-green-400"
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
                              className="px-4 py-2 text-white font-semibold bg-green-700 rounded-xl"
                            >
                              Tambah
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <PaymentCard
                    totalPrice={totalPrice}
                    onClickCheckBox={(e) => toggleHandler(e)}
                    checked={approved.value}
                    showAlert={approved.alert}
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
              onClick={() => setOpenModal(false)}
              onClose={() => setOpenModal(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
