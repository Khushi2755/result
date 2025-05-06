
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockStudents } from "@/utils/mockData";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      
      if (user.type === "student") {
        // Get the current student data to check the latest fee defaulter status
        const studentData = mockStudents.find(s => s.id === user.id);
        
        // Update the user data in localStorage with the latest fee status
        if (studentData && studentData.feeDefaulter !== user.feeDefaulter) {
          localStorage.setItem("user", JSON.stringify({
            ...user,
            feeDefaulter: studentData.feeDefaulter
          }));
        }
        
        navigate("/student");
      } else if (user.type === "teacher") {
        navigate("/teacher");
      }
    } else {
      // If not logged in, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default Index;
