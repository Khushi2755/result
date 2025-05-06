
export type Grade = {
  value: number;
  maxValue: number;
};

export type Subject = {
  id: string;
  name: string;
  code: string;
  credits: number;
  semester?: number;
  ct1: Grade | null;
  ct2: Grade | null;
  endSem: Grade | null;
  assignment: Grade | null;
  teacher: string;
  branch?: "CSE" | "ECE"; // Added branch property
};

export type Semester = {
  id: number;
  name: string;
  subjects: Subject[];
};

export type Student = {
  id: string;
  name: string;
  rollNo: string;
  email: string;
  branch?: "CSE" | "ECE";
  year?: "1" | "2" | "3" | "4";
  feeDefaulter?: boolean; // Added fee defaulter property
  semesters: Semester[];
};

export type Teacher = {
  id: string;
  name: string;
  email: string;
  subjects: Subject[];
};

// Calculate subject grade
export const calculateSubjectGrade = (subject: Subject): string => {
  const ct1Score = subject.ct1 ? (subject.ct1.value / subject.ct1.maxValue) * 15 : 0;
  const ct2Score = subject.ct2 ? (subject.ct2.value / subject.ct2.maxValue) * 15 : 0;
  const assignmentScore = subject.assignment ? (subject.assignment.value / subject.assignment.maxValue) * 10 : 0;
  const endSemScore = subject.endSem ? (subject.endSem.value / subject.endSem.maxValue) * 60 : 0;
  
  const totalScore = ct1Score + ct2Score + assignmentScore + endSemScore;
  
  if (totalScore >= 90) return "A";
  if (totalScore >= 80) return "B";
  if (totalScore >= 70) return "C";
  if (totalScore >= 60) return "D";
  if (totalScore >= 50) return "E";
  return "F";
};

// Calculate grade points
export const getGradePoints = (grade: string): number => {
  switch (grade) {
    case "A": return 10;
    case "B": return 8;
    case "C": return 6;
    case "D": return 4;
    case "E": return 2;
    default: return 0;
  }
};

// Calculate SGPA for a semester
export const calculateSGPA = (semester: Semester): number => {
  if (!semester?.subjects.length) return 0;
  
  let totalCredits = 0;
  let totalGradePoints = 0;
  
  semester.subjects.forEach(subject => {
    const grade = calculateSubjectGrade(subject);
    totalGradePoints += getGradePoints(grade) * subject.credits;
    totalCredits += subject.credits;
  });
  
  return totalCredits ? parseFloat((totalGradePoints / totalCredits).toFixed(2)) : 0;
};

// Calculate CGPA across semesters
export const calculateCGPA = (semesters: Semester[]): number => {
  if (!semesters.length) return 0;
  
  let totalCredits = 0;
  let totalGradePoints = 0;
  
  semesters.forEach(semester => {
    semester.subjects.forEach(subject => {
      const grade = calculateSubjectGrade(subject);
      totalGradePoints += getGradePoints(grade) * subject.credits;
      totalCredits += subject.credits;
    });
  });
  
  return totalCredits ? parseFloat((totalGradePoints / totalCredits).toFixed(2)) : 0;
};

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
