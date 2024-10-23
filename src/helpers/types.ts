export type TAssignment = {
    id: number;
    assignment: string;
    completed: boolean;
    dueDate: Date | undefined;
}

export type TDate = {
    dueDate: Date | undefined;
}

export interface DatePickerProps {
    dueDate: Date | undefined;
    onSelect: (date: Date) => void;
    dialogRef: React.RefObject<HTMLDialogElement>;
}

export type TAssignmentsListProps = {
    assignmentsList: TAssignment[];
    setAssignmentsList: React.Dispatch<React.SetStateAction<TAssignment[]>>;
    completedAssignments: number;
    setCompletedAssignment: React.Dispatch<React.SetStateAction<number>>;
}

export type AssignmentListsHeaderProps = {
    assignmentsList: TAssignment[];
    setAssignmentsList: React.Dispatch<React.SetStateAction<TAssignment[]>>;
}

export type AssignmentProps = {
    assignment: TAssignment;
    deleteAssignment: (index: number) => void;
    handleCompleted: (index: number) => void;
    index: number
}