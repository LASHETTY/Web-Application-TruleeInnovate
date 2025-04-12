
import React, { createContext, useContext, useState, useEffect } from "react";
import { Candidate, FilterState } from "../types";
import { getCandidates, addCandidate } from "../data/candidates";

interface CandidateContextType {
  candidates: Candidate[];
  filteredCandidates: Candidate[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: FilterState;
  updateFilter: (filterType: keyof FilterState, values: string[]) => void;
  resetFilters: () => void;
  addNewCandidate: (candidate: Omit<Candidate, "id">) => void;
  updateCandidate: (id: string, updatedCandidate: Omit<Candidate, "id">) => void;
  deleteCandidate: (id: string) => void;
  getCandidateById: (id: string) => Candidate | undefined;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  itemsPerPage: number;
}

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export const useCandidateContext = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error("useCandidateContext must be used within a CandidateProvider");
  }
  return context;
};

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>({
    gender: [],
    experience: [],
    skills: []
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  // Initial data load
  useEffect(() => {
    try {
      const data = getCandidates();
      setCandidates(data);
      setFilteredCandidates(data);
    } catch (error) {
      console.error("Error loading candidates:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...candidates];

    // Apply search term
    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(lowercasedSearchTerm) ||
          candidate.email.toLowerCase().includes(lowercasedSearchTerm) ||
          candidate.phone.toLowerCase().includes(lowercasedSearchTerm)
      );
    }

    // Apply filters
    if (filters.gender.length > 0) {
      result = result.filter((candidate) => filters.gender.includes(candidate.gender));
    }

    if (filters.experience.length > 0) {
      result = result.filter((candidate) => filters.experience.includes(candidate.experience));
    }

    if (filters.skills.length > 0) {
      result = result.filter((candidate) =>
        filters.skills.some((skill) => candidate.skills.includes(skill))
      );
    }

    setFilteredCandidates(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, candidates]);

  // Update a specific filter type
  const updateFilter = (filterType: keyof FilterState, values: string[]) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: values
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      gender: [],
      experience: [],
      skills: []
    });
    setSearchTerm("");
  };

  // Add a new candidate
  const addNewCandidate = (candidate: Omit<Candidate, "id">) => {
    const newCandidate = addCandidate(candidate);
    setCandidates((prev) => [...prev, newCandidate]);
  };

  // Update an existing candidate
  const updateCandidate = (id: string, updatedCandidate: Omit<Candidate, "id">) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === id 
          ? { ...updatedCandidate, id } 
          : candidate
      )
    );
    
    // Update localStorage
    const allCandidates = getCandidates();
    const updatedCandidates = allCandidates.map(candidate => 
      candidate.id === id ? { ...updatedCandidate, id } : candidate
    );
    localStorage.setItem('candidates_data', JSON.stringify(updatedCandidates));
  };

  // Delete a candidate
  const deleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(candidate => candidate.id !== id));
    
    // Update localStorage
    const allCandidates = getCandidates();
    const updatedCandidates = allCandidates.filter(candidate => candidate.id !== id);
    localStorage.setItem('candidates_data', JSON.stringify(updatedCandidates));
  };

  // Get a candidate by ID
  const getCandidateById = (id: string) => {
    return candidates.find(candidate => candidate.id === id);
  };

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(filteredCandidates.length / itemsPerPage));

  // Go to specific page
  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  // Paginated data
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        filteredCandidates: paginatedCandidates,
        loading,
        searchTerm,
        setSearchTerm,
        filters,
        updateFilter,
        resetFilters,
        addNewCandidate,
        updateCandidate,
        deleteCandidate,
        getCandidateById,
        currentPage,
        totalPages,
        goToPage,
        itemsPerPage
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
