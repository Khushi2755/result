
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRound, Filter } from "lucide-react";
import { Subject } from "@/utils/gradeUtils";
import { mockStudents } from "@/utils/mockData";

interface StudentListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject: Subject | null;
  onSelectStudent: (studentId: string, studentName: string) => void;
  selectedBranch?: "CSE" | "ECE" | null;
  selectedYear?: "1" | "2" | "3" | "4" | null;
}

const StudentListDialog = ({
  open,
  onOpenChange,
  subject,
  onSelectStudent,
  selectedBranch,
  selectedYear,
}: StudentListDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [localBranch, setLocalBranch] = useState<"CSE" | "ECE" | "all">(selectedBranch || "all");
  const [localYear, setLocalYear] = useState<"1" | "2" | "3" | "4" | "all">(selectedYear || "all");

  if (!subject) return null;

  // Filter students who are enrolled in the subject's semester and match branch/year filters
  let enrolledStudents = mockStudents.filter(student => {
    return student.semesters.some(semester => 
      semester.subjects.some(sub => sub.code === subject.code)
    );
  });

  // Apply branch filter if selected
  if (selectedBranch) {
    enrolledStudents = enrolledStudents.filter(student => student.branch === selectedBranch);
  } else if (localBranch !== "all") {
    enrolledStudents = enrolledStudents.filter(student => student.branch === localBranch);
  }

  // Apply year filter if selected
  if (selectedYear) {
    enrolledStudents = enrolledStudents.filter(student => student.year === selectedYear);
  } else if (localYear !== "all") {
    enrolledStudents = enrolledStudents.filter(student => student.year === localYear);
  }

  // Apply search term filter
  const filteredStudents = enrolledStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserRound className="h-5 w-5" />
            <span>Select Student - {subject.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setFilterVisible(!filterVisible)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          {filterVisible && (
            <div className="mb-4 p-4 border rounded-md bg-muted/20">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Branch</label>
                  <div className="flex gap-2">
                    <Button 
                      variant={localBranch === "all" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setLocalBranch("all")}
                      className="flex-1"
                    >
                      All
                    </Button>
                    <Button 
                      variant={localBranch === "CSE" ? "default" : "outline"}
                      size="sm" 
                      onClick={() => setLocalBranch("CSE")}
                      className="flex-1"
                    >
                      CSE
                    </Button>
                    <Button 
                      variant={localBranch === "ECE" ? "default" : "outline"}
                      size="sm" 
                      onClick={() => setLocalBranch("ECE")}
                      className="flex-1"
                    >
                      ECE
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Year</label>
                  <div className="grid grid-cols-5 gap-2">
                    <Button 
                      variant={localYear === "all" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setLocalYear("all")}
                    >
                      All
                    </Button>
                    <Button 
                      variant={localYear === "1" ? "default" : "outline"}
                      size="sm" 
                      onClick={() => setLocalYear("1")}
                    >
                      1st
                    </Button>
                    <Button 
                      variant={localYear === "2" ? "default" : "outline"}
                      size="sm" 
                      onClick={() => setLocalYear("2")}
                    >
                      2nd
                    </Button>
                    <Button 
                      variant={localYear === "3" ? "default" : "outline"}
                      size="sm" 
                      onClick={() => setLocalYear("3")}
                    >
                      3rd
                    </Button>
                    <Button 
                      variant={localYear === "4" ? "default" : "outline"}
                      size="sm" 
                      onClick={() => setLocalYear("4")}
                    >
                      4th
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="max-h-[300px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.rollNo}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.branch}</TableCell>
                      <TableCell>{student.year ? `${student.year}${getYearSuffix(student.year)} Year` : "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onSelectStudent(student.id, student.name)}
                        >
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to get the correct suffix for the year
function getYearSuffix(year: string): string {
  switch (year) {
    case "1": return "st";
    case "2": return "nd";
    case "3": return "rd";
    case "4": return "th";
    default: return "th";
  }
}

export default StudentListDialog;
