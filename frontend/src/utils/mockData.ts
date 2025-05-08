import { Student, Teacher, Semester, Subject, generateId } from "./gradeUtils";

const createSubject = (name: string, code: string, credits: number, teacher: string, semester: number): Subject => ({
  id: generateId(),
  name,
  code,
  credits,
  semester,
  ct1: { value: Math.floor(Math.random() * 15) + 5, maxValue: 20 },
  ct2: { value: Math.floor(Math.random() * 15) + 5, maxValue: 20 },
  endSem: { value: Math.floor(Math.random() * 50) + 30, maxValue: 70 },
  assignment: { value: Math.floor(Math.random() * 8) + 2, maxValue: 10 },
  teacher,
});

// Create mock subjects with semesters
const algorithmSubject = createSubject("Data Structures & Algorithms", "CS201", 4, "Dr. Sharma", 3);
const dbmsSubject = createSubject("Database Management Systems", "CS202", 4, "Dr. Gupta", 4);
const networkSubject = createSubject("Computer Networks", "CS203", 3, "Dr. Kumar", 4);
const mathSubject = createSubject("Discrete Mathematics", "MA201", 4, "Dr. Patel", 3);
const aiSubject = createSubject("Artificial Intelligence", "CS301", 3, "Dr. Singh", 5);
const mlSubject = createSubject("Machine Learning", "CS302", 4, "Dr. Singh", 6);
const webDevSubject = createSubject("Web Development", "CS304", 3, "Dr. Gupta", 6);
const cloudComputing = createSubject("Cloud Computing", "CS306", 3, "Dr. Kumar", 6);

// Create all 8 semesters with subjects
export const mockSemesters: Semester[] = [
  {
    id: 1,
    name: "Semester 1",
    subjects: [
      createSubject("Programming Fundamentals", "CS101", 4, "Dr. Sharma", 1),
      createSubject("Digital Logic Design", "EC101", 3, "Dr. Verma", 1),
      createSubject("Engineering Mathematics I", "MA101", 4, "Dr. Patel", 1),
      createSubject("Physics", "PH101", 3, "Dr. Das", 1),
      createSubject("English Communication", "HU101", 2, "Dr. Kapoor", 1),
    ],
  },
  {
    id: 2,
    name: "Semester 2",
    subjects: [
      createSubject("Object Oriented Programming", "CS102", 4, "Dr. Gupta", 2),
      createSubject("Computer Architecture", "EC102", 3, "Dr. Verma", 2),
      createSubject("Engineering Mathematics II", "MA102", 4, "Dr. Patel", 2),
      createSubject("Chemistry", "CH101", 3, "Dr. Roy", 2),
      createSubject("Environmental Studies", "ES101", 2, "Dr. Jain", 2),
    ],
  },
  {
    id: 3,
    name: "Semester 3",
    subjects: [
      algorithmSubject, 
      mathSubject, 
      createSubject("Operating Systems", "CS204", 4, "Dr. Kumar", 3), 
      createSubject("Microprocessors", "EC201", 3, "Dr. Verma", 3)
    ],
  },
  {
    id: 4,
    name: "Semester 4",
    subjects: [
      dbmsSubject, 
      networkSubject, 
      createSubject("Software Engineering", "CS205", 3, "Dr. Sharma", 4), 
      createSubject("Web Technologies", "CS206", 3, "Dr. Gupta", 4)
    ],
  },
  {
    id: 5,
    name: "Semester 5",
    subjects: [
      aiSubject, 
      createSubject("Compiler Design", "CS303", 4, "Dr. Kumar", 5), 
      createSubject("Computer Graphics", "CS304", 3, "Dr. Sharma", 5)
    ],
  },
  {
    id: 6,
    name: "Semester 6",
    subjects: [
      mlSubject, 
      webDevSubject, 
      cloudComputing
    ],
  },
  {
    id: 7,
    name: "Semester 7",
    subjects: [
      createSubject("Blockchain Technology", "CS401", 3, "Dr. Singh", 7), 
      createSubject("Internet of Things", "CS402", 3, "Dr. Verma", 7),
      createSubject("Big Data Analytics", "CS403", 4, "Dr. Kumar", 7)
    ],
  },
  {
    id: 8,
    name: "Semester 8",
    subjects: [
      createSubject("Project Work", "CS499", 6, "Dr. Sharma", 8),
      createSubject("Professional Ethics", "HU401", 2, "Dr. Kapoor", 8)
    ],
  },
];

// Mock students with updated semesters and branch information
export const mockStudents: Student[] = [
  {
    id: "s1",
    name: "Khushi Lohan",
    rollNo: "221121",
    email: "221121@iiitt.ac.in",
    branch: "CSE",
    year: "3",
    semesters: mockSemesters.slice(0, 6), // Currently in 6th semester
  },
  {
    id: "s2",
    name: "Harshini",
    rollNo: "221114",
    email: "221114@iiitt.ac.in",
    branch: "CSE",
    year: "3",
    semesters: mockSemesters.slice(0,6), // Currently in 6th semester
  },
  {
    id: "s3",
    name: "Vashu",
    rollNo: "221232",
    email: "221232@iiitt.ac.im",
    branch: "CSE",
    year: "4",
    semesters: mockSemesters, // Completed all 8 semesters
  },
  {
    id: "s4",
    name: "abc",
    rollNo: "211111",
    email: "211111@iiitt.ac.in",
    branch: "ECE",
    year: "2",
    semesters: mockSemesters.slice(0,4), // Currently in 4th semester
  },
  {
    id: "s5",
    name: "Alexa",
    rollNo: "221133",
    email: "221133@iiitt.ac.in",
    branch: "ECE",
    year: "4",
    semesters: mockSemesters.slice(0,8), // Currently in 6th semester
  },
  {
    id: "s6",
    name: "Shreya",
    rollNo: "221125",
    email: "shreya@gmail.com",
    branch: "CSE",
    year: "1",
    semesters: mockSemesters.slice(0, 2), // Currently in 2nd semester
  },
  {
    id: "s7",
    name: "Aakash",
    rollNo: "22",
    email: "aakash@gmail.com",
    branch: "ECE",
    year: "3",
    semesters: mockSemesters.slice(0,5), // Currently in 2nd semester
  },
  {
    id: "s8",
    name: "Ravi Kumar",
    rollNo: "CS2023001",
    email: "ravi@example.com",
    branch: "CSE",
    year: "1",
    semesters: mockSemesters.slice(0, 1), // Currently in 1st semester
  },
  {
    id: "s9",
    name: "Sonia Mehta",
    rollNo: "CS2023002",
    email: "sonia@example.com",
    branch: "CSE",
    year: "1",
    semesters: mockSemesters.slice(0, 1), // Currently in 1st semester
  },
  {
    id: "s10",
    name: "Deepak Joshi",
    rollNo: "CS2022002",
    email: "deepak@example.com",
    branch: "CSE",
    year: "2",
    semesters: mockSemesters.slice(0, 2), // Currently in 2nd semester
  },
  {
    id: "s11",
    name: "Meera Reddy",
    rollNo: "EC2023001",
    email: "meera@example.com",
    branch: "ECE",
    year: "1",
    semesters: mockSemesters.slice(0, 1), // Currently in 1st semester
  },
  {
    id: "s12",
    name: "Ajay Verma",
    rollNo: "EC2023002",
    email: "ajay@example.com",
    branch: "ECE",
    year: "1",
    semesters: mockSemesters.slice(0, 1), // Currently in 1st semester
  },
  {
    id: "s13",
    name: "Kavita Sharma",
    rollNo: "EC2022002",
    email: "kavita@example.com",
    branch: "ECE",
    year: "2",
    semesters: mockSemesters.slice(0, 2), // Currently in 2nd semester
  },
  {
    id: "s14",
    name: "Rohit Malhotra",
    rollNo: "CS2021001",
    email: "rohit@example.com",
    branch: "CSE",
    year: "3",
    semesters: mockSemesters.slice(0, 4), // Currently in 4th semester
  },
  {
    id: "s15",
    name: "Sneha Kapoor",
    rollNo: "EC2021001",
    email: "sneha@example.com",
    branch: "ECE",
    year: "3",
    semesters: mockSemesters.slice(0, 4), // Currently in 4th semester
  },
  {
    id: "s16",
    name: "Vijay Singh",
    rollNo: "CS2019002",
    email: "vijay@example.com",
    branch: "CSE",
    year: "4",
    semesters: mockSemesters.slice(0, 7), // Almost completed all semesters
  },
  {
    id: "s17",
    name: "Divya Prakash",
    rollNo: "EC2019002",
    email: "divya@example.com",
    branch: "ECE",
    year: "4",
    semesters: mockSemesters, // Completed all 8 semesters
  }
];

// Mock teachers with their subjects
export const mockTeachers: Teacher[] = [
  {
    id: "t1",
    name: "Dr. Anoop",
    email: "anoop@iiitt.ac.in",
    subjects: [algorithmSubject, createSubject("Software Engineering", "CS304", 3, "Dr. Sharma", 6)],
  },
  {
    id: "t2",
    name: "Dr. Ambika",
    email: "ambika@iiitt.ac.in",
    subjects: [dbmsSubject, webDevSubject , createSubject("DBMS","CS312",3,"Dr. Ambika",6)],
  },
  {
    id: "t3",
    name: "Dr. Devesena",
    email: "devesena@iiitt.ac.in",
    subjects: [aiSubject, mlSubject , createSubject("AI","CS313",3,"Dr. Devesena",6)],
  },
];

// Sample Login Data
export const users = {
  students: [
    { username: "khushi_lohan", password: "password", studentId: "s1" },
    { username: "harshini", password: "password", studentId: "s2" },
    { username: "vashu", password: "password", studentId: "s3" },
    { username: "abc", password: "password", studentId: "s4" },
    { username: "alexa", password: "password", studentId: "s5" },
    { username: "shreya", password: "password", studentId: "s6" },
    { username: "aakash", password: "password", studentId: "s7" },
    { username: "ravi", password: "password", studentId: "s8" },
    { username: "sonia", password: "password", studentId: "s9" },
    { username: "deepak", password: "password", studentId: "s10" },
    { username: "meera", password: "password", studentId: "s11" },
    { username: "ajay", password: "password", studentId: "s12" },
    { username: "kavita", password: "password", studentId: "s13" },
    { username: "rohit", password: "password", studentId: "s14" },
    { username: "sneha", password: "password", studentId: "s15" },
    { username: "vijay", password: "password", studentId: "s16" },
    { username: "divya", password: "password", studentId: "s17" },
  ],
  teachers: [
    { username: "anoop", password: "password", teacherId: "t1" },
    { username: "ambika", password: "password", teacherId: "t2" },
    { username: "devesena", password: "password", teacherId: "t3" },
  ],
};
