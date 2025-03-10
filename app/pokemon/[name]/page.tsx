"use client";
import Header from "@/components/Header";
import { useGlobalContext } from "@/context/globalContext";
import usePokemonData from "@/context/usePokemonData";
import { typeColor } from "@/utils/colors";
import { volumeHigh } from "@/utils/Icons";
import { Ruler, Weight } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const { fetchPokemonByName, loading, activePokemon } = useGlobalContext();
  const { name } = useParams();

  // get pokemon by name
  useEffect(() => {
    if (typeof name === "string") {
      fetchPokemonByName(name);
    }
  }, [name]);
  const randomIndex = Math.floor(
    Math.random() * (activePokemon?.types?.length || 1)
  );

  const pokemonImage =
    activePokemon?.sprites?.other?.home?.front_shiny ||
    activePokemon?.sprites?.other?.showdown?.front_default ||
    activePokemon?.sprites?.front_default;
  console.log( activePokemon?.types?.[0]?.type?.name && `/icons/${activePokemon?.types[0]?.type?.name}.svg`)
  return (
    <main>
      <Header />

      {!loading && (
        <section
          className="px-16 py-8 min-h-[90vh]  grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{
            background: activePokemon?.types[randomIndex]?.type?.name
              ? typeColor[activePokemon?.types[randomIndex]?.type?.name]
              : "#ffffff",
          }}
        >
          <div className="flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-6xl font-bold capitalize text-white drop-shadow-sm">
                {activePokemon?.name}
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Abilities</h2>
                <ul className="flex gap-2">
                  {activePokemon?.abilities.map(
                    (ability: any, index: number) => (
                      <li
                        key={index}
                        className="px-4 py-2 flex items-center gap-2 text-sm font-bold bg-white text-[#54a0ff] rounded-full"
                      >
                        {ability.ability.name}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Types</h2>

                <ul className="flex flex-wrap gap-2">
                  {activePokemon?.types.map((type: any, index: number) => (
                    <li
                      key={index}
                      className="px-4 py-2 flex items-center gap-2 text-sm font-bold bg-zinc-700 text-white rounded-full"
                    >
                      {type.type.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Base Stats</h2>
              <ul className="flex flex-col gap-4">
                {activePokemon?.stats.map((stat: any, index: number) => (
                  <li key={index} className="flex flex-col gap-1">
                    <div className="flex items-center gap-4">
                      <span className="capitalize">{stat.stat.name}</span>
                      <span className="font-bold">{stat.base_stat}</span>
                    </div>

                    <div className="w-full h-3 bg-white/15 rounded-md overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-md bg-white`}
                        style={{
                          width: `${(stat.base_stat / 200) * 100}%`, // Normalize to max 200
                        }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2 flex gap-4">
              <p className="p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg">
                <span className="text-sm flex items-center gap-2">
                  <Ruler size={18} />
                  Height
                </span>
                {activePokemon?.height} m
              </p>
              <p className="p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg">
                <span className="text-sm flex items-center gap-2">
                  <Weight size={18} />
                  Weight
                </span>
                {activePokemon?.weight} kg
              </p>
              <p className="p-4 flex flex-col items-center justify-center uppercase text-gray-600 font-bold bg-white rounded-lg">
                <span className="text-sm flex items-center gap-2">
                  <Weight size={18} />
                  Base Ex
                </span>
                {activePokemon?.base_experience} xp
              </p>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            {activePokemon?.types?.[0]?.type?.name && (
              <Image
                src={`/icons/${activePokemon?.types[0]?.type?.name}.svg`}
                alt="pokemon type"
                width={700}
                height={700}
                className="absolute opacity-15 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              />
            )}

            <Image
              src={pokemonImage}
              alt="pokemon image"
              width={500}
              height={500}
              className="relative z-10 filter drop-shadow-lg"
            />
          </div>
        </section>
      )}

      {loading && (
        <div className="h-[80vh] flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
    </main>
  );
}

export default page;
