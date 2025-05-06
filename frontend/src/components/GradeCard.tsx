
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Subject } from "@/utils/gradeUtils";
import { Progress } from "@/components/ui/progress";

interface GradeCardProps {
  subject: Subject;
}

const GradeCard = ({ subject }: GradeCardProps) => {
  // Calculate percentages
  const ct1Percentage = subject.ct1 ? Math.round((subject.ct1.value / subject.ct1.maxValue) * 100) : 0;
  const ct2Percentage = subject.ct2 ? Math.round((subject.ct2.value / subject.ct2.maxValue) * 100) : 0;
  const endSemPercentage = subject.endSem ? Math.round((subject.endSem.value / subject.endSem.maxValue) * 100) : 0;
  const assignmentPercentage = subject.assignment ? Math.round((subject.assignment.value / subject.assignment.maxValue) * 100) : 0;

  return (
    <Card className="grade-card">
      <CardHeader className="bg-secondary pb-2">
        <CardTitle className="text-lg">{subject.name}</CardTitle>
        <p className="text-sm text-muted-foreground">Code: {subject.code} | Credits: {subject.credits}</p>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>CT1</span>
            <span className="font-medium">
              {subject.ct1 ? `${subject.ct1.value}/${subject.ct1.maxValue}` : "N/A"}
            </span>
          </div>
          <Progress value={ct1Percentage} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>CT2</span>
            <span className="font-medium">
              {subject.ct2 ? `${subject.ct2.value}/${subject.ct2.maxValue}` : "N/A"}
            </span>
          </div>
          <Progress value={ct2Percentage} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>End Semester</span>
            <span className="font-medium">
              {subject.endSem ? `${subject.endSem.value}/${subject.endSem.maxValue}` : "N/A"}
            </span>
          </div>
          <Progress value={endSemPercentage} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Assignment</span>
            <span className="font-medium">
              {subject.assignment ? `${subject.assignment.value}/${subject.assignment.maxValue}` : "N/A"}
            </span>
          </div>
          <Progress value={assignmentPercentage} className="h-2" />
        </div>
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">Teacher: {subject.teacher}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeCard;
