
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCandidateContext } from "@/context/CandidateContext";

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useCandidateContext();

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by name, email, phone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4"
      />
    </div>
  );
};

export default SearchBar;
