import { Search } from "lucide-react";
import React from "react";

const Searchbar = ({ search, handleSearch }) => {
  return (
    <div className="bg-slate-900 py-4 flex px-4 lg:px-32 justify-between flex-row w-full">
      <input
        type="text"
        className="rounded-md py-2 px-4 font-medium placeholder-slate-500 bg-slate-800 text-white border-none w-full focus:outline-none focus:ring-0"
        placeholder="Search for a Movie, Genre or Actor"
        value={search}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <button
        type="submit"
        className="flex items-center min-w-fit rounded-full p-2 bg-slate-800 hover:bg-opacity-80 ml-2"
      >
        <Search className="text-white" size={24} />
      </button>
    </div>
  );
};

export default Searchbar;
