import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { users } from "@/utils/mockData";
import { mockStudents } from "@/utils/mockData";

interface LoginFormProps {
  userType: "student" | "teacher";
  loginIdentifier: string;
  setLoginIdentifier: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

const LoginForm = ({ 
  userType,
  loginIdentifier,
  setLoginIdentifier,
  password,
  setPassword
}: LoginFormProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!loginIdentifier || !password) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please enter your username/email and password",
      });
      return;
    }

    let user;
    
    if (userType === "student") {
      // Find student by username
      user = users.students.find(
        (s) => s.username === loginIdentifier && s.password === password
      );
      
      if (user) {
        // Get the actual student data including fee defaulter status
        const studentData = mockStudents.find(s => s.id === user.studentId);
        
        localStorage.setItem("user", JSON.stringify({
          type: "student", 
          id: user.studentId,
          feeDefaulter: studentData?.feeDefaulter || false
        }));
        
        navigate("/student");
        toast({
          title: "Login successful",
          description: "Welcome back, student!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid username or password",
        });
      }
    } else {
      // Find teacher by username
      user = users.teachers.find(
        (t) => t.username === loginIdentifier && t.password === password
      );
      
      if (user) {
        localStorage.setItem("user", JSON.stringify({
          type: "teacher", 
          id: user.teacherId
        }));
        navigate("/teacher");
        toast({
          title: "Login successful",
          description: "Welcome back, teacher!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid username or password",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${userType}-identifier`}>Username or Email</Label>
        <Input 
          id={`${userType}-identifier`}
          placeholder="username or email" 
          value={loginIdentifier}
          onChange={(e) => setLoginIdentifier(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${userType}-password`}>Password</Label>
        <Input 
          id={`${userType}-password`} 
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button 
        className="w-full" 
        onClick={handleLogin}
      >
        Login as {userType === "student" ? "Student" : "Teacher"}
      </Button>
    </div>
  );
};

export default LoginForm;