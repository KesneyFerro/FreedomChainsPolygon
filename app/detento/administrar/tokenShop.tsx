import { config } from "@/config";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useBalance } from "wagmi";

export default function TokenShop() {
  const [tokens, setTokens] = useState(0);

  // const { data } = useBalance({
  //   address: "0xEefE26d1630E33Eab9f3E1C7527cE9A260Ec078a",
  //   config: config,
  // });

  // useEffect(() => {
  //   if (data) setTokens(parseFloat(data?.formatted) || 0);
  // }, [data, tokens]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col mt-5 justify-center items-center"
    >
      <div className="w-full max-w-[400px] flex justify-center flex-col items-center rounded-lg drop-shadow-lg bg-white p-3">
        <span className="uppercase font-light text-center text-[#7c1c8b]">
          O seu saldo é de:
        </span>
        <h3 className="mt-2 text-2xl text-center text-[#7c1c8b] font-bold">
          0 Tokens
        </h3>
      </div>

      <section className="flex flex-col mt-5 w-full gap-y-5">
        <div className="px-5 py-5 flex items-center justify-between rounded-lg bg-gray-100">
          <div className="flex flex-col gap-y-1">
            <h3 className=" text-[#7c1c8b] font-bold text-lg">Dayoff</h3>
            <span className="text-gray-400">300 Tokens</span>
          </div>

          <button
            onClick={() => {
              if (tokens >= 300) setTokens(tokens - 300);
            }}
            className="bg-[#7c1c8b] transition-all hover:bg-[#51195a] text-white px-4 py-2 rounded-lg"
          >
            Comprar
          </button>
        </div>
      </section>
    </motion.section>
  );
}
