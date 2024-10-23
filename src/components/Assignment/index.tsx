import { AssignmentProps } from "../../helpers/types";
import styles from "./assignment.module.css";
import { TbCircle, TbCircleCheckFilled, TbTrash } from "react-icons/tb";


export function Assignment({ assignment, deleteAssignment, handleCompleted, index }: AssignmentProps) {

  const formatDate = (date: Date | undefined) => {
    if (date === undefined) {
      return "Cannot parse date";
    }

    const currentDate: Date = new Date();
    const dueDate: Date = new Date(date);

    // Set the time of both dates to the start of the day for accurate comparison
    currentDate.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    // Calculate the difference in time between the two dates
    const timeDifference: number = dueDate.getTime() - currentDate.getTime();

    // Calculate the difference in days
    const dayDifference: number = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (dayDifference < 1) {
      return "Due: now"
    } else if (dayDifference === 1) {
      return "Due: tommorrow"
    } else {
      return `Due: in ${dayDifference} days`
    }
  }

  const checkDueDate = (date: Date | undefined) => {
    if (date === undefined) {
      return "";
    }

    const currentDate = new Date();
    const dueDate = new Date(date);

    currentDate.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const timeDifference = dueDate.getTime() - currentDate.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (dayDifference === 1) {
      return "dueNow";
    } else if (dayDifference > 1) {
      return "dueDate";
    } else {
      return "duePast";
    }

  }

  return (
    <div className={styles.assignment}>
      <button className={styles.checkContainer} onClick={() => handleCompleted(index)
      }>
        {
          assignment.completed == true ? <TbCircleCheckFilled size={20} /> : <TbCircle size={20} />
        }

      </button>
      <div />
      <p className={assignment.completed ? styles.textCompleted : ""}>
        {assignment.assignment}
      </p>
      <div>
        <p className={styles[checkDueDate(assignment.dueDate)]}>
          {formatDate(assignment.dueDate)}
        </p>
      </div>
      <button className={styles.deleteButton} onClick={() => deleteAssignment(index)}>
        <TbTrash size={20} onClick={(e) => {
          e.preventDefault()
          deleteAssignment
        }} />
      </button>
    </div>
  );
}
