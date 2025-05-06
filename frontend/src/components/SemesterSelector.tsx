
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Semester } from "@/utils/gradeUtils";

interface SemesterSelectorProps {
  semesters: Semester[];
  selectedSemesterId: number;
  onSelectSemester: (id: number) => void;
}

const SemesterSelector = ({ 
  semesters, 
  selectedSemesterId, 
  onSelectSemester 
}: SemesterSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="font-medium">Select Semester:</span>
      <Select 
        value={selectedSemesterId.toString()} 
        onValueChange={(value) => onSelectSemester(parseInt(value))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select semester" />
        </SelectTrigger>
        <SelectContent>
          {semesters.map(semester => (
            <SelectItem key={semester.id} value={semester.id.toString()}>
              {semester.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SemesterSelector;
