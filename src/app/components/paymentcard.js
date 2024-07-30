"use client";

export const PaymentCard = ({totalPrice, onClickCheckBox, checked, disabled, showAlert}) => {
  return (
    <div className="px-2 text-black space-y-4 pb-6">
      <div className="font-semibold">Ringkasan Pembayaran</div>
      <div className="flex flex-col p-4 border rounded-xl">
        <div className="flex flex-col pb-3 border-b">
          <div className="flex justify-between">
            <h1>Harga ({totalPrice.length} item) </h1>
            <h1>
              Rp{" "}
              {totalPrice.amount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </h1>
          </div>
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
            {totalPrice.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </h1>
        </div>
      </div>
      <label className="flex w-full justify-between items-center cursor-pointer">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
          Saya sudah membaca pesanan
        </span>
        <input type="checkbox" value="" className="sr-only peer" onClick={onClickCheckBox} checked={checked} />
        <div className="me-6 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      </label>
      {showAlert && <span className={`text-sm font-semibold text-red-600`}>Tambah pesanan dulu bro!</span>}
    </div>
  );
};
