
import React from "react";
import { CandidateProvider } from "@/context/CandidateContext";
import CandidateTable from "@/components/CandidateTable";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import FilterDrawer from "@/components/FilterDrawer";
import AddCandidateDialog from "@/components/AddCandidateDialog";

const Index: React.FC = () => {
  return (
    <CandidateProvider>
      <div className="container py-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Candidates</h1>
          <AddCandidateDialog />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <SearchBar />
          <FilterDrawer />
        </div>

        <CandidateTable />
        <Pagination />
      </div>
    </CandidateProvider>
  );
};

export default Index;
