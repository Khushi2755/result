
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  const [userType, setUserType] = useState<"student" | "teacher">("student");

  const handleRegistrationSuccess = (username: string) => {
    // Redirect to the login page is handled by the RegisterForm component
  };

  return (
    <div className="min-h-screen flex items-center justify-center login-container p-4">
      <div className="relative z-10 w-full max-w-md">
        <Card className="auth-card shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Grade Guru</CardTitle>
            <CardDescription className="text-center text-gray-300">
              BTech Grade Management System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full" onValueChange={(val) => setUserType(val as "student" | "teacher")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="teacher">Teacher</TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <RegisterForm
                  userType="student"
                  onSuccess={handleRegistrationSuccess}
                />
              </TabsContent>
              <TabsContent value="teacher">
                <RegisterForm
                  userType="teacher"
                  onSuccess={handleRegistrationSuccess}
                />
              </TabsContent>
            </Tabs>
            <div className="mt-4 text-center text-gray-300">
              Already have an account? <Link to="/login" className="text-purple-400 hover:underline">Login here</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
