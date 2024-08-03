"use client";
import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import checkList from "@/app/components/lottie/success.json";
import { useEffect, useRef, useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { TbPlayerTrackNextFilled } from "react-icons/tb";


export const Done = ({ checkout, discountAmount, totalPrice }) => {
  const [dateOrder, setDateOrder] = useState(null);
  const [numbers, setNumbers] = useState({ table: [], order: [] });

  useEffect(() => {
    const generateRandomNumbersOrder = (x) => {
      return Array.from({ length: x }, () => Math.floor(Math.random() * 10));
    };

    setDateOrder(new Date());
    setNumbers((n) => ({
      ...n,
      table: generateRandomNumbersOrder(2),
      order: generateRandomNumbersOrder(6),
    }));
  }, []);

  console.log("numbers ", numbers);

  if (!dateOrder) {
    return (
      <div className=" w-full flex justify-center font-mono">
        <div className="flex flex-col px-4 justify-center min-h-screen w-[414px] bg-blue-800 content-center"></div>
      </div>
    );
  }

  const formattedDate = dateOrder.toLocaleDateString();
  const formattedTime = dateOrder.toLocaleTimeString();

  return (
    <>
      <title>Coffee Ordering Mobile Web by Hassan Kaeru</title>
      <div className=" w-full flex justify-center font-mono">
        <div className="flex flex-col justify-center itemsb min-h-screen w-[414px] bg-green-500 content-center">
          {/* <div className="flex justify-center items-center -mt-[95px]">
            <Lottie
              animationData={checkList}
              height={300}
              width={300}
              // className=" max-w-[300px]"
            />
          </div>*/}
          <div className=" flex flex-col justify-center items-center mb-20">
            <div className=" z-10 flex p-4 justify-center rounded-full bg-white hover:scale-110 active:scale-110 transition-all ">
              <span className=" fixed mt-2.5 -mr-[24px] w-3 h-3 rounded-full bg-green-400 animate-ping"></span>
              <span className=" fixed mt-3 -mr-6 w-2 h-2 rounded-full bg-green-400 "></span>
              <AiOutlineFileDone className="flex w-16 h-16 p-3 text-white rounded-full bg-black shadow-lg" />
            </div>
            <div className="flex w-full bg-white h-[3px] -mt-[48px]"></div>
          </div>
          {/* <div className=" flex justify-center mb-10 text-white">
            Your order has been recorded.
          </div> */}
          {/* ========= LINE ========= */}
          <div className="flex mx-4 h-6 bg-black -mb-4 rounded-full"></div>
          <div className="flex flex-col px-6">
            <div className="flex flex-col items-center justify-center p-2 text-black bg-white border">
              <div className="flex w-full justify-center items-center py-2 font-bold font-sans text-3xl hover:text-white bg-green-500 transition-all">
                <div className="flex items-center py-2 ">
                  {/* <AiOutlineFileDone className=" w-10 h-10" /> */}
                  <div className="flex justify-center">Receipt</div>
                </div>
              </div>
              <div className="w-full space-y-2">
                <div className="flex flex-col px-2 py-2 border-b border-slate-500">
                  <div className="flex">
                    <span className=" w-1/4">On Shift</span>
                    <p className=" w-3/4">: Hassan Askary</p>
                  </div>
                  <div className="flex">
                    <span className=" w-1/4">Bill No</span>
                    <p className=" w-3/4">
                      : #00
                      {numbers?.order.map((number, idx) => (
                        <span key={idx}>{number}</span>
                      ))}
                    </p>
                  </div>
                  <div className="flex">
                    <span className=" w-1/4">Table</span>
                    <p className="w-3/4">
                      {" "}
                      : #0
                      {numbers?.table.map((number, idx) => (
                        <span key={idx}>{number}</span>
                      ))}
                    </p>
                  </div>
                  <div className="flex">
                    <span className=" w-1/4">Date</span>
                    <p className=" w-3/4">
                      : {formattedDate} | {formattedTime}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <h1 className=" pb-1 text-center">Order Items:</h1>
                  <table className="border-spacing-3 table-fixed">
                    {/* <thead>
                    <tr className="border-b border-slate-500 justify-between">
                      <th className="">Qty</th>
                      <th className="">Menu</th>
                      <th className="">Price</th>
                    </tr>
                  </thead> */}
                    <tbody>
                      {checkout?.order.map((data, idx) => {
                        return (
                          <tr key={idx}>
                            <td className="text-center">{data.amount}x</td>
                            <td className="">{data.name}</td>
                            <td className="text-right">
                              Rp{" "}
                              {(data.price * data.amount)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="border-b border-slate-500"></div>
                <div className="flex flex-col px-2 w-full ">
                  <table>
                    <tbody className="font-bold">
                      <tr>
                        <td className="">{totalPrice.length} item</td>
                        <td className="text-right"></td>
                      </tr>
                      {discountAmount !== 0 && (
                        <>
                          <tr className="">
                            <td className="">Total</td>
                            <td className="text-right">
                              Rp{" "}
                              {totalPrice.amount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </td>
                          </tr>
                          <tr className="text-green-500">
                            <td className="">Diskon</td>
                            <td className="text-right">
                              - Rp{" "}
                              {((discountAmount / 100) * totalPrice.amount)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </td>
                          </tr>
                        </>
                      )}
                      <tr>
                        <td className="">Grand Total</td>
                        <td className="text-right">
                          Rp{" "}
                          {totalPrice?.discounted
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 text-black -mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="white"
                fillOpacity="1"
                d="M0,288L6.2,245.3C12.3,203,25,117,37,101.3C49.2,85,62,139,74,144C86.2,149,98,107,111,96C123.1,85,135,107,148,138.7C160,171,172,213,185,229.3C196.9,245,209,235,222,202.7C233.8,171,246,117,258,106.7C270.8,96,283,128,295,154.7C307.7,181,320,203,332,218.7C344.6,235,357,245,369,218.7C381.5,192,394,128,406,117.3C418.5,107,431,149,443,144C455.4,139,468,85,480,96C492.3,107,505,181,517,208C529.2,235,542,213,554,197.3C566.2,181,578,171,591,144C603.1,117,615,75,628,80C640,85,652,139,665,181.3C676.9,224,689,256,702,229.3C713.8,203,726,117,738,122.7C750.8,128,763,224,775,250.7C787.7,277,800,235,812,192C824.6,149,837,107,849,106.7C861.5,107,874,149,886,160C898.5,171,911,149,923,149.3C935.4,149,948,171,960,181.3C972.3,192,985,192,997,208C1009.2,224,1022,256,1034,234.7C1046.2,213,1058,139,1071,144C1083.1,149,1095,235,1108,256C1120,277,1132,235,1145,202.7C1156.9,171,1169,149,1182,138.7C1193.8,128,1206,128,1218,160C1230.8,192,1243,256,1255,256C1267.7,256,1280,192,1292,149.3C1304.6,107,1317,85,1329,112C1341.5,139,1354,213,1366,213.3C1378.5,213,1391,139,1403,133.3C1415.4,128,1428,192,1434,224L1440,256L1440,0L1433.8,0C1427.7,0,1415,0,1403,0C1390.8,0,1378,0,1366,0C1353.8,0,1342,0,1329,0C1316.9,0,1305,0,1292,0C1280,0,1268,0,1255,0C1243.1,0,1231,0,1218,0C1206.2,0,1194,0,1182,0C1169.2,0,1157,0,1145,0C1132.3,0,1120,0,1108,0C1095.4,0,1083,0,1071,0C1058.5,0,1046,0,1034,0C1021.5,0,1009,0,997,0C984.6,0,972,0,960,0C947.7,0,935,0,923,0C910.8,0,898,0,886,0C873.8,0,862,0,849,0C836.9,0,825,0,812,0C800,0,788,0,775,0C763.1,0,751,0,738,0C726.2,0,714,0,702,0C689.2,0,677,0,665,0C652.3,0,640,0,628,0C615.4,0,603,0,591,0C578.5,0,566,0,554,0C541.5,0,529,0,517,0C504.6,0,492,0,480,0C467.7,0,455,0,443,0C430.8,0,418,0,406,0C393.8,0,382,0,369,0C356.9,0,345,0,332,0C320,0,308,0,295,0C283.1,0,271,0,258,0C246.2,0,234,0,222,0C209.2,0,197,0,185,0C172.3,0,160,0,148,0C135.4,0,123,0,111,0C98.5,0,86,0,74,0C61.5,0,49,0,37,0C24.6,0,12,0,6,0L0,0Z"
              ></path>
            </svg>
          </div>
          <div className="flex justify-center mt-[15px]">
            <Link
              href={"/"}
              className="flex p-4 justify-center text-center font-bold font-mono text-2xl bg-black text-black active:text-gray-800 active:bg-gray-800 hover:scale-110 active:scale-110 rounded-full transition-all"
            >
              <h1 className="bg-white rounded-full p-2 transition-all">

              <TbPlayerTrackNextFilled className="h-7 w-7 transition-all" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
