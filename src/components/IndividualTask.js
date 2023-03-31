import styled from "styled-components";

const Task = styled.div`
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 30vw;
`;
const TaskText = styled.p`
  font-size: 28px;
  letter-spacing: -2px;
`;

function IndividualTask({
  todoList,
  setTodoList,
  completedTaskCount,
  setCompletedTaskCount,
  pendingTaskCount,
  setPendingTaskCount,
  task,
}) {
  const deleteTask = (currentTask) => {
    const newToDo = todoList.filter((task) => task.id !== currentTask.id);
    setTodoList(newToDo);
    localStorage.setItem("todoList", JSON.stringify(newToDo));
    if (currentTask.complete) {
      const interm = completedTaskCount -1
      setCompletedTaskCount(interm);
      
      localStorage.setItem(
        "completedCount",
        JSON.stringify(interm)
      );
    } else {
      setPendingTaskCount(pendingTaskCount - 1);
      const interm = pendingTaskCount-1
      localStorage.setItem("pendingCount", JSON.stringify(interm));
    }
    console.log("completed task count delete", completedTaskCount);
  };
  const handleComplete = (id) => {
    setTodoList((todo) => {
      const tableau = todo.map((td, i) => {
        let isComplete = td.complete;
        return {
          id: td.id,
          task: td.task,
          complete: id === td.id ? !isComplete : isComplete,
        };
      });
      const updatedTask = tableau.find((task) => task.id === id);
      if (updatedTask.complete) {
        setCompletedTaskCount(completedTaskCount + 1);
        const intermCompleted = completedTaskCount + 1
        setPendingTaskCount(pendingTaskCount - 1);
        const interm = pendingTaskCount - 1
        localStorage.setItem("pendingCount", JSON.stringify(interm));
        localStorage.setItem(
          "completedCount",
          JSON.stringify(intermCompleted)
        );
      } else {
        setCompletedTaskCount(completedTaskCount - 1);
        const intermCompleted = completedTaskCount - 1;
        localStorage.setItem(
          "completedCount",
          JSON.stringify(intermCompleted)
        );
        setPendingTaskCount(pendingTaskCount + 1);
        const interm = pendingTaskCount + 1
        localStorage.setItem("pendingCount", JSON.stringify(interm));
      }
      localStorage.setItem("todoList", JSON.stringify(tableau));
      console.log("completed task count update task", completedTaskCount);
      return tableau;
    });
  };
  return (
    <Task className="task-box" complete={task.complete} id={task.id}>
      <TaskText
        className="task-text"
        style={{
          textDecoration: task.complete ? "line-through" : "",
          color: task.complete ? "#708090" : "black",
        }}
        onClick={() => handleComplete(task.id)}
      >
        {task.task}
      </TaskText>
      <p className="bin" onClick={() => deleteTask(task)}>
        🗑️
      </p>
    </Task>
  );
}

export default IndividualTask;
