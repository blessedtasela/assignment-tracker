import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import { TAssignment, TAssignmentsListProps } from "../../helpers/types";

export function Assignments({ assignmentsList, setAssignmentsList, completedAssignments, setCompletedAssignment }: TAssignmentsListProps) {

  const deleteAssignment = (index: number) => {

    setAssignmentsList((list) => {
      const newList: TAssignment[] = [...list]
      newList.splice(index, 1)
      return newList;
    })
  }

  const handleCompleted = (index: number) => {

    setAssignmentsList((list) => {
      const newList: TAssignment[] = list.map((assignment, idx) =>
        idx === index ? { ...assignment, completed: !assignment.completed } : assignment
      );

      const completed: number = newList.filter((assignment) => assignment.completed === true).length;
      setCompletedAssignment(completed)
      setAssignmentsList(newList)
      return newList;
    })
  }



  return (
    <section className={styles.assignments} >
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignmentsList.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{completedAssignments} of {assignmentsList.length}</span>
        </div>
      </header>

      <div className={styles.list}>
        {assignmentsList.map((list, index) => (
          <Assignment
            assignment={list}
            deleteAssignment={() => deleteAssignment(index)}
            handleCompleted={() => handleCompleted(index)}
            index={index}
            key={list.assignment}
          />
        ))}
      </div>
    </section>
  );
}
