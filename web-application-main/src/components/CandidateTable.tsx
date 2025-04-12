
import React, { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useCandidateContext } from "@/context/CandidateContext";
import EditCandidateDialog from "./EditCandidateDialog";
import DeleteCandidateDialog from "./DeleteCandidateDialog";

const CandidateTable: React.FC = () => {
  const { filteredCandidates, loading } = useCandidateContext();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>("");

  const handleEditClick = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
    setDeleteDialogOpen(true);
  };

  if (loading) {
    return <div className="text-center py-4">Loading candidates...</div>;
  }

  if (filteredCandidates.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md">
        <p className="text-muted-foreground">No candidates found</p>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Qualification</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead className="w-[80px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.phone}</TableCell>
                <TableCell>{candidate.gender}</TableCell>
                <TableCell>{candidate.qualification || "-"}</TableCell>
                <TableCell>{candidate.experience}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="mr-1 mb-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(candidate.id)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteClick(candidate.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <EditCandidateDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen} 
        candidateId={selectedCandidateId} 
      />

      {/* Delete Dialog */}
      {selectedCandidateId && (
        <DeleteCandidateDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          candidateId={selectedCandidateId}
          candidateName={filteredCandidates.find(c => c.id === selectedCandidateId)?.name || "this candidate"}
        />
      )}
    </>
  );
};

export default CandidateTable;
