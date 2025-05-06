import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { mockStudents } from "@/utils/mockData";
import { Filter, CalendarDays } from "lucide-react";

const FeeDefaultersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(mockStudents);
  const [selectedBranch, setSelectedBranch] = useState<"CSE" | "ECE" | null>(null);
  const [selectedYear, setSelectedYear] = useState<"1" | "2" | "3" | "4" | null>(null);

  useEffect(() => {
    // Check if user is logged in as teacher
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/");
      return;
    } 
    
    const user = JSON.parse(userStr);
    if (user.type !== "teacher") {
      navigate("/");
      return;
    }
  }, [navigate]);

  const handleToggleFeeDefaulter = (studentId: string, currentStatus: boolean | undefined) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return {
          ...student,
          feeDefaulter: !currentStatus,
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    
    // Update mockStudents globally for the app to use
    // This makes the change persist across the app
    Object.assign(mockStudents, updatedStudents);

    toast({
      title: "Fee Status Updated",
      description: `Student fee defaulter status has been ${!currentStatus ? "added" : "removed"}.`,
    });
  };

  const filteredStudents = students.filter(student => {
    // Filter by search term
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by branch if selected
    const matchesBranch = selectedBranch ? student.branch === selectedBranch : true;
    
    // Filter by year if selected
    const matchesYear = selectedYear ? student.year === selectedYear : true;
    
    return matchesSearch && matchesBranch && matchesYear;
  });

  const handleBranchSelect = (branch: "CSE" | "ECE" | null) => {
    setSelectedBranch(branch === selectedBranch ? null : branch);
  };

  const handleYearSelect = (year: "1" | "2" | "3" | "4" | null) => {
    setSelectedYear(year === selectedYear ? null : year);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar userType="teacher" userName="Teacher" />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <button 
              onClick={() => navigate("/teacher")}
              className="text-primary hover:underline mb-4 inline-flex items-center"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold mb-2">Fee Defaulters Management</h1>
            <p className="text-muted-foreground">
              Mark students who haven't paid their fees. Fee defaulters cannot access their grades.
            </p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Students</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="font-medium mb-2">Branch</div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={() => handleBranchSelect("CSE")} 
                    variant={selectedBranch === "CSE" ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Filter className="h-4 w-4" />
                    CSE
                  </Button>
                  <Button 
                    onClick={() => handleBranchSelect("ECE")} 
                    variant={selectedBranch === "ECE" ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Filter className="h-4 w-4" />
                    ECE
                  </Button>
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">Year</div>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={() => handleYearSelect("1")} 
                    variant={selectedYear === "1" ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <CalendarDays className="h-4 w-4" />
                    1st Year
                  </Button>
                  <Button 
                    onClick={() => handleYearSelect("2")} 
                    variant={selectedYear === "2" ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <CalendarDays className="h-4 w-4" />
                    2nd Year
                  </Button>
                  <Button 
                    onClick={() => handleYearSelect("3")} 
                    variant={selectedYear === "3" ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <CalendarDays className="h-4 w-4" />
                    3rd Year
                  </Button>
                  <Button 
                    onClick={() => handleYearSelect("4")} 
                    variant={selectedYear === "4" ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <CalendarDays className="h-4 w-4" />
                    4th Year
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      
        <Card>
          <CardContent className="pt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Roll No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Fee Defaulter</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.rollNo}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.branch || "-"}</TableCell>
                        <TableCell>{student.year ? `${student.year}${getYearSuffix(student.year)} Year` : "-"}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell className="text-right">
                          <Switch
                            checked={!!student.feeDefaulter}
                            onCheckedChange={() => handleToggleFeeDefaulter(student.id, student.feeDefaulter)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No students found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
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

export default FeeDefaultersPage;
