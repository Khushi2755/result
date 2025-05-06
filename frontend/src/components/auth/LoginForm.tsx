import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";

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
  setPassword,
}: LoginFormProps) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!loginIdentifier || !password) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please enter your username/email and password",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginIdentifier,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: data.message || "Invalid username or password",
        });
        return;
      }

      // Save token and role
      localStorage.setItem("token", data.token);
      const role = data.role.toLowerCase();
      localStorage.setItem("role", role);

      // Store user object with type and id for dashboard
      const userId = role === "student" ? "s1" : role === "teacher" ? "t1" : data.id;
      localStorage.setItem("user", JSON.stringify({ type: role, id: userId }));

      if (role === "student") {
        navigate("/student");
      } else if (role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred. Please try again.",
      });
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
      <Button className="w-full" onClick={handleLogin}>
        Login as {userType === "student" ? "Student" : "Teacher"}
      </Button>
    </div>
  );
};

export default LoginForm;
