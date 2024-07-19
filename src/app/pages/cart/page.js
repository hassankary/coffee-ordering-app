"use client";
import Header from "../../components/header";

const page = "Cart";

export default function Cart() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-[414px] font-sans">
        {/* ============ HEADER ============ */}
        <Header page={page} />
        <div className="mt-[52px] text-white">Cart Page</div>
      </div>
    </div>
  );
}
