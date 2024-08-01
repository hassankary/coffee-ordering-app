"use client";

import Link from "next/link";

export const PaymentCard = ({
  totalPrice,
  discountAmount,
  onChange,
  checked,
  disabled,
  showAlertBuy,
  showAlertChekout,
  onClickToMenu,
}) => {
  return (
    <div className="text-black space-y-4 pb-6">
      <div className="font-semibold">Ringkasan Pembayaran</div>
      <div className={`flex flex-col p-4 border ${discountAmount !== 0 ? `border-green-800` : `` } rounded-xl`}>
        <div className="flex flex-col pb-3 border-b">
          <div className="flex justify-between">
            <h1>Harga ({totalPrice.length} item) </h1>
            {/* <h1 className={discountAmount !== 0 ? "line-through" : "hidden"}>
              Rp{" "}
              {totalPrice.amount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </h1> */}
            <h1 className={""}>
              Rp{" "}
              {totalPrice.amount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </h1>
          </div>
          {discountAmount !== 0 && (
            <div className="flex justify-between font-bold text-green-800">
              <h1>Diskon ({discountAmount}%)</h1>
              <h1>
                - Rp{" "}
                {((discountAmount / 100) * totalPrice.amount)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                
              </h1>
            </div>
          )}
          <div className="flex justify-between">
            <h1>{"Tax (include)"}</h1>
            <h1>0</h1>
          </div>
          <div className="flex justify-between">
            <h1>{"Biaya jasa (free)"}</h1>
            <h1>0</h1>
          </div>
        </div>
        <div className="flex justify-between pt-3 font-bold">
          <h1 className="">Total pembayaran</h1>
          <h1>
            Rp{" "}
            {totalPrice.discounted
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </h1>
        </div>
      </div>
      <label className="flex w-full justify-between items-center cursor-pointer">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
          Saya sudah membaca pesanan
        </span>
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={onChange}
          checked={checked}
        />
        <div className="me-6 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      </label>
      {showAlertBuy && (
        <span className={`text-sm font-semibold text-red-600`}>
          Tambah pesanan dulu bro!{" "}
          <button onClick={onClickToMenu} className=" text-sky-600">
            di sini
          </button>
        </span>
      )}
      {showAlertChekout && (
        <span className={`text-sm font-semibold text-red-600`}>
          Baca pesanan dulu bro, udah bener belom?
        </span>
      )}
    </div>
  );
};
