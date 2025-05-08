import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"student" | "teacher">("student");

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
                <LoginForm
                  userType="student"
                  loginIdentifier={loginIdentifier}
                  setLoginIdentifier={setLoginIdentifier}
                  password={password}
                  setPassword={setPassword}
                />
              </TabsContent>
              <TabsContent value="teacher">
                <LoginForm
                  userType="teacher"
                  loginIdentifier={loginIdentifier}
                  setLoginIdentifier={setLoginIdentifier}
                  password={password}
                  setPassword={setPassword}
                />
              </TabsContent>
            </Tabs>
            <div className="mt-4 text-center text-gray-300">
              Don't have an account? <Link to="/register" className="text-purple-400 hover:underline">Register here</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;