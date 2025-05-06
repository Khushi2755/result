
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, User } from "lucide-react";
import { Grade, Subject } from "@/utils/gradeUtils";

interface EditMarksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingSubject: Subject | null;
  selectedStudent: { id: string; name: string } | null;
  onUpdateMarks: (e: React.FormEvent) => void;
  updateGrade: (
    type: "ct1" | "ct2" | "endSem" | "assignment",
    value: number,
    maxValue: number
  ) => void;
}

const EditMarksDialog = ({
  open,
  onOpenChange,
  editingSubject,
  selectedStudent,
  onUpdateMarks,
  updateGrade,
}: EditMarksDialogProps) => {
  if (!editingSubject || !selectedStudent) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span>Update Marks - {editingSubject.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-2">
          <div className="flex items-center gap-2 mb-4 bg-secondary/50 p-3 rounded-md">
            <User className="h-5 w-5" />
            <div>
              <p className="font-medium">{selectedStudent.name}</p>
              <p className="text-sm text-muted-foreground">Updating marks for this student</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={onUpdateMarks} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="ct1-value">CT1 Marks</label>
              <div className="flex gap-2 items-center">
                <Input
                  id="ct1-value"
                  type="number"
                  min="0"
                  placeholder="Marks"
                  value={editingSubject.ct1?.value || ""}
                  onChange={(e) => updateGrade("ct1", Number(e.target.value), editingSubject.ct1?.maxValue || 20)}
                />
                <span>/</span>
                <Input
                  id="ct1-max"
                  type="number"
                  min="1"
                  placeholder="Max"
                  value={editingSubject.ct1?.maxValue || 20}
                  onChange={(e) => updateGrade("ct1", editingSubject.ct1?.value || 0, Number(e.target.value))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="ct2-value">CT2 Marks</label>
              <div className="flex gap-2 items-center">
                <Input
                  id="ct2-value"
                  type="number"
                  min="0"
                  placeholder="Marks"
                  value={editingSubject.ct2?.value || ""}
                  onChange={(e) => updateGrade("ct2", Number(e.target.value), editingSubject.ct2?.maxValue || 20)}
                />
                <span>/</span>
                <Input
                  id="ct2-max"
                  type="number"
                  min="1"
                  placeholder="Max"
                  value={editingSubject.ct2?.maxValue || 20}
                  onChange={(e) => updateGrade("ct2", editingSubject.ct2?.value || 0, Number(e.target.value))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="endSem-value">End Semester Marks</label>
              <div className="flex gap-2 items-center">
                <Input
                  id="endSem-value"
                  type="number"
                  min="0"
                  placeholder="Marks"
                  value={editingSubject.endSem?.value || ""}
                  onChange={(e) => updateGrade("endSem", Number(e.target.value), editingSubject.endSem?.maxValue || 70)}
                />
                <span>/</span>
                <Input
                  id="endSem-max"
                  type="number"
                  min="1"
                  placeholder="Max"
                  value={editingSubject.endSem?.maxValue || 70}
                  onChange={(e) => updateGrade("endSem", editingSubject.endSem?.value || 0, Number(e.target.value))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="assignment-value">Assignment Marks</label>
              <div className="flex gap-2 items-center">
                <Input
                  id="assignment-value"
                  type="number"
                  min="0"
                  placeholder="Marks"
                  value={editingSubject.assignment?.value || ""}
                  onChange={(e) => updateGrade("assignment", Number(e.target.value), editingSubject.assignment?.maxValue || 10)}
                />
                <span>/</span>
                <Input
                  id="assignment-max"
                  type="number"
                  min="1"
                  placeholder="Max"
                  value={editingSubject.assignment?.maxValue || 10}
                  onChange={(e) => updateGrade("assignment", editingSubject.assignment?.value || 0, Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          
          <div className="pt-2 flex justify-end">
            <Button type="submit">Update Marks</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMarksDialog;