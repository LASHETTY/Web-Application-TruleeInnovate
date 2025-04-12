
import React from "react";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCandidateContext } from "@/context/CandidateContext";
import { experienceOptions, genderOptions, skillsList } from "@/data/candidates";

const FilterDrawer: React.FC = () => {
  const { filters, updateFilter, resetFilters } = useCandidateContext();
  const [open, setOpen] = React.useState(false);

  const handleGenderFilter = (gender: string) => {
    const updatedGenders = filters.gender.includes(gender)
      ? filters.gender.filter((g) => g !== gender)
      : [...filters.gender, gender];
    
    updateFilter("gender", updatedGenders);
  };

  const handleExperienceFilter = (experience: string) => {
    const updatedExperience = filters.experience.includes(experience)
      ? filters.experience.filter((e) => e !== experience)
      : [...filters.experience, experience];
    
    updateFilter("experience", updatedExperience);
  };

  const handleSkillFilter = (skill: string) => {
    const updatedSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    
    updateFilter("skills", updatedSkills);
  };

  const handleReset = () => {
    resetFilters();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[350px] sm:w-[450px] overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Filter candidates by different criteria
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {/* Gender filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">Gender</h3>
            <div className="space-y-2">
              {genderOptions.map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`gender-${gender}`} 
                    checked={filters.gender.includes(gender)}
                    onCheckedChange={() => handleGenderFilter(gender)}
                  />
                  <Label htmlFor={`gender-${gender}`}>{gender}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Experience filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">Experience</h3>
            <div className="grid grid-cols-2 gap-2">
              {experienceOptions.map((exp) => (
                <div key={exp} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`exp-${exp}`} 
                    checked={filters.experience.includes(exp)}
                    onCheckedChange={() => handleExperienceFilter(exp)}
                  />
                  <Label htmlFor={`exp-${exp}`}>{exp}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Skills filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">Skills</h3>
            <div className="grid grid-cols-2 gap-2">
              {skillsList.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`skill-${skill}`} 
                    checked={filters.skills.includes(skill)}
                    onCheckedChange={() => handleSkillFilter(skill)}
                  />
                  <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="flex justify-between sm:justify-between mt-4">
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
          <Button onClick={() => setOpen(false)}>
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;
