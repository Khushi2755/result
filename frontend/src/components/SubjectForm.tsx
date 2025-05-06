
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Subject, generateId } from "@/utils/gradeUtils";
import { toast } from "@/components/ui/use-toast";

interface SubjectFormProps {
  onAddSubject: (subject: Subject) => void;
  teacherName: string;
  selectedSemester?: number | null;
}

const SubjectForm = ({ onAddSubject, teacherName, selectedSemester }: SubjectFormProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState<number>(3);
  const [semester, setSemester] = useState<number | undefined>(selectedSemester || undefined);
  const [branch, setBranch] = useState<"CSE" | "ECE">("CSE");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !code || !semester) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill all required fields"
      });
      return;
    }

    const newSubject: Subject = {
      id: generateId(),
      name,
      code,
      credits: Number(credits),
      semester: semester,
      ct1: null,
      ct2: null,
      endSem: null,
      assignment: null,
      teacher: teacherName,
      branch: branch, // Add branch to the subject
    };

    onAddSubject(newSubject);
    toast({
      title: "Subject Added",
      description: `${name} has been added to Semester ${semester} for ${branch}`
    });
    
    // Reset form
    setName("");
    setCode("");
    setCredits(3);
    setSemester(selectedSemester || undefined);
    setBranch("CSE");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Subject</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="subject-name">Subject Name</Label>
            <Input
              id="subject-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Data Structures & Algorithms"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject-code">Subject Code</Label>
            <Input
              id="subject-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. CS201"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject-credits">Credits</Label>
            <Input
              id="subject-credits"
              type="number"
              min="1"
              max="6"
              value={credits}
              onChange={(e) => setCredits(parseInt(e.target.value))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject-semester">Semester</Label>
            <Select 
              value={semester?.toString() || ""} 
              onValueChange={(value) => setSemester(parseInt(value))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => (
                  <SelectItem key={sem} value={sem.toString()}>
                    Semester {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Branch</Label>
            <RadioGroup 
              className="flex space-x-4 pt-1" 
              value={branch} 
              onValueChange={(value) => setBranch(value as "CSE" | "ECE")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CSE" id="cse" />
                <Label htmlFor="cse">CSE</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ECE" id="ece" />
                <Label htmlFor="ece">ECE</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="pt-2 flex justify-end">
            <Button type="submit">Add Subject</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectForm;
