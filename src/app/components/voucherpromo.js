"use client";
import { useEffect, useState } from "react";
import { RiDiscountPercentFill } from "react-icons/ri";
import { TbCircleArrowRightFilled } from "react-icons/tb";

const arrButton = [10, 20, 30];

export const VoucherPromo = ({
  onClick,
  totalPrice,
  setTotalPrice,
  discountAmount,
  setDiscountAmount,
}) => {
  const [open, setOpen] = useState(false);

  console.log("discountAmount =>", discountAmount);

  useEffect(() => {
    if (discountAmount === 0) {
      setOpen(false);
    }
  }, [discountAmount]);

  return (
    <div>
      <div className="border border-t-0 text-black rounded-3xl">
        <div
          onClick={() => setOpen(!open)}
          className={`flex px-4 py-4 bg-gradient-to-r ${
            discountAmount ? `from-green-200` : `from-red-200`
          } to-white border rounded-3xl justify-between`}
        >
          <div className="flex justify-center items-center space-x-4">
            <RiDiscountPercentFill
              className={`flex w-7 h-7 ${
                discountAmount ? `fill-green-600` : `fill-red-600`
              }`}
            />
            {discountAmount !== 0 ? (
              <h1 className="font-bold">Diskon {discountAmount}% terpasang</h1>
            ) : (
              <h1 className="font-bold">Cek voucher promo di sini!</h1>
            )}
          </div>
          <div className="flex items-center">
            <button
              onClick={onClick}
              className="flex text-white font-semibold rounded-full transition-all"
            >
              <TbCircleArrowRightFilled
                className={`flex w-8 h-8 ${
                  discountAmount
                    ? `fill-green-600 hover:fill-green-700 active:fill-green-500`
                    : `fill-red-600 hover:fill-red-700 active:fill-red-500`
                } duration-400 `}
              />
            </button>
          </div>
        </div>
        {open && (
          <div className="flex flex-col px-[17px] py-1 font-semibold transition-all">
            {arrButton?.map((data, idx) => {
              const diskon = data / 100;
              return (
                <button
                  key={idx}
                  id={idx + 1}
                  onClick={() => {
                    // setTotalPrice({
                    //   ...totalPrice,
                    //   amount: totalPrice.amount - totalPrice.amount * diskon,
                    // });
                    window.scrollTo({
                      top: 1000,
                      behavior: "smooth",
                    });
                    console.log("tP.discounted", totalPrice.discounted);
                    setDiscountAmount(data);
                    setOpen(false);
                  }}
                  className={`flex px-3 py-2 text-sm justify-between rounded-xl transition-all ${
                    discountAmount === data
                      ? `bg-green-100`
                      : `hover:bg-green-100`
                  }`}
                >
                  <h1>Diskon {data}%</h1>
                  <span>Gunakan</span>
                </button>
              );
            })}
          </div>
        )}
        {!open && discountAmount !== 0 && <button onClick={() => setDiscountAmount(0)} className="flex w-full justify-center text-green-700 font-bold px-[17px] py-3 transition-all">
          <h1>batalkan diskon</h1>
        </button>}
      </div>
    </div>
  );
};
