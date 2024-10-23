import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { TAssignment } from "./helpers/types";
import { useState } from "react";
import { DAssignmentsList } from "./helpers/data";
// import "react-day-picker/style.css";

function App() {
  const [assignmentsList, setAssignmentsList] = useState<TAssignment[]>(DAssignmentsList);
  const [completedAssignment, setCompletedAssignment] = useState<number>(0);

  return (
    <>
      <Header assignmentsList={assignmentsList}
        setAssignmentsList={setAssignmentsList}
      />
      <Assignments assignmentsList={assignmentsList}
        setAssignmentsList={setAssignmentsList}
        completedAssignments={completedAssignment}
        setCompletedAssignment={setCompletedAssignment}
      />
    </>
  );
}

export default App;
