"use client";
import Header from "../../components/header";

const page = "Favorite"

export default function Favorite() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-[414px] font-sans">
        {/* ============ HEADER ============ */}
        <Header page={page} />
        <div className="mt-[52px] text-white">Favorite Page</div>
      </div>
    </div>
  );
}
