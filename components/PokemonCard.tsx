"use client";
import { typeColor } from "@/utils/colors";
import { IPokemonDetails } from "@/utils/types";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface PokemonCardProps {
  pokemon?: IPokemonDetails;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter()
  return (
    <div className="relative p-4 bg-white rounded-xl shadow-sm flex flex-col gap-3">
      <div className="flex justify-end items-center">
        <button
          className="p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 text-gray-300 border-gray-300
        hover:bg-[#00b894] hover:border-transparent hover:text-white transition-all duration-300 ease-in-out"
        onClick={()=>router.push(`/pokemon/${pokemon?.name}`)}
        >
          <ArrowRightIcon />
        </button>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <Image
            src={
              pokemon?.sprites?.other?.home?.front_default ||
              pokemon?.sprites?.front_default
            }
            alt="pokemon image"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="mb-2 flex gap-2">
            <p className="text-xs uppercase font-semibold text-gray-500">
              {pokemon?.height} m,
            </p>
            <p className="text-xs uppercase font-semibold text-gray-500">
              {pokemon?.weight} kg,
            </p>
            <p className="text-xs uppercase font-semibold text-gray-500">
              {} xp
            </p>
          </div>
          <h2 className="text-2xl text-gray-800 capitalize font-bold text-center">
            {pokemon?.name}
          </h2>
          <div className="flex justify-center gap-2">
            {pokemon?.types?.map((type: any, index: number) => (
              <p
                key={index}
                className="text-xs uppercase font-semibold text-white px-5 py-1 rounded-full"
                style={{ backgroundColor: typeColor[type?.type?.name] }}
              >
                {type.type.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
