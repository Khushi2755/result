
import { useState } from "react";
import { Card } from "@/components/ui/card";

interface TeacherSemesterSelectorProps {
  onSemesterChange: (semester: number | null) => void;
  activeSemester: number | null;
}

const TeacherSemesterSelector = ({ onSemesterChange, activeSemester }: TeacherSemesterSelectorProps) => {
  const semesters = Array.from({ length: 8 }, (_, i) => i + 1);
  
  return (
    <div className="w-full mb-6">
      <h2 className="text-lg font-medium mb-3 flex items-center">
        <span>Filter by Semester</span>
        {activeSemester && (
          <button 
            onClick={() => onSemesterChange(null)} 
            className="ml-3 text-xs bg-secondary/50 hover:bg-secondary px-2 py-1 rounded-full"
          >
            Clear
          </button>
        )}
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="col-span-2 sm:col-span-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {semesters.slice(0, 4).map((semester) => (
              <Card 
                key={semester}
                className={`flex items-center justify-center h-16 cursor-pointer transition-colors hover:bg-primary/20 ${
                  activeSemester === semester ? "bg-primary/30 border-primary" : "bg-secondary/50"
                }`}
                onClick={() => onSemesterChange(semester)}
              >
                <span className="font-medium">Semester {semester}</span>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="col-span-2 sm:col-span-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {semesters.slice(4, 8).map((semester) => (
              <Card 
                key={semester}
                className={`flex items-center justify-center h-16 cursor-pointer transition-colors hover:bg-primary/20 ${
                  activeSemester === semester ? "bg-primary/30 border-primary" : "bg-secondary/50"
                }`}
                onClick={() => onSemesterChange(semester)}
              >
                <span className="font-medium">Semester {semester}</span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSemesterSelector;
