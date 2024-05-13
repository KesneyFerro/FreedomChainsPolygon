"use client";

import { useParams } from "next/navigation";
import SearchBar from "@/app/components/nav/seachBar";
import { useReadContract } from "wagmi";
import { abiData } from "@/app/abis/abi";
import { PiSpinner } from "react-icons/pi";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Detento({}) {
  const reportsAvailable = [
    "1234",
    "2396",
    "2960",
    "4992",
    "5832",
    "5990",
    "7107",
    "7438",
    "7643",
    "8748",
    "9876",
    "9836",
  ];
  const params = useParams<{ detento: string }>();
  const {
    data: prisioneiro,
    error,
    isPending,
  } = useReadContract({
    abi: abiData,
    address: "0xEefE26d1630E33Eab9f3E1C7527cE9A260Ec078a",
    functionName: "getPrisonerInfo",
    chainId: 2442,
    args: [BigInt(params.detento)],
  });

  const {
    data: behavorRecords,
    error: errorBehavorRecords,
    isPending: isPendingBehavorRecords,
  } = useReadContract({
    abi: abiData,
    address: "0xEefE26d1630E33Eab9f3E1C7527cE9A260Ec078a",
    functionName: "getBehaviorRecords",
    chainId: 2442,
    args: [BigInt(params.detento)],
  });

  const [comportamentoAnalytic, setComportamentoAnalytic] = useState<any>([]);

  useEffect(() => {
    if (behavorRecords) {
      fetch("https://fastapi-example-wxta.onrender.com/historico/json", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_detento: params.detento,
          historico: (behavorRecords as any[])?.map((record: any) => ({
            comportamento: record.behavior,
            comentario: record.comment,
            data: new Date(Number(record.date) * 1000).toLocaleDateString(),
          })),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(JSON.parse(data));
          setComportamentoAnalytic(JSON.parse(data));
        });
    }
  }, [behavorRecords, params.detento]);

  console.log(comportamentoAnalytic);

  if (isPending)
    return (
      <div className="mt-10 w-full flex justify-center items-center">
        <PiSpinner className="text-2xl text-[#9006a7] animate-spin" />
      </div>
    );

  if (
    !prisioneiro ||
    error ||
    (prisioneiro as any)?.id != BigInt(params.detento)
  ) {
    return (
      <div className="mt-10 w-full flex justify-center items-center">
        <h1 className="text-lg text-[#9006a7] font-semibold text-pretty">
          Este Detento não existe!
        </h1>
      </div>
    );
  }
  console.log(prisioneiro);
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
    <>
      <SearchBar />

      <section className="mt-5 pb-5 mb-5 flex flex-col w-full rounded-lg overflow-hidden drop-shadow-lg bg-white">
        <div
          id="userCard"
          className="w-full gap-3 max-sm:flex-wrap flex items-center justify-between px-5 rounded-b-lg drop-shadow-md py-5 bg-[#b446c6]"
        >
          <div>
            <h1 className=" font-medium text-white">
              Detento {params.detento}
            </h1>
            <h3 className={`text-sm text-gray-100`}>
              {"0xb7D3F862ebBed6C5E61B76e407ce28ea16aD1289".slice(0, 16)}...
            </h3>
          </div>
          <div
            className={`max-sm:w-full flex flex-col  font-medium  px-4  py-1.5 rounded-md text-center leading-tight text-[#9006a7] ${
              howLongUntilRelease()[1] ? "bg-[#fff]" : "bg-[#f8cbff]"
            }`}
          >
            <h4>{howLongUntilRelease()[1] ? "Liberado há:" : "Saída em:"}</h4>
            <h3>{howLongUntilRelease()[0]}</h3>
          </div>
        </div>
        <div className="px-4 py-5 flex flex-col gap-y-3">
          <div className="bg-[#9a35aa] rounded-lg flex-wrap gap-x-3 flex items-center justify-between px-4 py-4">
            <h2 className="text-white">Identificador do detento:</h2>
            <h3 className="max-sm:w-full  text-white bg-[#b246c4] px-3 py-0.5 rounded-md">
              {(prisioneiro as any)?.id.toString()}
            </h3>
          </div>
          <div className="bg-[#9a35aa] rounded-lg flex-wrap gap-x-3 flex items-center justify-between px-4 py-4">
            <h2 className="text-white">Penitenciária:</h2>
            <h3 className="max-sm:w-full  text-white bg-[#b246c4] px-3 py-0.5 rounded-md">
              {(prisioneiro as any)?.createdBy.slice(0, 16)}...
            </h3>
          </div>
          <div className="bg-[#9a35aa] rounded-lg flex-wrap gap-x-3 flex items-center justify-between px-4 py-4">
            <h2 className="text-white">Data de Prisão:</h2>
            <h3 className="max-sm:w-full  text-white bg-[#b246c4] px-3 py-0.5 rounded-md">
              {new Date(
                Number((prisioneiro as any)?.prisonDate) * 1000
              ).toLocaleDateString()}
            </h3>
          </div>
          <div className="bg-[#9a35aa] rounded-lg flex-wrap gap-x-3 flex items-center justify-between px-4 py-4">
            <h2 className="text-white">Tempo Restante:</h2>
            <h3 className="max-sm:w-full  text-white bg-[#b246c4] px-3 py-0.5 rounded-md">
              {howLongUntilRelease()[0]}
            </h3>
          </div>
        </div>

        <div className="flex items-center max-sm:flex-wrap justify-between px-4 gap-5 ">
          <div className="w-full bg-[#9a35aa] rounded-lg flex items-center justify-center flex-col gap-y-2 px-4 py-4">
            <h2 className="text-white text-center">Livros Lidos:</h2>
            <h3 className="text-white bg-[#b246c4] text-center px-3 py-0.5 rounded-md">
              {comportamentoAnalytic?.atividades_ressocializacao?.leitura
                .livros_lidos ? (
                `${comportamentoAnalytic?.atividades_ressocializacao?.leitura.livros_lidos} Livros`
              ) : (
                <PiSpinner className="text-2xl text-[#fff] animate-spin" />
              )}
            </h3>
          </div>
          <div className="w-full bg-[#9a35aa] rounded-lg flex items-center justify-center flex-col gap-y-2 px-4 py-4">
            <h2 className="text-white text-center">Tempo Estudado:</h2>
            <h3 className="text-white bg-[#b246c4] text-center px-3 py-0.5 rounded-md">
              {comportamentoAnalytic?.atividades_ressocializacao?.estudo
                .horas_estudo ? (
                `${comportamentoAnalytic?.atividades_ressocializacao?.estudo.horas_estudo} horas`
              ) : (
                <PiSpinner className="text-2xl text-[#fff] animate-spin" />
              )}
            </h3>
          </div>
          <div className="w-full bg-[#9a35aa] rounded-lg flex items-center justify-center flex-col gap-y-2 px-4 py-4">
            <h2 className="text-white text-center">Tempo Trabalhado:</h2>
            <h3 className="text-white bg-[#b246c4] text-center px-3 py-0.5 rounded-md">
              {comportamentoAnalytic?.atividades_ressocializacao?.trabalho
                .dias_trabalhados ? (
                `${comportamentoAnalytic?.atividades_ressocializacao?.trabalho.dias_trabalhados} dias`
              ) : (
                <PiSpinner className="text-2xl text-[#fff] animate-spin" />
              )}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 gap-x-5 mt-5 ">
          <section className="w-full bg-[#9a35aa] rounded-lg flex p-4 flex-col gap-y-3">
            <h4 className="text-white font-medium">Histórico</h4>

            <div className="p-3 rounded-md bg-[#ca61db]">
              <Link
                target="_blank"
                href={
                  reportsAvailable.includes(params.detento)
                    ? `/Reports/${params.detento}/relatorio.pdf`
                    : ""
                }
                className={
                  reportsAvailable.includes(params.detento)
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }
              >
                <button
                  disabled={!reportsAvailable.includes(params.detento)}
                  className="rounded-md disabled:text-white/50 disabled:bg-[#8d4c99]  bg-[#b246c4] text-white px-3 py-2 w-full uppercase "
                >
                  Baixar Histórico Completo
                </button>
              </Link>
            </div>

            {(behavorRecords as any)?.map((record: any, index: number) => (
              <div
                key={index}
                className="p-3 flex flex-col rounded-md bg-[#ca61db]"
              >
                <div className="flex w-full flex-wrap justify-between items-center">
                  <span className="text-white">Comportamento</span>
                  <span className=" rounded-md bg-[#b246c4] text-white px-2 py-1">
                    {record?.behavior}
                  </span>
                </div>
                <div className="mt-3 rounded-md bg-[#b246c4] text-white px-3 py-2 w-full  ">
                  {record?.comment}
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>
    </>
  );
}
