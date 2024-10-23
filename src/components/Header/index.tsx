import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { useId, useRef, useState } from "react";
import { AssignmentListsHeaderProps, TAssignment } from "../../helpers/types";
import { DatePicker } from "../DatePicker";

export function Header({ assignmentsList, setAssignmentsList }: AssignmentListsHeaderProps) {
  const inputId = useId();
  const [assignment, setAssignment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const submitButton = document.getElementById("submitButton");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignmentObject: TAssignment = {
      id: assignmentsList.length + 1,
      assignment: assignment,
      completed: false,
      dueDate: selectedDate,
    }

    const assignmentExists = (assignment: string) => {
      return assignmentsList.find((item) => item.assignment === assignment)
    }

    if (assignmentExists(assignment)) {
      setError("Assignment exists! Please add a different entry.")
      return;
    }

    const newAssigmentList: TAssignment[] = [...assignmentsList, assignmentObject];
    setAssignmentsList(newAssigmentList);
    setAssignment("");
    setSelectedDate(undefined);
    setError("")
    submitButton?.setAttribute("disabled", "true");
  }

  const updateAssignment = (val: string) => {
    if (val.startsWith(" ")) {
      console.log("i am trimmed")
      val = val.trimStart();
      setError("Must enter an assignemt!");
    }

    setAssignment(val)
    validateSubmitButton(val, selectedDate)
  }

  const handleDayPickerSelect = (date: Date) => {
    if (!date) {
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
    }

    validateSubmitButton(assignment, date)
    dialogRef.current?.close();
  };

  function validateSubmitButton(val?: string, date?: Date) {
    if (val?.trim() !== '' && date !== undefined) {
      submitButton?.removeAttribute("disabled");
      setError("");
    } else if (val?.trim() === '') {
      submitButton?.setAttribute("disabled", "true");
      setError("Must enter an assignemt!");
    } else if (date === undefined) {
      submitButton?.setAttribute("disabled", "true");
      setError("Please choose a due date.");
    } else {
      setError("Unknown Error.");
    }
  }

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <div className={styles.error}>{error}</div>
      <form className={styles.newAssignmentForm} onSubmit={handleFormSubmit}>
        <input
          placeholder="Add a new assignment"
          type="text"
          id={inputId}
          value={assignment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateAssignment(e.target.value)}
        />
        <DatePicker
          dueDate={selectedDate}
          onSelect={handleDayPickerSelect}
          dialogRef={dialogRef}
        />
        <button disabled id="submitButton">
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
