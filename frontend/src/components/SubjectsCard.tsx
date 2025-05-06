
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";
import { Subject } from "@/utils/gradeUtils";
import SubjectsTable from "./SubjectsTable";

interface SubjectsCardProps {
  title: string;
  subjects: Subject[];
  onEditMarks: (subject: Subject) => void;
  onDeleteSubject: (subjectId: string) => void;
}

const SubjectsCard = ({ title, subjects, onEditMarks, onDeleteSubject }: SubjectsCardProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {subjects.length === 0 ? (
          <p className="text-center py-6 text-muted-foreground">
            {title.includes('Semester') 
              ? `No subjects found for ${title}. Add a new subject to get started.`
              : 'No subjects assigned yet. Add a new subject to get started.'}
          </p>
        ) : (
          <SubjectsTable 
            subjects={subjects} 
            onEditMarks={onEditMarks} 
            onDeleteSubject={onDeleteSubject} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SubjectsCard;
