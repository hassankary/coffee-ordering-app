"use client";
import { Modal } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

export const ModalCard = ({
  detailModal,
  show,
  onClose,
  onClick,
  setDetailModal,
  ...props
}) => {

  return (
    <Modal
      className="flex bottom-0 right-0 top-0 left-0 pt-[110px] pb-[180px]"
      dismissible
      size={"sm"}
      show={show}
      onClose={onClose}
      {...props}
    >
      <div className="flex w-full justify-center bg-transparent">
        <div className="flex w-full max-w-[414px] p-6 justify-center rounded-2xl bg-slate-50">
          <div className="flex-col space-y-5">
            <Image
              className={"rounded-lg"}
              src={detailModal?.pic}
              width={330}
              height={330}
              alt="product image"
              quality={100}
              unoptimized
            />
            <div className="flex-col text-black font-semibold space-y-2">
              <button className="text-lg focus:border-none active:border-none">{detailModal?.name}</button>
              <div className="font-normal">{detailModal?.description}</div>
              <div className=" text-green-600">
                Rp.{" "}
                {detailModal?.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              {detailModal?.amount !== 0 && (
                <input
                  id="inputNotes"
                  type="text"
                  placeholder="Notes..."
                  maxLength="50"
                  value={detailModal?.notes}
                  onChange={(e) =>
                    setDetailModal({ ...detailModal, notes: e.target.value })
                  }
                  className="w-full rounded-xl"
                  autoFocus={false}
                />
              )}
              <div className="flex justify-center">
                <button
                  onClick={onClick}
                  className="px-5 py-3 bg-red-600 text-white rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
