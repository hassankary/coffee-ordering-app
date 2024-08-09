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
      className="flex items-center justify-center"
      dismissible
      size={"sm"}
      show={show}
      onClose={onClose}
      {...props}
    >
      <div className="flex w-full justify-center items-center">
        <div className="flex w-full max-w-[414px] p-4 justify-center rounded-2xl bg-slate-50">
          <div className="flex-col space-y-4">
            <div>
              <Image
                className={"rounded-t-lg w-full"}
                src={detailModal?.pic}
                width={330}
                height={330}
                alt="product image"
                quality={100}
                unoptimized
              />
              <button className="w-full text-md py-1 font-semibold text-white focus:border-none active:border-none rounded-b-lg bg-green-500">
                {detailModal?.name}
              </button>
            </div>
            <div className="flex-col text-black font-semibold space-y-1">
              <div className="font-normal text-sm">
                {detailModal?.description}
              </div>
              <div className=" text-green-600">
                Rp.{" "}
                {detailModal?.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </div>
              {detailModal?.amount !== 0 && (
                <div>
                  <input
                    id="inputNotes"
                    type="text"
                    placeholder="Notes..."
                    maxLength="50"
                    value={detailModal?.notes}
                    onChange={(e) =>
                      setDetailModal({ ...detailModal, notes: e.target.value })
                    }
                    className="w-full rounded-xl mt-1"
                    autoFocus={false}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-center">
              {detailModal?.amount !== 0 ? (
                <button
                  onClick={onClick}
                  className="px-4 py-2 font-semibold bg-green-600 text-white active:scale-[95%] active:bg-green-500 rounded-xl transition-all"
                >
                  Ok
                </button>
              ) : (
                <button
                  onClick={onClick}
                  className="px-4 py-2 font-semibold bg-red-600 text-white active:scale-[95%] active:bg-red-500 rounded-xl transition-all"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
