
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { X, Plus, Check, ChevronsUpDown } from "lucide-react";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCandidateContext } from "@/context/CandidateContext";
import { genderOptions, experienceOptions, skillsList } from "@/data/candidates";
import { Candidate } from "@/types";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(7, { message: "Enter a valid phone number" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Please select gender" }),
  experience: z.string().min(1, { message: "Please select experience" }),
  qualification: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditCandidateDialogProps {
  open: boolean;
  candidateId: string;
  onOpenChange: (open: boolean) => void;
}

const EditCandidateDialog: React.FC<EditCandidateDialogProps> = ({ open, candidateId, onOpenChange }) => {
  const { updateCandidate, getCandidateById } = useCandidateContext();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillInputValue, setSkillInputValue] = useState("");
  const [openSkillsCombobox, setOpenSkillsCombobox] = useState(false);
  
  const candidate = getCandidateById(candidateId);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      gender: undefined,
      experience: "",
      qualification: "",
      skills: [],
    },
  });

  // Load candidate data into form when dialog opens
  useEffect(() => {
    if (candidate && open) {
      form.reset({
        name: candidate.name,
        phone: candidate.phone,
        email: candidate.email,
        gender: candidate.gender,
        experience: candidate.experience,
        qualification: candidate.qualification || "",
        skills: [],
      });
      setSelectedSkills(candidate.skills);
    }
  }, [candidate, open, form]);

  const onSubmit = (data: FormValues) => {
    if (!candidate) return;
    
    updateCandidate(candidateId, {
      name: data.name,
      phone: data.phone,
      email: data.email,
      gender: data.gender,
      experience: data.experience,
      qualification: data.qualification,
      skills: selectedSkills.length > 0 ? selectedSkills : candidate.skills,
    });
    
    toast({
      title: "Success",
      description: "Candidate updated successfully",
    });
    
    onOpenChange(false);
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };

  const filteredSkills = skillsList.filter(
    skill => !selectedSkills.includes(skill) && 
    skill.toLowerCase().includes(skillInputValue.toLowerCase())
  );

  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Candidate</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genderOptions.map(gender => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {experienceOptions.map(exp => (
                          <SelectItem key={exp} value={exp}>
                            {exp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter qualification" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Skills</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedSkills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-sm py-1 px-2">
                    {skill}
                    <X 
                      className="ml-1 h-3 w-3 cursor-pointer" 
                      onClick={() => removeSkill(skill)} 
                    />
                  </Badge>
                ))}
              </div>
              <Popover open={openSkillsCombobox} onOpenChange={setOpenSkillsCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openSkillsCombobox}
                    className="w-full justify-between"
                  >
                    {selectedSkills.length > 0 
                      ? `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`
                      : "Select skills"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput 
                      placeholder="Search skills..." 
                      value={skillInputValue}
                      onValueChange={setSkillInputValue}
                    />
                    <CommandEmpty>No skill found.</CommandEmpty>
                    <CommandGroup className="max-h-[200px] overflow-auto">
                      {filteredSkills.map(skill => (
                        <CommandItem
                          key={skill}
                          value={skill}
                          onSelect={() => {
                            setSelectedSkills(prev => [...prev, skill]);
                            setSkillInputValue("");
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              selectedSkills.includes(skill) ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          {skill}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="mt-2"
              >
                Cancel
              </Button>
              <Button type="submit" className="mt-2">Update Candidate</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCandidateDialog;
