"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/detento/${inputValue}`);
      }}
      className="w-full flex items-center gap-x-4 py-3 px-4 rounded-lg bg-[#f0eff0]"
    >
      <PiMagnifyingGlass className="text-2xl text-black/30" />
      <input
        type="number"
        className="w-full bg-transparent focus:outline-none"
        placeholder="Procure por IDs de detentos"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 bg-[#9006a7] hover:bg-[#7e1391] transition-colors  py-1 text-white rounded-lg"
      >
        Pesquisar
      </button>
    </form>
  );
}
