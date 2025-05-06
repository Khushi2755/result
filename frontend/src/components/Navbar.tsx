
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface NavbarProps {
  userType: "student" | "teacher";
  userName: string;
}

const Navbar = ({ userType, userName }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="bg-primary/20 border-b border-border shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <User className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Grade Guru</h1>
        </div>
        <div className="flex items-center">
          <span className="mr-4 font-medium">
            {userType === "student" ? "Student" : "Teacher"}: {userName}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout} 
            className="flex items-center space-x-1"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
