"use client";

import { useEffect, useState } from "react";
import Profile from "./components/profile/profile";
import { WalletOptions } from "./components/profile/wallet-option";
import { Account } from "./components/profile/account";
import { BaseError, useAccount, useReadContract } from "wagmi";
import { abiData } from "./abis/abi";
import { parseUnits } from "viem";
import Navbar from "./components/nav/nav";
import SearchBar from "./components/nav/seachBar";
import CustomNavMenu from "./components/menu/CustomNavMenu";
import UserCard from "./components/users/userCard";
import { PiSpinner } from "react-icons/pi";
import { motion } from "framer-motion";

export default function Home() {
  // const {
  //   data: idsPrisioneiro,
  //   error,
  //   isPending,
  // } = useReadContract({
  //   abi: abiData,
  //   address: "0x13258E8be2e5b99A462f7F20b80035Bfcbe009f5",
  //   functionName: "getAllPrisonerIDs",
  //   chainId: 2442,
  //   args: [],
  // });

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

  const [selectedMenu, setSelectedMenu] = useState(0);

  return (
    <main className="flex w-full flex-col ">
      <SearchBar />
      <CustomNavMenu
        menuNames={["Todos", "Próximo", "Liberados"]}
        selectIndex={selectedMenu}
        setSelectedIndex={setSelectedMenu}
      />
      {isPending && (
        <div className="mt-10 w-full flex justify-center items-center">
          <PiSpinner className="text-2xl text-[#9006a7] animate-spin" />
        </div>
      )}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={selectedMenu}
        className="w-full flex flex-col gap-y-4 mt-5"
      >
        {selectedMenu == 0 &&
          (prisioneiros as any[])?.map((prisioneiro) => {
            return (
              <UserCard
                key={prisioneiro.id.toString()}
                prisonerId={prisioneiro.id}
                selectedMenu={selectedMenu}
              />
            );
          })}
        {selectedMenu == 1 &&
          (prisioneiros as any[])
            ?.filter((prisioneiro) => {
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
            })
            ?.map((prisioneiro) => (
              <UserCard
                key={prisioneiro.id.toString()}
                prisonerId={prisioneiro.id}
                selectedMenu={selectedMenu}
              />
            ))}
        {selectedMenu == 2 &&
          (prisioneiros as any[])
            ?.filter(
              (prisioneiro) =>
                new Date(Number(prisioneiro.releaseDate) * 1000).getTime() <
                new Date(new Date().setDate(new Date().getDate() - 1)).getTime()
            )
            ?.map((prisioneiro) => (
              <UserCard
                key={prisioneiro.id.toString()}
                prisonerId={prisioneiro.id}
                selectedMenu={selectedMenu}
              />
            ))}
      </motion.section>
    </main>
  );
}
