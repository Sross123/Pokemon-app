"use client";
import React, { createContext, useContext } from "react";
import usePokemonData from "./usePokemonData";
import { IPokemonDetails } from "@/utils/types";

interface IGlobalContext {
  fetchPokemon: (page?: number) => void;
  fetchPokemonByName: (name: string) => void;
  loadMore: () => void;
  pokemonListDetails: IPokemonDetails[];
  activePokemon?: IPokemonDetails;
  handleChange: (e: any) => void;
  loading: boolean;
}

const defaultContext: IGlobalContext = {
  fetchPokemon: () => {},
  fetchPokemonByName: () => {},
  pokemonListDetails: [],
  activePokemon: undefined,
  loadMore: () => {},
  handleChange: () => {},
  loading: false,
};

const GlobalContext = createContext<IGlobalContext>(defaultContext);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const pokemonData = usePokemonData();

  return (
    <GlobalContext.Provider value={pokemonData}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): IGlobalContext => {
  return useContext(GlobalContext);
};
