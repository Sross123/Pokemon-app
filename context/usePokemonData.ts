import { useCallback, useEffect, useState } from "react";
import { IPokemonDetails, IPokemonList } from "@/utils/types";
import axios from "axios";
import _ from "lodash";

const baseUrl = "https://pokeapi.co/api/v2/";
const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState<IPokemonList[]>([]);
  const [allPokemon, setAllPokemon] = useState<IPokemonList[]>([]);
  const [pokemonListDetails, setPokemonListDetails] = useState<
    IPokemonDetails[]
  >([]);
  const [activePokemon, setActivePokemon] = useState<IPokemonDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currPage, setCurrPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      setPokemonListDetails(detials);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching pokemon details", error);
    }
  };

  // fetch pokemon by name
  const fetchPokemonByName = async (name?: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/pokemon/${name}`);

      setLoading(false);
      setActivePokemon(res.data);

      return res.data;
    } catch (error) {
      console.error("Error fetching pokemon by name", error);
    }
  };

  // handle change for search
  const searchPokemon = async (query: string) => {
    console.log(query, "query");
    if (!query) {
      setSearchQuery("");

      const details = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);

          return res.data;
        })
      );

      setPokemonListDetails(details);
      return;
    }

    setLoading(true);

    const filteredPokemon = allPokemon.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(query.toLowerCase());
    });

    try {
      // fetch details for the filtered pokemon
      const filtered = await Promise.all(
        filteredPokemon.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );

      setLoading(false);

      setPokemonListDetails(filtered);
    } catch (error) {
      console.error("Error searching pokemon", error);
    }
  };

  // load more
  const loadMore = () => {
    fetchPokemon(currPage + 1);
  };

  // debounce search
  const debounceSearch = _.debounce((value) => {
    searchPokemon(value);
  }, 200);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e);
    // debounceSearch(e);
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
    searchQuery,
    activePokemon,
    handleSearchChange,
    fetchPokemonByName,
    pokemonListDetails,
  };
};

export default usePokemonData;
