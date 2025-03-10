import { useCallback, useEffect, useState } from "react";
import { IPokemonDetails, IPokemonList } from "@/utils/types";
import axios from "axios";
import _ from "lodash";

const baseUrl = "https://pokeapi.co/api/v2/";
const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState<IPokemonList[]>([]);
  const [allPokemon, setAllPokemon] = useState<IPokemonList[]>([]);
  const [pokemonListDetails, setpokemonListDetails] = useState<
    IPokemonDetails[]
  >([]);
  const [activePokemon, setActivePokemon] = useState<IPokemonDetails>();
  const [originalPokemonDetails, setOriginalPokemonDetails] = useState<
    IPokemonDetails[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<number>(1);

  const fetchPokemon = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${baseUrl}pokemon?offset=${(page - 1) * 50}&limit=40`
      );
      setPokemonList((prev: any[]) => [...prev, ...res.data?.results]);
      setCurrPage(page);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching pokemon", error);
    }
  };

  // fetch all pokemon
  const fetchAllPokemon = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}pokemon?limit=1118`);
      setAllPokemon(res.data?.results);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching all pokemon", error);
    }
  };

  // fetch pokemon details
  const fetchPokemonDetails = async () => {
    setLoading(true);
    try {
      const detials = await Promise.all(
        pokemonList?.map(async (pokemon: any) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );
      setpokemonListDetails(detials);
      setOriginalPokemonDetails(detials);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching pokemon details", error);
    }
  };

  // fetch pokemon by name
  const fetchPokemonByName = useCallback(
    async (name: string) => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}pokemon/${name}`);
        setLoading(false);
        setActivePokemon(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    [name]
  );

  // debounce search
  const debounce = _.debounce((value) => {
    fetchPokemonByName(value);
  });

  // handle change for search
  const handleChange = (e: any) => {
    const searchValue = e.target.value;
    if (!searchValue) return;
    debounce(searchValue);
  };

  // load more
  const loadMore = () => {
    fetchPokemon(currPage + 1);
  };

  useEffect(() => {
    fetchPokemon();
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemonList]);

  return {
    loading,
    loadMore,
    handleChange,
    fetchPokemon,
    activePokemon,
    fetchPokemonByName,
    pokemonListDetails,
  };
};

export default usePokemonData;
