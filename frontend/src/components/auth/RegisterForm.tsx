import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface RegisterFormProps {
  userType: "student" | "teacher";
  onSuccess: (username: string) => void;
}

const RegisterForm = ({ userType, onSuccess }: RegisterFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [branch, setBranch] = useState<"CSE" | "ECE" | "">("");
  const [year, setYear] = useState<"1" | "2" | "3" | "4" | "">("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "All fields are required",
      });
      return;
    }

    if (userType === "student" && (!branch || !year)) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please select your branch and year",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Passwords do not match",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
          role: userType,
          branch: userType === "student" ? branch : undefined,
          year: userType === "student" ? year : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: data.error || "Failed to register",
        });
        return;
      }

      toast({
        title: "Registration successful",
        description: "Please login with your new account",
      });

      navigate("/login", { state: { username } });
      onSuccess(username);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${userType}-reg-username`}>Username</Label>
        <Input
          id={`${userType}-reg-username`}
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${userType}-reg-email`}>Email</Label>
        <Input
          id={`${userType}-reg-email`}
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {userType === "student" && (
        <>
          <div className="space-y-2">
            <Label>Branch</Label>
            <Select value={branch} onValueChange={(value) => setBranch(value as "CSE" | "ECE")}>
              <SelectTrigger>
                <SelectValue placeholder="Select your branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSE">Computer Science Engineering (CSE)</SelectItem>
                <SelectItem value="ECE">Electronics & Communication Engineering (ECE)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Year</Label>
            <RadioGroup value={year} onValueChange={(value) => setYear(value as "1" | "2" | "3" | "4")}>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="year-1" />
                  <Label htmlFor="year-1">1st Year</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="year-2" />
                  <Label htmlFor="year-2">2nd Year</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="year-3" />
                  <Label htmlFor="year-3">3rd Year</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="year-4" />
                  <Label htmlFor="year-4">4th Year</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor={`${userType}-reg-password`}>Password</Label>
        <Input
          id={`${userType}-reg-password`}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${userType}-reg-confirm-password`}>Confirm Password</Label>
        <Input
          id={`${userType}-reg-confirm-password`}
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button className="w-full" onClick={handleRegister}>
        Register as {userType === "student" ? "Student" : "Teacher"}
      </Button>
    </div>
  );
};

export default RegisterForm;
