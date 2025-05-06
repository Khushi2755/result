import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import GradeCard from "./GradeCard";
import SemesterSelector from "./SemesterSelector";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { calculateSGPA, calculateCGPA } from "@/utils/gradeUtils";
import { mockStudents } from "@/utils/mockData";
import { TrendingUp, Book, AlertCircle } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(mockStudents[0]);
  const [selectedSemesterId, setSelectedSemesterId] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState(student?.semesters[0]);
  const [isFeeDefaulter, setIsFeeDefaulter] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/");
      return;
    }

    const user = JSON.parse(userStr);
    if (user.type !== "student") {
      navigate("/");
      return;
    }

    // Check if user is a fee defaulter from localStorage
    if (user.feeDefaulter === true) {
      setIsFeeDefaulter(true);
    }

    // Find student by ID
    const foundStudent = mockStudents.find(s => s.id === user.id);
    if (foundStudent) {
      setStudent(foundStudent);
      setSelectedSemester(foundStudent.semesters[0]);
      
      // Make sure we also check the latest fee defaulter status from the student data
      // This ensures we're synced with any changes made by teachers
      setIsFeeDefaulter(!!foundStudent.feeDefaulter);
      
      // Update localStorage with the latest fee defaulter status
      if (!!foundStudent.feeDefaulter !== user.feeDefaulter) {
        localStorage.setItem("user", JSON.stringify({
          ...user,
          feeDefaulter: !!foundStudent.feeDefaulter
        }));
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (student) {
      const semester = student.semesters.find(s => s.id === selectedSemesterId);
      if (semester) {
        setSelectedSemester(semester);
      }
    }
  }, [selectedSemesterId, student]);

  if (!student) return null;

  const sgpa = calculateSGPA(selectedSemester);
  const cgpa = calculateCGPA(student.semesters);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (isFeeDefaulter) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar userType="student" userName={student.name} />
        
        <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
          <Card className="w-full max-w-3xl">
            <CardContent className="pt-6">
              <div className="text-center space-y-6 py-8">
                <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">Account Restricted</h1>
                  <p className="text-muted-foreground text-xl">
                    You are currently marked as a fee defaulter
                  </p>
                </div>
                
                <Alert variant="destructive" className="my-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Access Restricted</AlertTitle>
                  <AlertDescription>
                    You cannot access your grades until your fees are paid. Please contact the fee department to resolve this issue.
                  </AlertDescription>
                </Alert>
                
                <div className="flex flex-col space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold">Student Details</p>
                    <p>Name: {student.name}</p>
                    <p>Roll No: {student.rollNo}</p>
                    <p>Branch: {student.branch || "Not specified"}</p>
                    <p>Year: {student.year ? `${student.year}${getYearSuffix(student.year)} Year` : "Not specified"}</p>
                  </div>
                  
                  <Button onClick={handleLogout} variant="outline">
                    Log Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar userType="student" userName={student.name} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Student Dashboard</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-muted-foreground">Roll No: {student.rollNo}</p>
              <p className="text-muted-foreground">Email: {student.email}</p>
              {student.branch && <p className="text-muted-foreground">Branch: {student.branch}</p>}
              {student.year && <p className="text-muted-foreground">Year: {student.year}{getYearSuffix(student.year)} Year</p>}
            </div>
            <SemesterSelector 
              semesters={student.semesters} 
              selectedSemesterId={selectedSemesterId}
              onSelectSemester={setSelectedSemesterId}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card text-card-foreground border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <CardTitle>SGPA (Current Semester)</CardTitle>
              </div>
              <p className="text-4xl font-bold">{sgpa.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-1">{selectedSemester.name}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card text-card-foreground border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <CardTitle>CGPA (Overall)</CardTitle>
              </div>
              <p className="text-4xl font-bold">{cgpa.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Across {student.semesters.length} semesters
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
          <Book className="h-5 w-5" />
          <span>Subject Grades - {selectedSemester.name}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedSemester.subjects.map((subject) => (
            <GradeCard key={subject.id} subject={subject} />
          ))}
        </div>
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

export default StudentDashboard;