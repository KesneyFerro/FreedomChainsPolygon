"use client";

import { abiData } from "@/app/abis/abi";
import { useReadContract } from "wagmi";

export default function CustomNavMenu({
  menuNames,
  selectIndex,
  setSelectedIndex,
}: {
  menuNames: string[];
  selectIndex: number;
  setSelectedIndex: (index: number) => void;
}) {
  const {
    data: prisioneiros,
    error,
    isPending,
  } = useReadContract({
    abi: abiData,
    address: "0xEefE26d1630E33Eab9f3E1C7527cE9A260Ec078a",
    functionName: "getAllPrisonerDetails",
    chainId: 2442,
    args: [],
  });

  return (
    <div className="mt-5 w-full flex flex-col shadow-lg overflow-hidden border-4 bg-[#f7f6f7]  border-white rounded-xl">
      <div className="z-[2] w-full flex gap-x-5 drop-shadow-md justify-between items-center rounded-t-lg  rounded-b-lg bg-white px-6 py-5">
        <div className="flex  flex-col">
          <h3 className="font-semibold text-black">
            {(prisioneiros as any[])?.length || "---"}
          </h3>
          <span className="text-gray-500">Detentos Registrados</span>
        </div>
        <div className="flex  flex-col">
          <h3 className="font-semibold text-black">
            {
              // filter the prisoners that have a release date that is less than 1 month
              (prisioneiros as any[])?.filter((prisioneiro) => {
                const finalDate = new Date(
                  Number((prisioneiro as any)?.releaseDate) * 1000 || 0
                );
                const difference =
                  finalDate.getTime() -
                  new Date(
                    new Date().setDate(new Date().getDate() - 1)
                  ).getTime();
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const months = Math.floor(days / 30);
                return months <= 1 && days > 0;
              }).length || "---"
            }
          </h3>
          <span className="text-gray-500">Próximos Liberados</span>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-black">
            {(prisioneiros as any[])?.filter(
              (prisioneiro) =>
                new Date(Number(prisioneiro.releaseDate) * 1000).getTime() <
                new Date(new Date().setDate(new Date().getDate() - 1)).getTime()
            ).length || "---"}
          </h3>
          <span className="text-gray-500">Detentos Liberados</span>
        </div>
      </div>
      <div className="z-[1] bg-[#f7f6f7] px-2 gap-x-5 py-2 rounded-b-xl flex w-full justify-between">
        {menuNames.map((name, index) => (
          <button
            onClick={() => setSelectedIndex(index)}
            key={index}
            className={`flex w-full justify-center items-center gap-x-4 px-4 py-3 rounded-lg cursor-pointer hover:bg-white transition-colors ${
              selectIndex === index ? "bg-white drop-shadow-md" : ""
            }`}
          >
            <span
              className={`${
                selectIndex === index
                  ? "text-[#7d2b8a] font-semibold"
                  : "text-gray-500 font-medium"
              } `}
            >
              {name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
