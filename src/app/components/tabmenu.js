"use client";

export const TabMenu = ({ menusType, onClick, menuCards }) => {

  return (
    <div className="grid max-h-[36px]">
      <div className="flex text-[#878988] text-xs font-medium max-h-[36px] space-x-3 overflow-scroll no-scrollbar">
        {menusType.map((data, idx) => {
          return (
            <button
              key={idx}
              id={idx}
              className={
                menuCards == idx
                  ? "px-[14px] py-[10px] max-h-[36px] whitespace-nowrap text-white bg-[#008C4D] rounded-lg transition-all"
                  : "px-[14px] py-[10px] max-h-[36px] whitespace-nowrap hover:text-white hover:bg-[#008C4D] active:bg-[#008C4D] bg-[#F2F1F1] rounded-lg transition-all"
              }
              onClick={onClick}
            >
              {data}
            </button>
          );
        })}
      </div>
    </div>
  );
}
