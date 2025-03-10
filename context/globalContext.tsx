"use client";
import React, { createContext, useContext } from "react";
import usePokemonData from "./usePokemonData";
import { IPokemonDetails } from "@/utils/types";

interface IGlobalContext {
  loading: boolean;
  searchQuery: string;
  loadMore: () => void;
  activePokemon?: IPokemonDetails;
  handleSearchChange: (e: any) => void;
  pokemonListDetails: IPokemonDetails[];
  fetchPokemonByName: (name: string) => void;
}

const defaultContext: IGlobalContext = {
  loading: false,
  searchQuery: "",
  loadMore: () => {},
  pokemonListDetails: [],
  activePokemon: undefined,
  handleSearchChange: () => {},
  fetchPokemonByName: () => {},
};

const GlobalContext = createContext<IGlobalContext>(defaultContext);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
