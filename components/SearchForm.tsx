"use client";
import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { useGlobalContext } from "@/context/globalContext";

function SearchForm() {
  const { searchQuery, handleSearchChange } = useGlobalContext();
  
  return (
    <form className="relative w-[80%] md:w-[50%]">
      <Input
        value={searchQuery}
        onChange={(e)=>{
          handleSearchChange(e.target.value);
        }}
        placeholder="Search Pokemon!"
        className="u-shadow-1 w-full py-5 px-6 rounded-xl text-lg outline-none text-gray-800"
      />
      <span className="absolute right-6 text-3xl top-[50%] translate-y-[-50%] text-gray-300 pointer-events-none rotate-90">
        <SearchIcon/>
      </span>
    </form>
  );
}

export default SearchForm;