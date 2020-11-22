import TaskContainer from "./components/TaskContainer";
import FilterButton from "./components/FilterButton";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Grid from "@material-ui/core/Grid";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { db } from "./config";
import { ifObjectIsEmpty } from "./IsNullObject";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
  },
});

function addNewTask(task, taskList) {
  let newTask = db
    .ref("/taskLists_" + taskList)
    .child("/tasks")
    .push();
  let taskKey = newTask.key;
  task.id = taskKey;
  task.date = task.date.getTime();
  newTask.set(task);
  console.log(task);
  return taskKey;
}

function addNewTaskList(taskList) {
  db.ref("/taskLists_" + taskList.taskList).set({
    taskList: taskList.taskList,
    tasks: taskList.tasks,
    isCreated: taskList.isCreated,
  });
}
function App(props) {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState(props.tasks);

  function handleTaskListCreationStart() {
    let task = {
      taskList: "",
      tasks: [
        {
          id: -1,
          name: "temp",
          completed: true,
          date: new Date(),
        },
      ],
      isCreated: false,
    };
    setTasks([...tasks, task]);
  }
  function handleTaskListCreationEnd(name) {
    const editedTaskList = tasks.map((task) => {
      if ("" === task.taskList) {
        task.taskList = name;
        task.isCreated = true;
        addNewTaskList(task);
        task.tasks = task.tasks.filter((task) => task.id != -1);

        return { ...task, taskList: name, isCreated: true };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  function handleStopTaskListCreation() {
    const tasksFiltred = tasks.filter((task) => task.taskList != "");
    setTasks(tasksFiltred);
  }
  function handleAddNewTask(task, taskList) {
    task.id = addNewTask(task, taskList);
    tasks.map((Ttask) => {
      if (Ttask.taskList == taskList) {
        Ttask.tasks = [...Ttask.tasks, task];
      }
    });
  }
  function handleTaskCompletion(taskList, taskId, state) {
    db.ref("/taskLists_" + taskList)
      .child("/tasks")
      .child(taskId)
      .update({ completed: state });
  }
  function handleTaskDeletion(taskList, taskId) {
    db.ref("/taskLists_" + taskList)
      .child("/tasks")
      .child(taskId)
      .remove();
  }
  function handleTaskChange(taskList, taskId, newName, newDate) {
    db.ref("/taskLists_" + taskList)
      .child("/tasks")
      .child(taskId)
      .update({ name: newName, date: newDate.getTime() });
  }
  function handleDeleteContainer(taskList) {
    db.ref("/taskLists_" + taskList).remove();
    setTasks(tasks.filter((tTaskList) => tTaskList.taskList != taskList));
  }
  // addNewTaskList({
  //   Name: "FirstTask",
  //   tasks: [
  //     {
  //       id: "id" + nanoid(),
  //       name: "Eat",
  //       completed: true,
  //       date: new Date(),
  //     },
  //   ],
  // });

  const headingText = `Списков -  ${
    ifObjectIsEmpty(tasks) ? tasks.length : 0
  } `;
  const taskContainers = ifObjectIsEmpty(tasks) ? (
    tasks.map((container) => (
      <Grid
        item
        xs={5}
        style={{ float: "left", marginLeft: "1rem", marginBottom: "1rem" }}
        key={nanoid()}
      >
        <TaskContainer
          name={container.taskList}
          tasksList={container.tasks}
          isCreated={container.isCreated}
          addTaskList={handleTaskListCreationEnd}
          stopCreating={handleStopTaskListCreation}
          addNewTask={handleAddNewTask}
          changeTaskCompletion={handleTaskCompletion}
          deleteTask={handleTaskDeletion}
          taskChange={handleTaskChange}
          deleteContainer={handleDeleteContainer}
        />
      </Grid>
    ))
  ) : (
    <li> </li>
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>Что надо сделать</h1>
        <h2 id="list-heading">{headingText}</h2>
        <Grid container spacing={1} alignItems="baseline">
          <Grid item container justify="center" xs={10}>
            {taskContainers}
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => handleTaskListCreationStart()}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
