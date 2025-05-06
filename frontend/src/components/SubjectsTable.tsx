
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, FileMinus } from "lucide-react";
import { Subject } from "@/utils/gradeUtils";

interface SubjectsTableProps {
  subjects: Subject[];
  onEditMarks: (subject: Subject) => void;
  onDeleteSubject: (subjectId: string) => void;
}

const SubjectsTable = ({ subjects, onEditMarks, onDeleteSubject }: SubjectsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Subject Name</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Credits</TableHead>
          <TableHead>Semester</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subjects.map((subject) => (
          <TableRow key={subject.id}>
            <TableCell className="font-medium">{subject.name}</TableCell>
            <TableCell>{subject.code}</TableCell>
            <TableCell>{subject.credits}</TableCell>
            <TableCell>{subject.semester || '-'}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEditMarks(subject)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Edit Marks</span>
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => onDeleteSubject(subject.id)}
                  className="flex items-center gap-1"
                >
                  <FileMinus className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SubjectsTable;
