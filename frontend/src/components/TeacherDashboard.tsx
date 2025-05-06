
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SubjectForm from "./SubjectForm";
import TeacherSemesterSelector from "./TeacherSemesterSelector";
import SubjectsCard from "./SubjectsCard";
import EditMarksDialog from "./EditMarksDialog";
import StudentListDialog from "./StudentListDialog";
import { mockTeachers } from "@/utils/mockData";
import { Grade, Subject } from "@/utils/gradeUtils";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SquareCode, SquareTerminal, CalendarDays, User } from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(mockTeachers[0]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [studentListOpen, setStudentListOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{ id: string; name: string } | null>(null);
  const [activeSemester, setActiveSemester] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<"CSE" | "ECE" | null>(null);
  const [selectedYear, setSelectedYear] = useState<"1" | "2" | "3" | "4" | null>(null);
  const [showDashboard, setShowDashboard] = useState(true);

  useEffect(() => {
    // Check if user is logged in
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

    // Find teacher by ID
    const foundTeacher = mockTeachers.find(t => t.id === user.id);
    if (foundTeacher) {
      setTeacher(foundTeacher);
      setSubjects([...foundTeacher.subjects]);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleAddSubject = (newSubject: Subject) => {
    setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
    // In a real app, we would update this in backend
  };

  const handleDeleteSubject = (subjectId: string) => {
    setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== subjectId));
    toast({
      title: "Subject Deleted",
      description: "The subject has been removed successfully",
    });
  };

  const handleEditMarks = (subject: Subject) => {
    setEditingSubject(subject);
    setSelectedStudent(null);
    setStudentListOpen(true);
  };

  const handleSelectStudent = (studentId: string, studentName: string) => {
    setSelectedStudent({ id: studentId, name: studentName });
    setStudentListOpen(false);
    setEditDialogOpen(true);
  };

  const handleUpdateMarks = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject || !selectedStudent) return;

    setSubjects((prevSubjects) => 
      prevSubjects.map((subject) => 
        subject.id === editingSubject.id ? editingSubject : subject
      )
    );

    toast({
      title: "Marks Updated",
      description: `Marks for ${selectedStudent.name} in ${editingSubject.name} have been updated successfully`,
    });
    
    setEditDialogOpen(false);
    setEditingSubject(null);
    setSelectedStudent(null);
  };

  const updateGrade = (
    type: "ct1" | "ct2" | "endSem" | "assignment",
    value: number,
    maxValue: number
  ) => {
    if (!editingSubject) return;
    
    setEditingSubject({
      ...editingSubject,
      [type]: { value, maxValue } as Grade,
    });
  };

  const handleSemesterChange = (semester: number | null) => {
    setActiveSemester(semester);
  };

  const handleBranchSelect = (branch: "CSE" | "ECE") => {
    setSelectedBranch(branch);
    setShowDashboard(false);
  };

  const handleYearSelect = (year: "1" | "2" | "3" | "4") => {
    setSelectedYear(year);
  };

  const handleBackToDashboard = () => {
    setShowDashboard(true);
    setSelectedBranch(null);
    setSelectedYear(null);
  };

  const navigateToFeeDefaulters = () => {
    navigate("/fee-defaulters");
  };

  const filteredSubjects = activeSemester 
    ? subjects.filter(subject => subject.semester === activeSemester)
    : subjects;

  if (!teacher) return null;

  const title = activeSemester ? `Semester ${activeSemester} Subjects` : 'All Subjects';

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar userType="teacher" userName={teacher.name} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {showDashboard ? (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
              <p className="text-muted-foreground mt-2">Select a department or manage fee defaulters</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card 
                className="cursor-pointer hover:border-primary transition-colors" 
                onClick={() => handleBranchSelect("CSE")}
              >
                <CardHeader className="text-center">
                  <SquareCode className="w-12 h-12 mx-auto text-primary" />
                  <CardTitle>Computer Science</CardTitle>
                  <CardDescription>View CSE students</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  Click to view CSE students and their subjects
                </CardContent>
              </Card>
              
              <Card 
                className="cursor-pointer hover:border-primary transition-colors" 
                onClick={() => handleBranchSelect("ECE")}
              >
                <CardHeader className="text-center">
                  <SquareTerminal className="w-12 h-12 mx-auto text-primary" />
                  <CardTitle>Electronics & Communication</CardTitle>
                  <CardDescription>View ECE students</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  Click to view ECE students and their subjects
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary transition-colors" 
                onClick={navigateToFeeDefaulters}
              >
                <CardHeader className="text-center">
                  <User className="w-12 h-12 mx-auto text-primary" />
                  <CardTitle>Fee Defaulters</CardTitle>
                  <CardDescription>Manage fee defaulters</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  Click to manage students who haven't paid fees
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <button 
                  onClick={handleBackToDashboard}
                  className="text-primary hover:underline mb-4 inline-flex items-center"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-2xl font-bold mb-2">
                  {selectedBranch} Department
                  {selectedYear && ` - Year ${selectedYear}`}
                </h1>
                <p className="text-muted-foreground">Email: {teacher.email}</p>
              </div>
              <SubjectForm 
                onAddSubject={handleAddSubject} 
                teacherName={teacher.name} 
                selectedSemester={activeSemester} 
              />
            </div>

            <div className="mb-6">
              <div className="text-lg font-semibold mb-2">Filter by Year</div>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handleYearSelect("1")} 
                  className={`inline-flex items-center px-3 py-2 rounded-md ${selectedYear === "1" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                >
                  <CalendarDays className="mr-1 h-4 w-4" />
                  1st Year
                </button>
                <button 
                  onClick={() => handleYearSelect("2")} 
                  className={`inline-flex items-center px-3 py-2 rounded-md ${selectedYear === "2" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                >
                  <CalendarDays className="mr-1 h-4 w-4" />
                  2nd Year
                </button>
                <button 
                  onClick={() => handleYearSelect("3")} 
                  className={`inline-flex items-center px-3 py-2 rounded-md ${selectedYear === "3" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                >
                  <CalendarDays className="mr-1 h-4 w-4" />
                  3rd Year
                </button>
                <button 
                  onClick={() => handleYearSelect("4")} 
                  className={`inline-flex items-center px-3 py-2 rounded-md ${selectedYear === "4" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                >
                  <CalendarDays className="mr-1 h-4 w-4" />
                  4th Year
                </button>
                {selectedYear && (
                  <button 
                    onClick={() => setSelectedYear(null)} 
                    className="inline-flex items-center px-3 py-2 rounded-md bg-muted hover:bg-muted/80"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <TeacherSemesterSelector 
              onSemesterChange={handleSemesterChange} 
              activeSemester={activeSemester} 
            />
            
            <SubjectsCard
              title={title}
              subjects={filteredSubjects}
              onEditMarks={handleEditMarks}
              onDeleteSubject={handleDeleteSubject}
            />
          </>
        )}
      
        <StudentListDialog
          open={studentListOpen}
          onOpenChange={setStudentListOpen}
          subject={editingSubject}
          onSelectStudent={handleSelectStudent}
          selectedBranch={selectedBranch}
          selectedYear={selectedYear}
        />

        <EditMarksDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          editingSubject={editingSubject}
          selectedStudent={selectedStudent}
          onUpdateMarks={handleUpdateMarks}
          updateGrade={updateGrade}
        />
      </main>
    </div>
  );
};

export default TeacherDashboard;
