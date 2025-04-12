
export interface Candidate {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender: "Male" | "Female" | "Other";
  experience: string;
  skills: string[];
  qualification?: string;
}

export type FilterOption = {
  id: string;
  name: string;
};

export type FilterType = "gender" | "experience" | "skills";

export interface FilterState {
  gender: string[];
  experience: string[];
  skills: string[];
}
