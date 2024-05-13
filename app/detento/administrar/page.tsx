"use client";

import CustomNavMenu from "@/app/components/menu/CustomNavMenu";
import { Button, DatePicker, Input, Textarea } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { FormEvent, SetStateAction, useState } from "react";

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { abiData } from "@/app/abis/abi";
import { WalletOptions } from "@/app/components/profile/wallet-option";
import { config } from "@/config";
import { switchChain } from "wagmi/actions";
import { polygonZkEvmCardona } from "wagmi/chains";
import { motion } from "framer-motion";
import AddComportamento from "./addComportamento";
import TokenShop from "./tokenShop";

export default function AdministrarDetentos() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const [selectedMenu, setSelectedMenu] = useState(0);
  const [identificadorDetentoAdd, setIdentificadorDetentoAdd] = useState("");
  const [dataPrisao, setDataPrisao] = useState<any>(null);
  const [dataLiberacao, setDataLiberacao] = useState<any>(null);

  const [
    identificadorDetentoComportamento,
    setIdentificadorDetentoComportamento,
  ] = useState("");
  const [dataComportamento, setDataComportamento] = useState("");
  const [tipoComportamento, setTipoComportamento] = useState("");

  const { data: wallets } = useReadContract({
    abi: abiData,
    address: "0xEefE26d1630E33Eab9f3E1C7527cE9A260Ec078a",
    functionName: "getAuthorizedAddresses",
    chainId: 2442,
    args: [],
  });

  const handleAddDetento = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await switchChain(config, { chainId: polygonZkEvmCardona.id });
    writeContract({
      address: "0xEefE26d1630E33Eab9f3E1C7527cE9A260Ec078a",
      functionName: "registerPrisonerInfo",
      abi: abiData,
      chainId: 2442,
      args: [
        BigInt(identificadorDetentoAdd),
        BigInt(dataPrisao.toDate().getTime() / 1000),
        BigInt(dataLiberacao.toDate().getTime() / 1000),
        true,
      ],
    });
    setIdentificadorDetentoAdd("");
    setDataPrisao(null);
    setDataLiberacao(null);
  };

  const handleAddComportamento = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await switchChain(config, { chainId: polygonZkEvmCardona.id });
    writeContract({
      address: "0xEefE26d1630E33Eab9f3E1C7527cE9A260Ec078a",
      functionName: "addBehaviorRecord",
      abi: abiData,
      chainId: 2442,
      args: [
        identificadorDetentoComportamento,
        tipoComportamento,
        dataComportamento,
      ],
    });
    setIdentificadorDetentoComportamento("");
    setTipoComportamento("");
    setDataComportamento("");
  };

  console.log(error?.message);

  const { isConnected, address } = useAccount();

  if (!isConnected) {
    return (
      <div className="w-full flex mt-8 flex-col gap-y-5 justify-center items-center">
        <h1 className="text-3xl text-[#7c1c8b] font-bold">
          Conecte sua Carteira
        </h1>
        <WalletOptions />
      </div>
    );
  }

  // console.log(wallets);
  return (
    <div className="flex flex-col w-full">
      {!(wallets as String[])?.includes(address || "") && (
        <div className="w-full rounded-md bg-red-700 px-4 py-2 ">
          <h1 className="text-white">
            Você não tem permissão para executar as funções dessa página
          </h1>
        </div>
      )}

      <CustomNavMenu
        menuNames={["Add Detento", "Add Comportamento", "TokenShop"]}
        selectIndex={selectedMenu}
        setSelectedIndex={setSelectedMenu}
      />

      {selectedMenu === 0 && (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={selectedMenu}
          onSubmit={(e: FormEvent<HTMLFormElement>) => handleAddDetento(e)}
          className="flex flex-col gap-y-3 mt-5"
        >
          <Input
            isRequired
            label="Identificador do Detento"
            type="number"
            isDisabled={isPending}
            value={identificadorDetentoAdd}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setIdentificadorDetentoAdd(e.target.value)
            }
          />
          <I18nProvider locale="pt-BR">
            <DatePicker
              isDisabled={isPending}
              isRequired
              label="Data de Prisão"
              className=""
              value={dataPrisao}
              onChange={setDataPrisao}
            />
          </I18nProvider>
          <I18nProvider locale="pt-BR">
            <DatePicker
              isDisabled={isPending}
              isRequired
              label="Data de Liberação"
              className=""
              value={dataLiberacao}
              onChange={setDataLiberacao}
            />
          </I18nProvider>
          <Button
            isDisabled={isPending}
            type="submit"
            color={error ? "danger" : "secondary"}
            isLoading={isPending}
          >
            {error ? "Ocorreu um erro" : "Adicionar Detento"}
          </Button>
          {hash && (
            <span>
              Transação enviada com sucesso:{" "}
              <a
                href={`https://cardona-zkevm.polygonscan.com/tx/${hash}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                Ver transação.
              </a>
            </span>
          )}
        </motion.form>
      )}
      {selectedMenu === 1 && <AddComportamento key={selectedMenu} />}
      {selectedMenu === 2 && <TokenShop key={selectedMenu} />}
    </div>
  );
}
