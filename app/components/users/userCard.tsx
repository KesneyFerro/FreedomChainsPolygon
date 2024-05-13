"use client";

import { abiData } from "@/app/abis/abi";
import Link from "next/link";
import { useReadContract } from "wagmi";

interface UserCardProps {
  prisonerId: BigInt;
  selectedMenu: number;
}

export default function UserCard({ prisonerId, selectedMenu }: UserCardProps) {
  const {
    data: prisioneiro,
    error,
    isPending,
  } = useReadContract({
    abi: abiData,
    address: "0xEefE26d1630E33Eab9f3E1C7527cE9A260Ec078a",
    functionName: "getPrisonerInfo",
    chainId: 2442,
    args: [prisonerId],
  });

  const howLongUntilRelease = () => {
    const initialDate = new Date(
      Number((prisioneiro as any)?.prisonDate) * 1000 || 0
    );
    const finalDate = new Date(
      Number((prisioneiro as any)?.releaseDate) * 1000 || 0
    );
    const difference =
      finalDate.getTime() -
      new Date(new Date().setDate(new Date().getDate() - 1)).getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    // return only the years if it's more than 1 year, only the months if it's more than 1 month, and only the days if it's less than 1 month
    if (years > 0) {
      return [`${years} ${years === 1 ? "ano" : "anos"}`, false];
    }
    if (months > 0) {
      return [`${months} ${months === 1 ? "mês" : "meses"}`, false];
    }
    return [
      `${Math.abs(days)} ${Math.abs(days) === 1 ? "dia" : "dias"}`,
      days <= 0,
    ];
  };

  return (
    <Link
      href={`/detento/${prisonerId}`}
      passHref
      className={`${
        howLongUntilRelease()[1] ? "bg-[#9006a7]" : "bg-white"
      }  cursor-pointer drop-shadow-md   rounded-lg flex justify-between items-center py-3 px-5 w-full gap-y-5`}
    >
      <div className="flex flex-col gap-y-1">
        <h4
          className={`${
            howLongUntilRelease()[1] ? "text-white" : "text-[#9006a7]"
          }  font-semibold`}
        >
          Detento {prisonerId.toString()}
        </h4>
        <h3
          className={`text-sm ${
            howLongUntilRelease()[1]
              ? "text-gray-200 font-light"
              : "text-gray-400"
          }`}
        >
          {(prisioneiro as any)?.createdBy.slice(0, 16)}...
        </h3>
      </div>
      <div
        className={`flex flex-col gap-y-1 font-medium  px-4  py-1.5 rounded-md text-center leading-tight text-[#9006a7] ${
          howLongUntilRelease()[1] ? "bg-[#fff]" : "bg-[#f8cbff]"
        }`}
      >
        <h4>{howLongUntilRelease()[1] ? "Liberado há:" : "Saída em:"}</h4>
        <h3>{howLongUntilRelease()[0]}</h3>
      </div>
    </Link>
  );
}
