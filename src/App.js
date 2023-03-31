import "./App.css";
import styled from "styled-components";
import { GlobalStyle } from "./globalStyles";
import { useState, useEffect } from "react";
import IndividualTask from "./components/IndividualTask";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;
const Button = styled.button`
  display: inline-block;
  border: none;
  background-color: #de4463;
  color: black;
  font-family: Regular;
  font-size: 30px;
  margin-top: 20px;
  height: 10vh;
  width: 300px;
  border-radius: 2px;
  cursor: pointer;
  letter-spacing: -1px;
`;
const PageTitle = styled.h1`
  font-family: ExtraBold;
  font-size: 150px;
  letter-spacing: -17px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const AddToDo = styled.input`
  border: 2px solid #821752;
  border-radius: 2px;
  width: 30vw;
  height: 5vh;
  font-size: 30px;
  font-family: Bold;
  letter-spacing: -2px;
  background-color: #f8efd4;
  &:focus {
    outline: none;
  }
`;
const Tasks = styled.div`
  margin-top: 10px;
  width: 30vw;
  display: flex;
  justify-content: space-between;
`;
const TaskCount = styled.span`
  margin-top: 10px;
`;
const Taskings = styled.b`
  margin-right: 3px;
  margin-left: 3px;
  margin-top: 30px;
  font-size: 22px;
`;
const TasksContainer = styled.div`
  border-top: 2px solid #821752;
  margin-top: 10px;
  height: 35vh;
  width: 50vw;
  padding-right: 10vw;
  padding-left: 10vh;
  overflow-y: scroll;
`;
const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonsContainers = styled.div`
  display: flex;
  width: 700px;
  justify-content: space-between;
  height: 10vh;
`;
const Alert = styled.p`
  color: #821752;
  font-size: 15px;
`;
function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [pendingTasksCount, setPendingTaskCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false)
  useEffect(() => {
    const localData = {
      todoList: localStorage.getItem("todoList"),
      pendingCount: localStorage.getItem("pendingCount"),
      completedCount: localStorage.getItem("completedCount"),
    };
    console.log("comp", localData.completedCount);
    console.log("pend", localData.pendingCount);
    localData.todoList
      ? setTodoList(JSON.parse(localData.todoList))
      : setTodoList([]);

    localData.pendingCount
      ? setPendingTaskCount(JSON.parse(localData.pendingCount))
      : setPendingTaskCount(0);
    localData.completedCount
      ? setCompletedTaskCount(JSON.parse(localData.completedCount))
      : setCompletedTaskCount(0);
  }, []); // pk pas [tasks]

  const handleClick = () => {
    if (input.length === 0) {
      setIsVisible(true);
      setIsEmpty(true)
    } else if (todoList.find(task => task.task === input)) {
      setIsVisible(true)
      setIsEmpty(false)
    } else {
      setIsVisible(false)
      const id = todoList.length + 1;
      const task = { id: id, task: input, complete: false };

      setTodoList((prev) => [...prev, task]);
      const interm = [...todoList, task];
      localStorage.setItem("todoList", JSON.stringify(interm));
      setPendingTaskCount(pendingTasksCount + 1);
      console.log('pending count handle click', pendingTasksCount)
      const pendForStorage = pendingTasksCount + 1;
      localStorage.setItem("pendingCount", JSON.stringify(pendForStorage));
      setInput("");
    }
  };
  const clearAllTask = () => {
    localStorage.clear();
    setTodoList([]);
    setPendingTaskCount(0);
    setCompletedTaskCount(0);
  };
  const clearOnlyCompletedTask = () => {
    const newToDo = todoList.filter((task) => task.complete === false);
    setTodoList(newToDo);
    localStorage.setItem("todoList", JSON.stringify(newToDo));
    setCompletedTaskCount(0);
  };

  return (
    <Container className="container">
      <GlobalStyle />
      <PageTitle className="page-title">TO DO LIST</PageTitle>
      <AddToDo
        className="add-to-do-input"
        data-test="new-todo"
        placeholder="Buy cat treats"
        value={input}
        onInput={(e) => setInput(e.target.value)}
      />
      {isVisible ? (
        <Alert className="alert-empty">
          Sorry, you can't add an {isEmpty ? 'empty new' : 'already existing'} task{" "}
        </Alert>
      ) : (
        ""
      )}
      <Button
        className="add-to-do-button"
        data-cy="submit"
        onClick={() => handleClick()}
      >
        Add as new task
      </Button>
      <Tasks>
        <TaskCount>
          <Taskings className="pending-count">
            {pendingTasksCount} Pending{" "}
            {pendingTasksCount <= 1 ? "task" : "tasks"}
          </Taskings>
        </TaskCount>
        <TaskCount>
          <Taskings className="completed-count">
            {completedTaskCount} Completed{" "}
            {completedTaskCount <= 1 ? "task" : "tasks"}
          </Taskings>
        </TaskCount>
      </Tasks>
      <TasksContainer className="tasks-container">
        <TaskList className="tasks-list">
          {todoList.map((todo, i) => {
            return (
              <div key={i} className="div-ind-task">
                <IndividualTask
                  className="ind-task"
                  todoList={todoList}
                  setTodoList={setTodoList}
                  completedTaskCount={completedTaskCount}
                  setCompletedTaskCount={setCompletedTaskCount}
                  pendingTaskCount={pendingTasksCount}
                  setPendingTaskCount={setPendingTaskCount}
                  task={todo}
                />
              </div>
            );
          })}
        </TaskList>
      </TasksContainer>
      <ButtonsContainers>
        <Button onClick={() => clearOnlyCompletedTask()}>
          Clear completed tasks
        </Button>
        <Button onClick={() => clearAllTask()}>Clear all tasks</Button>
      </ButtonsContainers>
    </Container>
  );
}

export default App;
